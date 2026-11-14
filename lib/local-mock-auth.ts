import {
  LOCAL_USERS,
  authenticateLocalUser,
  findLocalUserByKey,
  type LocalUser,
} from "./local-users";

const LOCAL_COOKIE = "__sites_local_auth";
const AUTH_PATHS = new Set([
  "/signin-with-chatgpt",
  "/signout-with-chatgpt",
  "/callback",
]);

/** Cookie-based local identity for Docker / wrangler local previews. */
export function applyLocalMockAuth(
  request: Request,
  enabled: boolean,
): Request | Response {
  if (!enabled) return request;

  let url: URL;
  try {
    url = new URL(request.url);
  } catch {
    return new Response(null, {
      status: 403,
      headers: { "Cache-Control": "private, no-store" },
    });
  }

  const headers = new Headers(request.headers);
  for (const name of [...headers.keys()]) {
    if (name.toLowerCase().startsWith("oai-authenticated-user-")) {
      headers.delete(name);
    }
  }

  if (url.pathname === "/callback") {
    return new Response(null, {
      status: 501,
      headers: { "Cache-Control": "private, no-store" },
    });
  }

  const signIn = url.pathname === "/signin-with-chatgpt";
  const signOut = url.pathname === "/signout-with-chatgpt";
  if (signIn || signOut) {
    return handleAuthAction(request, url, signIn, signOut);
  }

  const cookieHeader = headers.get("cookie") ?? "";
  const cookies = cookieHeader
    .split(";")
    .map((part) => part.trim())
    .filter(Boolean);
  const authValues = cookies
    .filter((cookie) => cookie.startsWith(`${LOCAL_COOKIE}=`))
    .map((cookie) => decodeURIComponent(cookie.slice(LOCAL_COOKIE.length + 1)));
  const appCookies = cookies.filter(
    (cookie) => !cookie.startsWith(`${LOCAL_COOKIE}=`),
  );

  if (appCookies.length !== cookies.length) {
    if (appCookies.length) headers.set("cookie", appCookies.join("; "));
    else headers.delete("cookie");
  }

  const user = resolveCookieUser(authValues[0]);
  if (user) {
    headers.set("oai-authenticated-user-id", user.authId);
    headers.set("oai-authenticated-user-email", user.email);
    headers.set(
      "oai-authenticated-user-full-name",
      encodeURIComponent(user.name),
    );
    headers.set(
      "oai-authenticated-user-full-name-encoding",
      "percent-encoded-utf-8",
    );
  }

  return new Request(request, { headers });
}

function resolveCookieUser(value: string | undefined): LocalUser | undefined {
  if (!value) return undefined;
  if (value === "1") return findLocalUserByKey("seedy");
  return findLocalUserByKey(value);
}

function handleAuthAction(
  request: Request,
  url: URL,
  signIn: boolean,
  signOut: boolean,
): Response | Promise<Response> {
  const origin = request.headers.get("origin");
  if (
    (origin && origin !== url.origin) ||
    request.headers.get("sec-fetch-site") === "cross-site"
  ) {
    return new Response(null, {
      status: 403,
      headers: { "Cache-Control": "private, no-store" },
    });
  }

  if (isPrefetch(request)) {
    return new Response(null, {
      status: 204,
      headers: { "Cache-Control": "private, no-store" },
    });
  }

  if (signOut) {
    if (request.method !== "GET" && request.method !== "POST") {
      return new Response(null, {
        status: 405,
        headers: {
          Allow: "GET, POST",
          "Cache-Control": "private, no-store",
        },
      });
    }
    return redirectWithCookie(
      safeReturn(url.searchParams.get("return_to")),
      "",
      true,
      request.method === "POST" ? 303 : 302,
    );
  }

  if (request.method === "GET") {
    return new Response(
      loginPage(safeReturn(url.searchParams.get("return_to"))),
      {
        status: 200,
        headers: {
          "Content-Type": "text/html; charset=utf-8",
          "Cache-Control": "private, no-store",
        },
      },
    );
  }

  if (request.method !== "POST") {
    return new Response(null, {
      status: 405,
      headers: {
        Allow: "GET, POST",
        "Cache-Control": "private, no-store",
      },
    });
  }

  return authenticateAndRedirect(request, url);
}

async function authenticateAndRedirect(
  request: Request,
  url: URL,
): Promise<Response> {
  const contentType = request.headers.get("content-type") || "";
  let email = "";
  let password = "";
  let quickKey = "";
  let returnTo = safeReturn(url.searchParams.get("return_to"));

  if (contentType.includes("application/x-www-form-urlencoded") || contentType.includes("multipart/form-data")) {
    const form = await request.formData();
    email = String(form.get("email") || "");
    password = String(form.get("password") || "");
    quickKey = String(form.get("user") || "");
    returnTo = safeReturn(String(form.get("return_to") || returnTo));
  } else {
    try {
      const body = (await request.json()) as {
        email?: string;
        password?: string;
        user?: string;
        return_to?: string;
      };
      email = body.email || "";
      password = body.password || "";
      quickKey = body.user || "";
      returnTo = safeReturn(body.return_to || returnTo);
    } catch {
      return loginFailure(returnTo, "Invalid login request.");
    }
  }

  let user: LocalUser | undefined;
  if (quickKey) user = findLocalUserByKey(quickKey);
  else user = authenticateLocalUser(email, password);

  if (!user) {
    return loginFailure(returnTo, "Invalid email or password.");
  }

  return redirectWithCookie(returnTo, user.key, false, 303);
}

function redirectWithCookie(
  location: string,
  userKey: string,
  clear: boolean,
  status: number,
): Response {
  return new Response(null, {
    status,
    headers: {
      "Cache-Control": "private, no-store",
      Location: location,
      "Set-Cookie": `${LOCAL_COOKIE}=${encodeURIComponent(userKey)}; Path=/; ${
        clear ? "Max-Age=0; " : ""
      }HttpOnly; SameSite=Lax`,
    },
  });
}

function loginFailure(returnTo: string, message: string): Response {
  return new Response(loginPage(returnTo, message), {
    status: 401,
    headers: {
      "Content-Type": "text/html; charset=utf-8",
      "Cache-Control": "private, no-store",
    },
  });
}

function loginPage(returnTo: string, error = ""): string {
  const rows = LOCAL_USERS.map(
    (user) => `
      <tr>
        <td><strong>${escapeHtml(user.name)}</strong><br/><span>${escapeHtml(user.email)}</span></td>
        <td>${escapeHtml(user.role)}</td>
        <td><code>${escapeHtml(user.password)}</code></td>
        <td>
          <form method="post" action="/signin-with-chatgpt">
            <input type="hidden" name="return_to" value="${escapeHtml(returnTo)}" />
            <input type="hidden" name="user" value="${escapeHtml(user.key)}" />
            <button type="submit">Sign in</button>
          </form>
        </td>
      </tr>`,
  ).join("");

  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1" />
  <title>ExpenseFlow local sign-in</title>
  <style>
    :root { color-scheme: light; font-family: "Segoe UI", system-ui, sans-serif; }
    body { margin: 0; min-height: 100vh; background: linear-gradient(160deg, #f4f7fb, #e7eef8 45%, #f8fafc); color: #142033; }
    main { width: min(920px, calc(100% - 2rem)); margin: 2.5rem auto; }
    .card { background: #fff; border: 1px solid #d7e0ec; border-radius: 18px; padding: 1.5rem; box-shadow: 0 18px 50px rgba(20,32,51,.08); }
    h1 { margin: 0 0 .35rem; font-size: 1.7rem; }
    p { margin: 0 0 1.2rem; color: #4b5b70; line-height: 1.5; }
    .error { background: #fff1f1; color: #9b1c1c; border: 1px solid #f0b4b4; border-radius: 10px; padding: .75rem 1rem; margin-bottom: 1rem; }
    form.credentials { display: grid; gap: .75rem; grid-template-columns: 1fr 1fr auto; margin-bottom: 1.5rem; }
    label { display: grid; gap: .35rem; font-size: .85rem; color: #405066; }
    input { border: 1px solid #c7d3e3; border-radius: 10px; padding: .7rem .8rem; font: inherit; }
    button, .btn { border: 0; border-radius: 10px; background: #0f3d7a; color: #fff; padding: .7rem 1rem; font: inherit; cursor: pointer; }
    button:hover, .btn:hover { background: #0b2f5d; }
    table { width: 100%; border-collapse: collapse; }
    th, td { text-align: left; padding: .75rem .5rem; border-top: 1px solid #e5edf6; vertical-align: top; font-size: .92rem; }
    th { color: #617388; font-size: .78rem; letter-spacing: .04em; text-transform: uppercase; }
    code { background: #eef3f9; padding: .15rem .4rem; border-radius: 6px; }
    span { color: #617388; font-size: .85rem; }
    @media (max-width: 720px) {
      form.credentials { grid-template-columns: 1fr; }
    }
  </style>
</head>
<body>
  <main>
    <div class="card">
      <h1>ExpenseFlow local sign-in</h1>
      <p>Docker preview accounts. Use email and password, or pick a user below.</p>
      ${error ? `<div class="error">${escapeHtml(error)}</div>` : ""}
      <form class="credentials" method="post" action="/signin-with-chatgpt">
        <input type="hidden" name="return_to" value="${escapeHtml(returnTo)}" />
        <label>Email<input name="email" type="email" required placeholder="seedy@sites.test" autocomplete="username" /></label>
        <label>Password<input name="password" type="password" required placeholder="Password" autocomplete="current-password" /></label>
        <button type="submit">Sign in</button>
      </form>
      <table>
        <thead><tr><th>User</th><th>Role</th><th>Password</th><th></th></tr></thead>
        <tbody>${rows}</tbody>
      </table>
    </div>
  </main>
</body>
</html>`;
}

function escapeHtml(value: string): string {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#39;");
}

function isPrefetch(request: Request): boolean {
  if (request.headers.get("next-router-prefetch") !== null) return true;
  if (request.headers.get("x-middleware-prefetch") === "1") return true;
  return [request.headers.get("purpose"), request.headers.get("sec-purpose")]
    .filter((value): value is string => typeof value === "string")
    .some((value) =>
      value
        .split(/[;,]/)
        .some((part) => part.trim().toLowerCase() === "prefetch"),
    );
}

function safeReturn(value: string | null): string {
  if (!value?.startsWith("/") || value.startsWith("//")) return "/";
  try {
    const url = new URL(value, "http://localhost");
    if (url.origin !== "http://localhost" || AUTH_PATHS.has(url.pathname)) {
      return "/";
    }
    return `${url.pathname}${url.search}${url.hash}`;
  } catch {
    return "/";
  }
}
