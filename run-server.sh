#!/bin/bash

echo "🚀 Starting backend server..."
echo "📋 Make sure to configure your Google Sheets URL in .env file"
echo ""

# Check if node is available
if ! command -v node &> /dev/null; then
    echo "❌ Node.js is not installed. Please install Node.js first."
    exit 1
fi

# Start the server
node server.js