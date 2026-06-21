import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

/** shadcn-Standardhelfer: kombiniert Klassennamen und löst Tailwind-Konflikte auf. */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
