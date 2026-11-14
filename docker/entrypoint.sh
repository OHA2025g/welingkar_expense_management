#!/bin/sh
set -eu

cd /app

marker=".wrangler/state/.expenseflow-schema-applied"
if [ ! -f "$marker" ]; then
  mkdir -p .wrangler/state
  for migration in \
    drizzle/0000_purple_eddie_brock.sql \
    drizzle/0001_dapper_sinister_six.sql \
    drizzle/0002_financial-integrity.sql
  do
    pnpm exec wrangler d1 execute DB --local \
      --config dist/server/wrangler.json \
      --persist-to .wrangler/state \
      --file "$migration"
  done
  touch "$marker"
fi

exec node --import ./scripts/sites-env.mjs \
  ./node_modules/wrangler/bin/wrangler.js dev \
  --config dist/server/wrangler.json \
  --local \
  --persist-to .wrangler/state \
  --ip 0.0.0.0 \
  --port 8787 \
  --inspector-port 0 \
  --var LOCAL_MOCK_AUTH:1
