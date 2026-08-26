import { spawn } from "node:child_process";
import { setTimeout as delay } from "node:timers/promises";

const BASE = process.env.CHECK_BASE_URL || "http://127.0.0.1:4310";
const ROUTES = [
  "/",
  "/services",
  "/cybersecurity",
  "/solutions",
  "/portfolio",
  "/about",
  "/contact",
  "/portfolio/vyn-services",
  "/portfolio/semc-innovations",
  "/portfolio/astra-urban",
  "/portfolio/moon-landing",
  "/portfolio/fleetstock-operations",
  "/portfolio/gps-tracking-systems",
  "/portfolio/enterprise-portals",
  "/portfolio/confidential-cyber-assessment",
  "/sitemap.xml",
  "/robots.txt",
];

const EXTERNAL = [
  "https://www.vynservices.com/",
  "https://www.semc-innovations.com/",
  "https://astra-urban.vercel.app/",
  "https://moon-landing-iota.vercel.app/",
  "mailto:projects@nomadlabz.com",
];

async function checkUrl(url) {
  if (url.startsWith("mailto:")) {
    return { url, ok: true, status: "mailto" };
  }
  try {
    const res = await fetch(url, {
      method: "GET",
      redirect: "follow",
      headers: { "user-agent": "NomadLabz-link-check/1.0" },
    });
    return { url, ok: res.ok, status: res.status };
  } catch (error) {
    return { url, ok: false, status: String(error) };
  }
}

async function waitForServer(url, attempts = 60) {
  for (let i = 0; i < attempts; i++) {
    try {
      const res = await fetch(url);
      if (res.ok || res.status < 500) return true;
    } catch {
      // retry
    }
    await delay(500);
  }
  return false;
}

async function main() {
  const useExternalServer = Boolean(process.env.CHECK_BASE_URL);
  let child;

  if (!useExternalServer) {
    child = spawn("npx", ["next", "start", "-p", "4310"], {
      stdio: ["ignore", "pipe", "pipe"],
      shell: true,
      env: { ...process.env, PORT: "4310" },
    });
  }

  try {
    const ready = await waitForServer(BASE);
    if (!ready) {
      console.error("Server did not become ready for link checks.");
      process.exit(1);
    }

    const internal = await Promise.all(
      ROUTES.map((route) => checkUrl(`${BASE}${route}`)),
    );
    const external = await Promise.all(EXTERNAL.map(checkUrl));
    const results = [...internal, ...external];
    const failures = results.filter((r) => !r.ok);

    for (const r of results) {
      console.log(`${r.ok ? "OK" : "FAIL"} ${r.status} ${r.url}`);
    }

    if (failures.length) {
      console.error(`\n${failures.length} broken link(s).`);
      process.exit(1);
    }

    console.log(`\nChecked ${results.length} links — all OK.`);
  } finally {
    if (child) {
      child.kill("SIGTERM");
    }
  }
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
