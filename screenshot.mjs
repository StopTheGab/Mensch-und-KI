/* screenshot.mjs — full-page screenshot via installed Chrome + DevTools Protocol.
   Usage: node screenshot.mjs <url> [label]
   Saves to ./temporary screenshots/screenshot-N[-label].png  */
import { spawn } from 'node:child_process';
import { mkdirSync, readdirSync, writeFileSync, existsSync } from 'node:fs';
import { get } from 'node:http';

const CHROME = 'C:/Program Files/Google/Chrome/Application/chrome.exe';
const url = process.argv[2] || 'http://localhost:3000';
const label = process.argv[3] ? '-' + process.argv[3] : '';
const OUT = 'temporary screenshots';
if (!existsSync(OUT)) mkdirSync(OUT, { recursive: true });

function nextName() {
  const nums = readdirSync(OUT)
    .map(f => (f.match(/screenshot-(\d+)/) || [])[1])
    .filter(Boolean).map(Number);
  const n = (nums.length ? Math.max(...nums) : 0) + 1;
  return `${OUT}/screenshot-${n}${label}.png`;
}

const port = 9222;
const chrome = spawn(CHROME, [
  '--headless=new', `--remote-debugging-port=${port}`,
  '--hide-scrollbars', '--force-device-scale-factor=1',
  '--window-size=1280,1000', '--no-first-run', '--no-default-browser-check',
  '--user-data-dir=' + process.env.TEMP + '/chrome-shot-profile'
], { stdio: 'ignore' });

const httpJson = (path) => new Promise((res, rej) => {
  get(`http://127.0.0.1:${port}${path}`, r => {
    let d = ''; r.on('data', c => d += c); r.on('end', () => res(JSON.parse(d)));
  }).on('error', rej);
});

async function waitFor() {
  for (let i = 0; i < 50; i++) {
    try { return await httpJson('/json/version'); }
    catch { await new Promise(r => setTimeout(r, 200)); }
  }
  throw new Error('Chrome DevTools not reachable');
}

(async () => {
  await waitFor();
  const { webSocketDebuggerUrl } = await httpJson('/json/version');
  // Minimal CDP over WebSocket using Node's built-in WebSocket (Node 22+)
  const sock = new globalThis.WebSocket(webSocketDebuggerUrl);
  let id = 0; const pending = new Map();
  const send = (method, params = {}, sessionId) => new Promise((res) => {
    const mid = ++id; pending.set(mid, res);
    sock.send(JSON.stringify({ id: mid, method, params, sessionId }));
  });
  sock.addEventListener('message', (ev) => {
    const m = JSON.parse(ev.data);
    if (m.id && pending.has(m.id)) { pending.get(m.id)(m.result); pending.delete(m.id); }
  });
  await new Promise(r => sock.addEventListener('open', r));

  const { targetId } = await send('Target.createTarget', { url: 'about:blank' });
  const { sessionId } = await send('Target.attachToTarget', { targetId, flatten: true });
  await send('Page.enable', {}, sessionId);
  if (process.env.REDUCED) {
    await send('Emulation.setEmulatedMedia', {
      features: [{ name: 'prefers-reduced-motion', value: 'reduce' }]
    }, sessionId);
  }
  await send('Page.navigate', { url }, sessionId);
  await new Promise(r => setTimeout(r, 2500)); // let fonts + reveals settle

  // Measure full content height
  const { result } = await send('Runtime.evaluate', {
    expression: 'JSON.stringify({w:document.documentElement.scrollWidth,h:document.documentElement.scrollHeight})',
    returnByValue: true
  }, sessionId);
  const { w, h } = JSON.parse(result.value);

  // Optional region via env: CLIP_Y (start), CLIP_H (height), CLIP_W (width)
  const clipY = process.env.CLIP_Y ? Number(process.env.CLIP_Y) : 0;
  const clipH = process.env.CLIP_H ? Number(process.env.CLIP_H) : Math.min(h, 16384);
  const clipW = process.env.CLIP_W ? Number(process.env.CLIP_W) : 1280;

  await send('Emulation.setDeviceMetricsOverride', {
    width: clipW, height: Math.min(h, 16384), deviceScaleFactor: 1, mobile: false
  }, sessionId);
  await new Promise(r => setTimeout(r, 400));

  const shot = await send('Page.captureScreenshot', {
    format: 'png', captureBeyondViewport: true,
    clip: { x: 0, y: clipY, width: clipW, height: clipH, scale: 1 }
  }, sessionId);

  const file = nextName();
  writeFileSync(file, Buffer.from(shot.data, 'base64'));
  console.log('Saved: ' + file + `  (page ${w}x${h})`);
  sock.close(); chrome.kill();
  process.exit(0);
})().catch(e => { console.error(e); chrome.kill(); process.exit(1); });
