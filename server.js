const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
require("dotenv").config();

const { google } = require("googleapis");

const app = express();
const PORT = process.env.PORT || 10000;

app.use(cors());
app.use(bodyParser.json());

// Health check
app.get("/healthz", (req, res) => {
  res.send("AI-Dashboard server running ✅");
});

// Dummy Sheets test (palauttaa yhden arvon Google Sheetistä kun API-integraatio valmis)
app.get("/sheets-test", async (req, res) => {
  try {
    res.json({ message: "Sheets API test endpoint toimii 🚀" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Sheets test failed" });
  }
});

// Dummy Calendar test
app.get("/calendar-test", async (req, res) => {
  try {
    res.json({ message: "Calendar API test endpoint toimii 📅" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Calendar test failed" });
  }
});

// Start server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
