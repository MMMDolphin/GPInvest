#!/bin/bash

# Minimal deployment script
set -euo pipefail

SERVER="root@46.62.242.236"
REMOTE_DIR="/root/gpinvest"
BRANCH="main"
COMPOSE_FILE="docker-compose.prod.yml"

echo "Connecting to server and deploying..."

ssh "$SERVER" <<REMOTE
set -euo pipefail

cd "$REMOTE_DIR"

echo "Pulling latest changes..."
git fetch origin "$BRANCH"
git checkout "$BRANCH"
git pull origin "$BRANCH"

echo "Ensuring persistent directories exist..."
mkdir -p media
touch gp-invest.db
chown -R 1001:1001 media
chown 1001:1001 gp-invest.db

echo "Running database migrations..."
docker compose -f "$COMPOSE_FILE" run --rm app pnpm payload migrate

echo "Building and starting application..."
docker compose -f "$COMPOSE_FILE" build
docker compose -f "$COMPOSE_FILE" up -d --remove-orphans

echo "Deployment complete!"
REMOTE

echo "Deployment finished successfully!"
