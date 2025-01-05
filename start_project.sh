#!/bin/bash

# Colors for formatting
GREEN="\033[0;32m"
RED="\033[0;31m"
YELLOW="\033[1;33m"
NC="\033[0m" # No Color

# Function to display messages
function log() {
  echo -e "${GREEN}[YouTube-IA]${NC} $1"
}

function error() {
  echo -e "${RED}[ERROR]${NC} $1"
}

# Step 1: Check Node.js installation
if ! command -v node &> /dev/null; then
  error "Node.js is not installed. Please install Node.js (v14+) and try again."
  exit 1
else
  log "Node.js is installed."
fi

# Step 2: Check npm installation
if ! command -v npm &> /dev/null; then
  error "npm is not installed. Please install npm and try again."
  exit 1
else
  log "npm is installed."
fi

# Step 3: Install dependencies
log "Installing dependencies..."
npm install
if [ $? -ne 0 ]; then
  error "Failed to install dependencies. Please check the errors above."
  exit 1
fi

# Step 4: Check .env file
if [ ! -f ".env" ]; then
  error "The .env file is missing. Please create a .env file with your API keys."
  exit 1
else
  log "Environment file (.env) found."
fi

# Step 5: Start the project
log "Starting YouTube-IA project..."
npm start
if [ $? -ne 0 ]; then
  error "Failed to start the project. Please check the errors above."
  exit 1
fi
