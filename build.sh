#!/bin/bash
set -e

echo "Current directory: $(pwd)"
echo "Listing files:"
ls -la

# Determine project root
if [ -d "packages/shared" ] && [ -f "vite.config.ts" ]; then
  # We're at the root
  PROJECT_ROOT=$(pwd)
  echo "Building from root..."
elif [ -d "../packages/shared" ] && [ -f "../vite.config.ts" ]; then
  # We're one level deep
  PROJECT_ROOT=$(cd .. && pwd)
  echo "Building from subdirectory..."
  cd "$PROJECT_ROOT"
elif [ -d "../../packages/shared" ] && [ -f "../../vite.config.ts" ]; then
  # We're two levels deep
  PROJECT_ROOT=$(cd ../.. && pwd)
  echo "Building from nested subdirectory..."
  cd "$PROJECT_ROOT"
else
  echo "Error: Could not find project root"
  exit 1
fi

echo "Project root: $PROJECT_ROOT"

# Build shared package
echo "Building shared package..."
cd "$PROJECT_ROOT/packages/shared"
npx tsc
cd "$PROJECT_ROOT"

# Build web app
echo "Building web app with Vite..."
npx vite build

echo "Build complete! Output directory: $PROJECT_ROOT/dist/public"
