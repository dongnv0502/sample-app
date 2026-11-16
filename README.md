# sample-app

Tiny Node.js app that demonstrates CI/CD into the homelab.

Live at <https://sample.thelastengineer.xyz> (`/health` returns the running version).

## How a change reaches production

1. `git push` to `main`.
2. GitHub Actions (`.github/workflows/ci-cd.yml`): runs `node --test`, builds a
   `linux/amd64` image and pushes `ghcr.io/dongnv0502/sample-app:sha-<commit>`.
3. The same workflow renders `deploy/compose.yml` with that tag and commits it to
   `dongnv0502/homelab` at `apps/sample-app/compose.yml`.
4. The homelab's cron (`deploy.sh`, every 5 minutes) sees the new commit and runs
   `docker compose up -d`. Traefik routes `sample.thelastengineer.xyz` to it.

Rollback: revert the `deploy(sample-app): …` commit in the homelab repo.

Required secret: `HOMELAB_REPO_TOKEN` (fine-grained token, Contents read/write on
`dongnv0502/homelab`).

## Run locally

```bash
node server.js     # http://localhost:3000
node --test
```
