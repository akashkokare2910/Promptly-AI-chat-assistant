require("dotenv").config();
const express = require("express");
const axios = require("axios");
const cors = require("cors");

const app = express();
app.use(express.json());
app.use(cors());

const PORT = process.env.PORT || 5000;
const OPENROUTER_API_URL = "https://openrouter.ai/api/v1/chat/completions";
const API_KEY = process.env.OPENROUTER_API_KEY;
const REFERER = process.env.YOUR_SITE_URL;
const SITE_NAME = process.env.YOUR_SITE_NAME;

app.post("/api/chat", async (req, res) => {
  const { message } = req.body;

  if (!message) {
    return res.status(400).json({ error: "Message is required." });
  }

  try {
    const response = await axios.post(
      OPENROUTER_API_URL,
      {
        model: "openai/gpt-3.5-turbo",
        messages: [
          {
            role: "user",
            content: message,
          },
        ],
      },
      {
        headers: {
          Authorization: `Bearer ${API_KEY}`,
          "HTTP-Referer": REFERER,
          "X-Title": SITE_NAME,
          "Content-Type": "application/json",
        },
      }
    );

    const botMessage =
      response.data.choices[0]?.message?.content || "No response from bot";

    res.json({
      sender: "bot",
      text: botMessage,
    });
  } catch (error) {
    if (error.response) {
      res.status(error.response.status).json({
        error:
          "An error occurred while fetching the response from OpenRouter API.",
      });
    } else {
      res.status(500).json({
        error: "Internal Server Error",
      });
    }
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
