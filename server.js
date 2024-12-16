const express = require("express");
const sqlite3 = require("sqlite3").verbose();
const bodyParser = require("body-parser");
const cors = require("cors");

const app = express();
const PORT = 3000;

// Middleware
app.use(bodyParser.json());
app.use(cors());

// Initialize SQLite Database
const db = new sqlite3.Database("database.sqlite", (err) => {
  if (err) {
    console.error("Failed to connect to database:", err.message);
  } else {
    console.log("Connected to SQLite database.");
    db.run(
      "CREATE TABLE IF NOT EXISTS users (username TEXT PRIMARY KEY, isPro INTEGER DEFAULT 0)"
    );
  }
});

// User Login
app.post("/login", (req, res) => {
  const { username } = req.body;

  db.get("SELECT * FROM users WHERE username = ?", [username], (err, row) => {
    if (err) {
      res.status(500).json({ success: false, message: "Database error" });
      return;
    }

    if (!row) {
      db.run("INSERT INTO users (username, isPro) VALUES (?, 0)", [username]);
    }

    res.json({ success: true, message: "Login successful" });
  });
});

// Get Workout/Diet Plan
const plans = {
  teen: { workout: "15-min cardio, 30 squats, 15 pushups", diet: "High protein, moderate carbs." },
  adult: { workout: "30-min cardio, 40 squats, 20 pushups", diet: "Balanced protein, healthy fats." },
  senior: { workout: "20-min walk, light yoga", diet: "High fiber, low sugar." },
};

app.get("/plans", (req, res) => {
  const { ageGroup } = req.query;
  const plan = plans[ageGroup];

  if (!plan) {
    res.status(400).json({ success: false, message: "Invalid age group" });
    return;
  }

  res.json(plan);
});

// Unlock Pro Features
app.post("/unlock-pro", (req, res) => {
  const { username } = req.body;

  db.run("UPDATE users SET isPro = 1 WHERE username = ?", [username], (err) => {
    if (err) {
      res.status(500).json({ success: false, message: "Database error" });
    } else {
      res.json({ success: true, message: "Pro unlocked!" });
    }
  });
});

// Start the Server
app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
