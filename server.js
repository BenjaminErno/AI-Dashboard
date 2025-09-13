import express from "express";
import fetch from "node-fetch";

const app = express();
const PORT = process.env.PORT || 10000;

// Sun NocodeAPI base URL ilman tabId:tä
const SHEETS_API_BASE = process.env.SHEETS_API_URL;

app.get("/", (req, res) => {
  res.send("✅ AI Dashboard server running!");
});

// Endpoint: /get-sheet?tab=Taulukko1
app.get("/get-sheet", async (req, res) => {
  const tabId = req.query.tab;

  if (!tabId) {
    return res.status(400).json({ error: "Missing tab parameter (?tab=...)" });
  }

  try {
    const url = `${SHEETS_API_BASE}&tabId=${tabId}`;
    console.log("Fetching from:", url); // DEBUG printti Renderin logeihin

    const response = await fetch(url);
    const data = await response.json();

    console.log("API response:", data); // DEBUG printti Renderin logeihin

    res.json(data);
  } catch (error) {
    console.error("Error fetching Google Sheets:", error);
    res.status(500).json({ error: "Failed to fetch Google Sheets data" });
  }
});

app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});
