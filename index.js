/**
 * Host half of dsh-clock-radar. It exists for one reason: the Campus Radar tab
 * reads the local board through a same-origin read-only proxy, so the browser
 * never has to cross a CORS boundary and the board API stays loopback-only.
 *
 * The clock and the pomodoro timer live entirely in the browser module
 * (client.js) and need no Host capability.
 */

const PREFIX = "/clock-radar-api";
const DEFAULT_BASE = "http://127.0.0.1:3000";
const ALLOWED = new Set(["/tasks", "/categories", "/sources", "/wechat/overview"]);

function sendJson(res, status, payload) {
  res.statusCode = status;
  res.setHeader("content-type", "application/json; charset=utf-8");
  res.setHeader("cache-control", "no-store");
  res.end(JSON.stringify(payload));
}

export const inject = ["webServer"];

export function apply(ctx) {
  const base = (process.env.CAMPUS_RADAR_URL || DEFAULT_BASE).replace(/\/$/, "");

  ctx.effect(() =>
    ctx.webServer.register({
      kind: "prefix",
      path: PREFIX,
      async handler(req, res) {
        if (req.method !== "GET") {
          sendJson(res, 405, { success: false, error: "Campus Radar proxy is read-only" });
          return;
        }

        const url = new URL(req.url || "/", "http://127.0.0.1");
        const sub = url.pathname.slice(PREFIX.length);
        if (!ALLOWED.has(sub)) {
          sendJson(res, 404, { success: false, error: "Unknown Campus Radar endpoint" });
          return;
        }

        try {
          const upstream = await fetch(`${base}/api${sub}${url.search}`, {
            method: "GET",
            headers: { accept: "application/json" },
            signal: AbortSignal.timeout(8000),
          });
          res.statusCode = upstream.status;
          res.setHeader(
            "content-type",
            upstream.headers.get("content-type") || "application/json; charset=utf-8"
          );
          res.setHeader("cache-control", "no-store");
          res.end(Buffer.from(await upstream.arrayBuffer()));
        } catch {
          sendJson(res, 502, {
            success: false,
            error:
              "Campus Radar is not reachable. Start it with 一键启动.bat (localhost:3000).",
          });
        }
      },
    })
  );
}
