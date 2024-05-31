#!/bin/sh

# Get the project root directory
PROJECT_DIR=$(cd "$(dirname "$0")" && pwd)/..

# Change to the project root directory
cd "$PROJECT_DIR" || exit

echo "[Setup] Install dependencies..."
npm install

echo "[Setup] Copy environment variable files..."
cp "$PROJECT_DIR/apps/backend/.env.example" "$PROJECT_DIR/apps/backend/.env"
