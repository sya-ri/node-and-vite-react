#!/bin/sh

# Get the project root directory
PROJECT_DIR=$(cd "$(dirname "$0")" && pwd)/..

# Change to the project root directory
cd "$PROJECT_DIR" || exit

echo "[Setup] Install dependencies..."
npm install
