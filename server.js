const express = require("express");
const cors = require("cors");
const sqlite3 = require("sqlite3").verbose();

const app = express();
app.use(cors());
app.use(express.json());

const db = new sqlite3.Database("./db/database.sqlite");

db.run(`
  CREATE TABLE IF NOT EXISTS expenses (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    title TEXT,
    amount REAL
  )
`);

app.get("/expenses", (req, res) => {
  db.all("SELECT * FROM expenses", [], (err, rows) => {
    res.json(rows);
  });
});

app.post("/expenses", (req, res) => {
  const { title, amount } = req.body;
  db.run(
    "INSERT INTO expenses (title, amount) VALUES (?, ?)",
    [title, amount],
    () => res.json({ success: true })
  );
});

app.listen(5000, () => console.log("Server running on 5000"));
