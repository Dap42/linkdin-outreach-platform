# 🚀 Quick Start Guide

## To get your app running with the backend server:

### Step 1: Start the Backend Server
Choose one of these methods:

**Method 1 (Recommended):**
```bash
node server.js
```

**Method 2:**
```bash
node start-server.js
```

**Method 3 (Linux/Mac):**
```bash
chmod +x run-server.sh
./run-server.sh
```

### Step 2: Your Frontend is Already Running
The React app should already be running on the preview. The backend server will run on port 3001 and provide prospect data.

### What Happens Next:
- ✅ The server will start on `http://localhost:3001`
- ✅ It includes mock prospect data as fallback
- ✅ The `/api/prospects` endpoint will be available
- ✅ Your React app will connect automatically
- ✅ You'll see prospects instead of the error message

### Optional: Configure Google Sheets
Edit `.env` to add your Google Sheets URL for real data:
```
GOOGLE_SHEET_EXPORT_URL=https://docs.google.com/spreadsheets/d/YOUR_SHEET_ID/pub?output=csv&gid=0
```

## Troubleshooting
- Make sure Node.js is installed
- The server must run on port 3001
- Check console for any error messages

That's it! Your prospect finder app is now fully functional! 🎉