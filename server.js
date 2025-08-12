import express from "express";
import dotenv from "dotenv";

dotenv.config();

const app = express();
const port = process.env.PORT || 3000;

// Прості рандомні відповіді
const answers = {
  "привіт": ["Привіт!", "Вітаю!"],
  "як діла": ["Нормально", "Все добре", "Як хочеш"],
  "що робиш": ["Читаю", "Працюю", "Відпочиваю"],
  "за замовчуванням": ["Не розумію питання", "Спробуй інше питання"]
};

app.get("/", (req, res) => {
  res.send("Сервер працює! 🚀");
});

app.get("/ask", (req, res) => {
  const questionRaw = req.query.q || "";
  const question = questionRaw.toLowerCase();

  // Знаходимо відповіді по ключах
  let responseList = answers["за замовчуванням"];

  for (const key in answers) {
    if (question.includes(key)) {
      responseList = answers[key];
      break;
    }
  }

  // Вибираємо випадкову відповідь
  const answer = responseList[Math.floor(Math.random() * responseList.length)];

  res.send(answer);
});

app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});

