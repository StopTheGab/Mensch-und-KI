/* =============================================================================
   make-model.mjs — erzeugt ein EIGENES, stilisiertes 3D-Modell (Basilika mit
   Kuppel) als binäre glTF-Datei (.glb).

   • Vollständig prozedural aus einfachen Körpern (Quader, Zylinder, Halbkugel)
     erzeugt → EIGENES Werk des Seitenautors, als CC0 / gemeinfrei freigegeben.
   • Keine fremden Assets, keine Lizenzprobleme, kein Drittanbieter.
   • Wird von <model-viewer> im Hero geladen (lokal gehostet → DSGVO-sauber).

   Ausführen:  node scripts/make-model.mjs
   Ergebnis:   public/models/basilika.glb
   ============================================================================= */
import { writeFileSync, mkdirSync } from "node:fs";

// ---- Geometrie-Gruppen (je Material eine Gruppe) --------------------------
const stone = { pos: [], nor: [], idx: [] }; // warmer Travertin
const dome = { pos: [], nor: [], idx: [] }; // bleigraue Kuppel
const gold = { pos: [], nor: [], idx: [] }; // Laterne/Kreuz, warmer Akzent

const push = (g, p, n) => {
  g.pos.push(p[0], p[1], p[2]);
  g.nor.push(n[0], n[1], n[2]);
  return g.pos.length / 3 - 1;
};

// Quader (Mittelpunkt cx,cy,cz, Halbmaße hx,hy,hz)
function box(g, cx, cy, cz, hx, hy, hz) {
  const faces = [
    { n: [0, 0, 1], v: [[-1, -1, 1], [1, -1, 1], [1, 1, 1], [-1, 1, 1]] },
    { n: [0, 0, -1], v: [[1, -1, -1], [-1, -1, -1], [-1, 1, -1], [1, 1, -1]] },
    { n: [1, 0, 0], v: [[1, -1, 1], [1, -1, -1], [1, 1, -1], [1, 1, 1]] },
    { n: [-1, 0, 0], v: [[-1, -1, -1], [-1, -1, 1], [-1, 1, 1], [-1, 1, -1]] },
    { n: [0, 1, 0], v: [[-1, 1, 1], [1, 1, 1], [1, 1, -1], [-1, 1, -1]] },
    { n: [0, -1, 0], v: [[-1, -1, -1], [1, -1, -1], [1, -1, 1], [-1, -1, 1]] },
  ];
  for (const f of faces) {
    const base = g.pos.length / 3;
    for (const v of f.v) push(g, [cx + v[0] * hx, cy + v[1] * hy, cz + v[2] * hz], f.n);
    g.idx.push(base, base + 1, base + 2, base, base + 2, base + 3);
  }
}

// Zylinder (Basis-Mittelpunkt cx,cy,cz; Radius r, Höhe h)
function cylinder(g, cx, cy, cz, r, h, seg = 36, capTop = true, capBottom = true) {
  for (let i = 0; i < seg; i++) {
    const a0 = (i / seg) * Math.PI * 2;
    const a1 = ((i + 1) / seg) * Math.PI * 2;
    const x0 = Math.cos(a0), z0 = Math.sin(a0);
    const x1 = Math.cos(a1), z1 = Math.sin(a1);
    const base = g.pos.length / 3;
    push(g, [cx + x0 * r, cy, cz + z0 * r], [x0, 0, z0]);
    push(g, [cx + x1 * r, cy, cz + z1 * r], [x1, 0, z1]);
    push(g, [cx + x1 * r, cy + h, cz + z1 * r], [x1, 0, z1]);
    push(g, [cx + x0 * r, cy + h, cz + z0 * r], [x0, 0, z0]);
    g.idx.push(base, base + 1, base + 2, base, base + 2, base + 3);
  }
  const cap = (y, ny) => {
    const c = push(g, [cx, y, cz], [0, ny, 0]);
    const ring = [];
    for (let i = 0; i < seg; i++) {
      const a = (i / seg) * Math.PI * 2;
      ring.push(push(g, [cx + Math.cos(a) * r, y, cz + Math.sin(a) * r], [0, ny, 0]));
    }
    for (let i = 0; i < seg; i++) {
      const n = (i + 1) % seg;
      if (ny > 0) g.idx.push(c, ring[i], ring[n]);
      else g.idx.push(c, ring[n], ring[i]);
    }
  };
  if (capBottom) cap(cy, -1);
  if (capTop) cap(cy + h, 1);
}

// Halbkugel-Kuppel (Basis-Mittelpunkt cx,cy,cz; Radius r)
function hemisphere(g, cx, cy, cz, r, seg = 36, rings = 16) {
  const idxAt = (ri, si) => ri * (seg + 1) + si;
  const baseStart = g.pos.length / 3;
  for (let ri = 0; ri <= rings; ri++) {
    const phi = (ri / rings) * (Math.PI / 2); // 0 = Basis, PI/2 = Spitze
    const y = Math.sin(phi), rad = Math.cos(phi);
    for (let si = 0; si <= seg; si++) {
      const th = (si / seg) * Math.PI * 2;
      const nx = Math.cos(th) * rad, ny = y, nz = Math.sin(th) * rad;
      push(g, [cx + nx * r, cy + ny * r, cz + nz * r], [nx, ny, nz]);
    }
  }
  for (let ri = 0; ri < rings; ri++) {
    for (let si = 0; si < seg; si++) {
      const a = baseStart + idxAt(ri, si);
      const b = baseStart + idxAt(ri + 1, si);
      const c = baseStart + idxAt(ri + 1, si + 1);
      const d = baseStart + idxAt(ri, si + 1);
      g.idx.push(a, b, c, a, c, d);
    }
  }
}

// ---- Modell zusammensetzen (Maße in „Metern", Y oben) ---------------------
// Treppensockel
box(stone, 0, 0.05, 0, 2.6, 0.05, 1.7);
box(stone, 0, 0.18, 0, 2.4, 0.08, 1.5);
// Hauptbaukörper (Fassade)
box(stone, 0, 0.7, 0, 2.1, 0.55, 1.2);
// Säulenreihe an der Front
const nCols = 7;
for (let i = 0; i < nCols; i++) {
  const x = -1.6 + (i / (nCols - 1)) * 3.2;
  cylinder(stone, x, 0.28, 1.18, 0.12, 0.9, 18);
}
// Gebälk über den Säulen
box(stone, 0, 1.28, 1.18, 1.95, 0.12, 0.16);
// Tambour (Trommel) unter der Kuppel
cylinder(stone, 0, 1.25, 0, 0.95, 0.5, 40);
// Kuppel
hemisphere(dome, 0, 1.75, 0, 0.95, 44, 20);
// Laterne
cylinder(gold, 0, 2.6, 0, 0.22, 0.34, 24);
hemisphere(gold, 0, 2.94, 0, 0.22, 24, 10);
// Kreuz an der Spitze
box(gold, 0, 3.35, 0, 0.03, 0.22, 0.03);
box(gold, 0, 3.45, 0, 0.12, 0.03, 0.03);

// ---- glTF/GLB schreiben ---------------------------------------------------
const materials = [
  { name: "Travertin", base: [0.82, 0.75, 0.62, 1], rough: 0.85 },
  { name: "Kuppel", base: [0.62, 0.66, 0.63, 1], rough: 0.6 },
  { name: "Akzent", base: [0.69, 0.55, 0.27, 1], rough: 0.45, metal: 0.4 },
];
const groups = [stone, dome, gold];

// Binärpuffer + Accessoren/BufferViews aufbauen
const bin = [];
const bufferViews = [];
const accessors = [];
let byteOffset = 0;
const align = () => {
  while (byteOffset % 4 !== 0) { bin.push(0); byteOffset++; }
};
const addView = (buf, target) => {
  align();
  const start = byteOffset;
  const u8 = new Uint8Array(buf);
  for (const b of u8) bin.push(b);
  byteOffset += u8.length;
  bufferViews.push({ buffer: 0, byteOffset: start, byteLength: u8.length, target });
  return bufferViews.length - 1;
};

const primitives = [];
groups.forEach((g, gi) => {
  const idxArr = new Uint32Array(g.idx);
  const posArr = new Float32Array(g.pos);
  const norArr = new Float32Array(g.nor);
  const min = [Infinity, Infinity, Infinity], max = [-Infinity, -Infinity, -Infinity];
  for (let i = 0; i < posArr.length; i += 3)
    for (let k = 0; k < 3; k++) {
      min[k] = Math.min(min[k], posArr[i + k]);
      max[k] = Math.max(max[k], posArr[i + k]);
    }
  const ivIdx = addView(idxArr.buffer, 34963);
  accessors.push({ bufferView: ivIdx, componentType: 5125, count: idxArr.length, type: "SCALAR" });
  const aIdx = accessors.length - 1;
  const ivPos = addView(posArr.buffer, 34962);
  accessors.push({ bufferView: ivPos, componentType: 5126, count: posArr.length / 3, type: "VEC3", min, max });
  const aPos = accessors.length - 1;
  const ivNor = addView(norArr.buffer, 34962);
  accessors.push({ bufferView: ivNor, componentType: 5126, count: norArr.length / 3, type: "VEC3" });
  const aNor = accessors.length - 1;
  primitives.push({ attributes: { POSITION: aPos, NORMAL: aNor }, indices: aIdx, material: gi });
});

const gltf = {
  asset: { version: "2.0", generator: "make-model.mjs (eigenes CC0-Modell)" },
  scene: 0,
  scenes: [{ nodes: [0] }],
  nodes: [{ mesh: 0, name: "Basilika" }],
  meshes: [{ name: "Basilika", primitives }],
  materials: materials.map((m) => ({
    name: m.name,
    pbrMetallicRoughness: {
      baseColorFactor: m.base,
      metallicFactor: m.metal ?? 0,
      roughnessFactor: m.rough,
    },
  })),
  buffers: [{ byteLength: byteOffset }],
  bufferViews,
  accessors,
};

// GLB-Container packen
const enc = new TextEncoder();
let json = JSON.stringify(gltf);
while (json.length % 4 !== 0) json += " ";
const jsonBuf = enc.encode(json);
const binBuf = new Uint8Array(bin);
let binPad = binBuf.length;
while (binPad % 4 !== 0) binPad++;
const totalLen = 12 + 8 + jsonBuf.length + 8 + binPad;
const out = new Uint8Array(totalLen);
const dv = new DataView(out.buffer);
let o = 0;
dv.setUint32(o, 0x46546c67, true); o += 4; // 'glTF'
dv.setUint32(o, 2, true); o += 4;
dv.setUint32(o, totalLen, true); o += 4;
dv.setUint32(o, jsonBuf.length, true); o += 4;
dv.setUint32(o, 0x4e4f534a, true); o += 4; // 'JSON'
out.set(jsonBuf, o); o += jsonBuf.length;
dv.setUint32(o, binPad, true); o += 4;
dv.setUint32(o, 0x004e4942, true); o += 4; // 'BIN\0'
out.set(binBuf, o);

mkdirSync("public/models", { recursive: true });
writeFileSync("public/models/basilika.glb", out);
const tris = groups.reduce((s, g) => s + g.idx.length / 3, 0);
console.log(`OK: public/models/basilika.glb  (${(totalLen / 1024).toFixed(1)} KB, ${tris} Dreiecke)`);
