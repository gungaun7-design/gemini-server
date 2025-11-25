import express from "express";
import axios from "axios";
import cors from "cors";
import dotenv from "dotenv";

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

app.post("/chat", async (req, res) => {
  try {
    const userMessage = req.body.message;

    const response = await axios.post(
      "https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent?key=" + process.env.GEMINI_API_KEY,
      {
        contents: [
          {
            parts: [
              { text: userMessage }
            ]
          }
        ]
      }
    );

    res.json(response.data);
  } catch (error) {
    res.status(500).json({ error: "API Request Failed", details: error.message });
  }
});

app.listen(3000, () => console.log("Server running on port 3000"));
