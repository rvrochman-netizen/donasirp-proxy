const express = require("express");
const app = express();
app.use(express.json());

let donations = [];
let lastId = 0;

app.post("/webhook", (req, res) => {
  const body = req.body;
  const name    = body?.donatur?.name   || body?.name    || "Anonim";
  const amount  = body?.amount          || body?.nominal || 0;
  const message = body?.support_message || body?.message || "";

  lastId++;
  donations.unshift({
    id: String(lastId),
    name: name,
    amount: Number(amount),
    message: message,
    timestamp: Date.now()
  });

  if (donations.length > 50) donations = donations.slice(0, 50);
  console.log(`[DonasiRP] Donasi: ${name} — Rp ${amount}`);
  res.json({ success: true });
});

app.get("/donations", (req, res) => {
  res.json({ donations: donations });
});

app.get("/", (req, res) => {
  res.send("DonasiRP Proxy aktif! ✅");
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server jalan di port ${PORT}`));
