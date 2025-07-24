const express = require("express");
const fetch = require("node-fetch");

const app = express();
const PORT = process.env.PORT || 3000;

// Чтобы принимать query-параметры
app.use(express.urlencoded({ extended: true }));

app.get("/", async (req, res) => {
  const msg = req.query.msg || "Hello from Roblox!";
  const webhook = "https://discord.com/api/webhooks/1397128931567603742/ICteuf__9KOTzicVn7lysg7AFbe16q7o2lebabbArWxq-t9bHrfPCbbiVY3zLZTJI9xT";

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

app.listen(PORT, () => {
  console.log(`Discord proxy is running on port ${PORT}`);
});
