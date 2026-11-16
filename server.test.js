const test = require("node:test");
const assert = require("node:assert");
const http = require("node:http");
const { handler, MESSAGE } = require("./server");

function get(server, path) {
  return new Promise((resolve, reject) => {
    const { port } = server.address();
    http.get({ port, path }, (res) => {
      let body = "";
      res.on("data", (c) => (body += c));
      res.on("end", () => resolve({ status: res.statusCode, body }));
    }).on("error", reject);
  });
}

test("home page and health check", async () => {
  const server = http.createServer(handler).listen(0);
  try {
    const home = await get(server, "/");
    assert.strictEqual(home.status, 200);
    assert.ok(home.body.includes(MESSAGE));

    const health = await get(server, "/health");
    assert.strictEqual(health.status, 200);
    assert.strictEqual(JSON.parse(health.body).status, "ok");
  } finally {
    server.close();
  }
});
