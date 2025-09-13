import express from "express";
import fetch from "node-fetch";

const app = express();
const PORT = process.env.PORT || 10000;

// Health check (Render testaa tällä että appi elossa)
app.get("/healthz", (req, res) => {
  res.json({ status: "ok" });
});

// Google Sheets API test
app.get("/test-sheets", async (req, res) => {
  try {
    const response = await fetch(process.env.GOOGLE_SHEETS_API_URL);
    const data = await response.json();
    res.json(data);
  } catch (error) {
    console.error("Sheets API error:", error);
    res.status(500).json({ error: "Failed to fetch Google Sheets data" });
  }
});

// Root endpoint (ettei tule enää "Cannot GET /")
app.get("/", (req, res) => {
  res.send("AI-Dashboard toimii! ✅ Käytä /healthz tai /test-sheets testaukseen.");
});

// Käynnistä serveri
app.listen(PORT, () => {
  console.log(`✅ Server running on port ${PORT}`);
});
