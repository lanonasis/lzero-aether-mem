#!/bin/bash
set -e

echo "Current directory: $(pwd)"
echo "Listing files:"
ls -la

# Find and build shared package
if [ -d "packages/shared" ]; then
  echo "Building from root..."
  cd packages/shared && tsc && cd ../..
elif [ -d "../packages/shared" ]; then
  echo "Building from subdirectory..."
  cd ../packages/shared && tsc && cd ../..
elif [ -d "../../packages/shared" ]; then
  echo "Building from nested subdirectory..."
  cd ../../packages/shared && tsc && cd ../../..
fi

# Build web app
if [ -f "vite.config.ts" ]; then
  echo "Running vite from current directory..."
  ./node_modules/.bin/vite build
elif [ -f "../vite.config.ts" ]; then
  echo "Running vite from parent directory..."
  cd .. && ./node_modules/.bin/vite build
elif [ -f "../../vite.config.ts" ]; then
  echo "Running vite from grandparent directory..."
  cd ../.. && ./node_modules/.bin/vite build
fi
