# Backend Server Setup

## Quick Start

1. **Install dependencies** (if not already installed):
   The server uses built-in Node.js modules and fallbacks, so minimal setup is required.

2. **Configure environment** (optional):
   Edit the `.env` file to add your Google Sheets export URL:
   ```
   GOOGLE_SHEET_EXPORT_URL=https://docs.google.com/spreadsheets/d/YOUR_SHEET_ID/pub?output=csv&gid=0
   ```

3. **Start the server**:
   ```bash
   # Option 1: Direct node command
   node server.js

   # Option 2: Using the startup script (Linux/Mac)
   chmod +x run-server.sh
   ./run-server.sh

   # Option 3: Using the Node.js starter
   node start-server.js
   ```

## Server Endpoints

- `GET /health` - Health check endpoint
- `GET /api/prospects` - Returns prospect data (from Google Sheets or mock data)

## Configuration

The server will automatically:
- Use mock data if no Google Sheets URL is configured
- Fall back to mock data if Google Sheets is unavailable
- Handle CORS for frontend integration
- Run on port 3001 by default

## Troubleshooting

If you get permission errors on the shell script:
```bash
chmod +x run-server.sh
```

The server is designed to work even without external dependencies - it will gracefully fall back to mock data for development.