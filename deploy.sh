#!/bin/bash

set -euo pipefail

SERVER="root@46.62.242.236"
REMOTE_DIR="/root/gpinvest"
BRANCH="main"

echo "Deploying to server..."

ssh "$SERVER" <<REMOTE
set -euo pipefail

cd "$REMOTE_DIR"

echo "Pulling latest changes..."
git fetch origin "$BRANCH"
git checkout "$BRANCH"
git pull origin "$BRANCH"

echo "Installing dependencies..."
pnpm install --frozen-lockfile

echo "Running database migrations..."
pnpm payload migrate

echo "Building application..."
pnpm build

echo "Reloading process via PM2..."
pm2 reload gp-invest || pm2 start "pnpm start" --name gp-invest

echo "Deployment complete!"
REMOTE

echo "Deployment finished successfully!"
