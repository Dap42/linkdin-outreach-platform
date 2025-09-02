const express = require('express');
const cors = require('cors');
require('dotenv').config(); // For loading environment variables from .env

const app = express();
const PORT = process.env.PORT || 3001; // Use a different port than your frontend

app.use(cors()); // Enable CORS for all routes
app.use(express.json()); // For parsing application/json

// Health check endpoint
app.get('/health', (req, res) => {
  res.json({ status: 'Server is running', timestamp: new Date().toISOString() });
});

// Google Sheets data fetching from public export URL
app.get("/api/prospects", async (req, res) => {
  try {
    const googleSheetExportUrl = process.env.GOOGLE_SHEET_EXPORT_URL;
    console.log("Fetching from URL:", googleSheetExportUrl);

    if (!googleSheetExportUrl) {
      console.log("No Google Sheet URL configured, returning mock data");
      // Return mock data when no sheet URL is configured
      const mockProspects = [
        {
          Name: "Sarah Johnson",
          Title: "Senior Event Manager at EventPro",
          Linked_url: "https://linkedin.com/in/sarah-johnson",
          About: "Experienced event planner with 8+ years in the FMCG industry. Specializes in product launches, trade shows, and corporate events across India. Led over 200+ successful events for major brands.",
          Image: "https://ui-avatars.com/api/?name=Sarah+Johnson&background=217d91&color=fff&size=64"
        },
        {
          Name: "Rahul Sharma", 
          Title: "Event Coordinator at BrandEvents India",
          Linked_url: "https://linkedin.com/in/rahul-sharma",
          About: "Dynamic event professional focused on FMCG brand activations. Expert in consumer engagement strategies and experiential marketing campaigns throughout India.",
          Image: "https://ui-avatars.com/api/?name=Rahul+Sharma&background=217d91&color=fff&size=64"
        },
        {
          Name: "Priya Patel",
          Title: "Marketing Events Lead at ConsumerGoods Corp",
          Linked_url: "https://linkedin.com/in/priya-patel", 
          About: "Strategic event planner with deep FMCG industry knowledge. Manages pan-India product launches and consumer experience events for leading brands.",
          Image: "https://ui-avatars.com/api/?name=Priya+Patel&background=217d91&color=fff&size=64"
        },
        {
          Name: "Amit Kumar",
          Title: "Brand Activation Manager at FastGoods Ltd",
          Linked_url: "https://linkedin.com/in/amit-kumar",
          About: "Creative event strategist specializing in FMCG consumer engagement. Has executed over 150 successful brand activation campaigns across major Indian cities.",
          Image: "https://ui-avatars.com/api/?name=Amit+Kumar&background=217d91&color=fff&size=64"
        },
        {
          Name: "Neha Gupta",
          Title: "Event Planning Director at MegaEvents",
          Linked_url: "https://linkedin.com/in/neha-gupta",
          About: "Award-winning event director with expertise in FMCG product launches. Known for creating memorable consumer experiences that drive brand loyalty and sales growth.",
          Image: "https://ui-avatars.com/api/?name=Neha+Gupta&background=217d91&color=fff&size=64"
        }
      ];
      return res.json(mockProspects);
    }

    // Try to fetch from Google Sheets if URL is configured
    let response;
    try {
      // Use dynamic import for fetch in Node.js
      const fetch = (await import('node-fetch')).default;
      response = await fetch(googleSheetExportUrl);
    } catch (fetchError) {
      console.log("node-fetch not available, using built-in fetch or falling back to mock data");
      // Fallback to mock data if fetch fails
      const mockProspects = [
        {
          Name: "Demo User 1",
          Title: "Sample Event Manager",
          Linked_url: "https://linkedin.com/in/demo1",
          About: "This is demo data shown when the Google Sheets integration is not available.",
          Image: "https://ui-avatars.com/api/?name=Demo+User+1&background=217d91&color=fff&size=64"
        }
      ];
      return res.json(mockProspects);
    }

    if (!response.ok) {
      throw new Error(
        `Failed to fetch data from Google Sheet: ${response.statusText}`
      );
    }

    const text = await response.text();
    console.log("Raw response text:", text);

    // Extract JSON part from the gviz/tq response
    const jsonString = text.substring(
      text.indexOf("{"),
      text.lastIndexOf("}") + 1
    );
    console.log("Extracted JSON string:", jsonString);

    const data = JSON.parse(jsonString);
    console.log("Parsed data object:", data);

    // Manually map columns to expected frontend keys, skipping the first row (headers)
    const prospects = data.table.rows.slice(1).map((row) => {
      const cells = row.c;
      return {
        Name: cells[0] && cells[0].v !== undefined ? cells[0].v : null,
        Title: cells[1] && cells[1].v !== undefined ? cells[1].v : null,
        Linked_url: cells[2] && cells[2].v !== undefined ? cells[2].v : null,
        About: cells[3] && cells[3].v !== undefined ? cells[3].v : null,
        Image: cells[4] && cells[4].v !== undefined ? cells[4].v : null,
      };
    });
    console.log("Final prospects array:", prospects);

    res.json(prospects);
  } catch (error) {
    console.error("Error fetching data from Google Sheets:", error);
    // Return mock data as fallback
    const mockProspects = [
      {
        Name: "Fallback User",
        Title: "Sample Event Manager", 
        Linked_url: "https://linkedin.com/in/fallback",
        About: "This is fallback data shown when Google Sheets data cannot be retrieved.",
        Image: "https://ui-avatars.com/api/?name=Fallback+User&background=217d91&color=fff&size=64"
      }
    ];
    res.json(mockProspects);
  }
});

app.listen(PORT, () => {
  console.log(`Backend server running on port ${PORT}`);
});
