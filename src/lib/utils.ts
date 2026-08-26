import { clsx, type ClassValue } from "clsx";

export function cn(...inputs: ClassValue[]) {
  return clsx(inputs);
}

export function absoluteUrl(path = "") {
  const base = (process.env.NEXT_PUBLIC_SITE_URL ?? "https://nomadlabz.com").replace(
    /\/$/,
    "",
  );
  if (!path) return base;
  return `${base}${path.startsWith("/") ? path : `/${path}`}`;
}
