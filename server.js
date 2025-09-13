import express from "express";
import fetch from "node-fetch";

const app = express();
const PORT = process.env.PORT || 10000;

// otetaan Renderistä ympäristömuuttuja
const SHEETS_API_URL = process.env.SHEETS_API_URL;

app.get("/", (req, res) => {
  res.send("✅ AI-Dashboard backend toimii!");
});

// endpoint: hakee tietyn tabin datan
app.get("/get-sheet", async (req, res) => {
  const tab = req.query.tab; // esim ?tab=Taulukko1
  if (!tab) {
    return res.status(400).json({ error: "Missing tab parameter" });
  }

  try {
    const response = await fetch(`${SHEETS_API_URL}?tabId=${tab}`);
    const data = await response.json();
    res.json(data);
  } catch (err) {
    console.error("Error fetching Google Sheets data:", err);
    res.status(500).json({ error: "Failed to fetch Google Sheets data" });
  }
});

app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});
