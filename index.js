const express = require("express");
const fetch = require("node-fetch");

const app = express();
const PORT = process.env.PORT || 3000;
const webhook = "https://discord.com/api/webhooks/1397128931567603742/ICteuf__9KOTzicVn7lysg7AFbe16q7o2lebabbArWxq-t9bHrfPCbbiVY3zLZTJI9xT";

// Позволяет парсить JSON и формы
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// GET запрос через query-параметры (?msg=...)
app.get("/", async (req, res) => {
  const msg = req.query.msg || "Hello from Roblox!";

  try {
    const response = await fetch(webhook, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ content: msg })
    });

    if (!response.ok) {
      return res.status(500).send("Failed to send");
    }

    res.send("Sent to Discord!");
  } catch (error) {
    res.status(500).send("Error sending to Discord");
  }
});

// POST запрос с JSON (embed, content и т.д.)
app.post("/", async (req, res) => {
  try {
    const data = req.body;

    const response = await fetch(webhook, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data)
    });

    if (!response.ok) {
      return res.status(500).send("Failed to send");
    }

    res.send("Sent to Discord!");
  } catch (error) {
    res.status(400).send("Invalid JSON or error sending to Discord");
  }
});

app.listen(PORT, () => {
  console.log(`Discord proxy is running on port ${PORT}`);
});
