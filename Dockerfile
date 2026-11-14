FROM node:24-bookworm-slim

WORKDIR /app

RUN apt-get update \
  && apt-get install -y --no-install-recommends ca-certificates \
  && rm -rf /var/lib/apt/lists/* \
  && npm install -g pnpm@11.25.0

COPY . .

ENV CI=true \
    WRANGLER_SEND_METRICS=false \
    CLOUDFLARE_CF_FETCH_ENABLED=false \
    NODE_OPTIONS=--max-old-space-size=4096

RUN pnpm install --frozen-lockfile \
  && pnpm run build \
  && rm -rf .sites-runtime/pnpm-store

RUN chmod +x /app/docker/entrypoint.sh

EXPOSE 8787

ENTRYPOINT ["/app/docker/entrypoint.sh"]
