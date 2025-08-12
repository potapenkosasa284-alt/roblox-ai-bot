import express from "express";
import dotenv from "dotenv";
import fetch from "node-fetch";  // треба встановити: npm install node-fetch@2

dotenv.config();

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());

// Словник простих відповідей
const simpleAnswers = {
  "привіт": ["Привіт!", "Вітаю!", "Здоров!"],
  "як діла?": ["Нормально", "Як хочеш", "Все ок"],
  "що робиш?": ["Просто відповідаю", "Чекаю на твої питання"]
};

function getSimpleAnswer(question) {
  const key = question.toLowerCase();
  if (simpleAnswers[key]) {
    const answers = simpleAnswers[key];
    // Випадковий вибір відповіді
    return answers[Math.floor(Math.random() * answers.length)];
  }
  return null;
}

// Функція пошуку у Вікіпедії
async function searchWikipedia(query) {
  try {
    const url = `https://uk.wikipedia.org/w/api.php?action=query&list=search&srsearch=${encodeURIComponent(query)}&utf8=&format=json`;
    const response = await fetch(url);
    const data = await response.json();
    if (data.query.search.length > 0) {
      const snippet = data.query.search[0].snippet.replace(/<\/?[^>]+(>|$)/g, ""); // видаляємо html теги
      return snippet + "...";
    }
    return "Вибач, не знайшов нічого на це питання.";
  } catch (e) {
    return "Сталася помилка при пошуку.";
  }
}

app.get("/ask", async (req, res) => {
  const question = req.query.q || "";

  // Спершу шукаємо просту відповідь
  const simple = getSimpleAnswer(question);
  if (simple) {
    return res.send({ answer: simple });
  }

  // Якщо немає простої відповіді — шукаємо у Вікіпедії
  const wikiAnswer = await searchWikipedia(question);
  return res.send({ answer: wikiAnswer });
});

app.get("/", (req, res) => {
  res.send("Сервер AI працює!");
});

app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
