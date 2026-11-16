// Minimal web app used to demo CI/CD into the homelab. No dependencies.
const http = require("node:http");

const VERSION = process.env.APP_VERSION || "dev";
const MESSAGE = "Hello from the homelab!";

function handler(req, res) {
  if (req.url === "/health") {
    res.writeHead(200, { "content-type": "application/json" });
    return res.end(JSON.stringify({ status: "ok", version: VERSION }));
  }
  res.writeHead(200, { "content-type": "text/html; charset=utf-8" });
  res.end(`<!doctype html><meta charset="utf-8"><title>Sample app</title>
<body style="font-family:system-ui;max-width:40rem;margin:4rem auto">
<h1>${MESSAGE}</h1>
<p>Version: <code>${VERSION.slice(0, 7)}</code></p>
<p>Built by GitHub Actions, deployed by GitOps.</p>
</body>`);
}

module.exports = { handler, MESSAGE };

if (require.main === module) {
  const port = Number(process.env.PORT || 3000);
  http.createServer(handler).listen(port, () => console.log(`listening on :${port} (version ${VERSION})`));
}
