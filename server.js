import express from "express";
import dotenv from "dotenv";
import OpenAI from "openai";

dotenv.config();

const app = express();
const port = process.env.PORT || 3000; // важливо для Render

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY
});

app.get("/", (req, res) => {
  res.send("Сервер працює! 🚀");
});

app.get("/ask", async (req, res) => {
  const question = req.query.q || "Привіт";
  
  try {
    const response = await openai.responses.create({
      model: "gpt-4.1-mini",
      input: question
    });

    res.send(response.output[0].content[0].text);
  } catch (error) {
    console.error(error);
    res.status(500).send("Помилка AI");
  }
});

app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});

