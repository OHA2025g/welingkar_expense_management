/** Resolve the public host/origin behind reverse proxies (EasyPanel, Traefik, etc.). */

export function requestHosts(req: Request): Set<string> {
  const url = new URL(req.url);
  const hosts = new Set<string>();
  for (const value of [
    req.headers.get("x-forwarded-host"),
    req.headers.get("host"),
    url.host,
  ]) {
    if (!value) continue;
    for (const part of value.split(",")) {
      const host = part.trim().toLowerCase();
      if (host) hosts.add(host);
    }
  }
  return hosts;
}

export function publicOrigin(req: Request): string {
  const url = new URL(req.url);
  const host = (
    req.headers.get("x-forwarded-host") ||
    req.headers.get("host") ||
    url.host
  )
    .split(",")[0]
    .trim();
  const local =
    /^(localhost|127\.0\.0\.1|0\.0\.0\.0|\[::1\])(?::\d+)?$/i.test(host);
  const proto = (
    req.headers.get("x-forwarded-proto") ||
    (!local ? "https" : null) ||
    url.protocol.replace(":", "") ||
    "https"
  )
    .split(",")[0]
    .trim();
  return `${proto}://${host}`;
}

/** True when Origin is absent or matches this request's public/proxy host. */
export function originMatchesRequest(req: Request): boolean {
  const origin = req.headers.get("origin");
  if (!origin) return true;

  let browser: URL;
  try {
    browser = new URL(origin);
  } catch {
    return false;
  }

  const actual = new URL(req.url);
  if (browser.origin === actual.origin) return true;
  if (browser.origin === publicOrigin(req)) return true;
  if (requestHosts(req).has(browser.host.toLowerCase())) return true;
  if (
    browser.origin ===
    "https://expenseflow-workspace.singh-aghoreshwar.chatgpt.site"
  ) {
    return true;
  }
  if (
    import.meta.env.DEV &&
    (browser.hostname === "terminal.local" ||
      browser.hostname.endsWith(".terminal.local"))
  ) {
    return true;
  }
  return false;
}

export function isTrustedBrowserOrigin(req: Request): boolean {
  if (req.headers.get("sec-fetch-site") === "cross-site") return false;
  return originMatchesRequest(req);
}
