import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import fetch from "node-fetch"; // Ensure you have node-fetch installed

const app = express();
const port = 5000;

app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.get("/:code/:key", async (req, res) => {
  const country = req.params.code;
  const apiKey = req.params.key;
  console.log("call hus");

  try {
    const response = await fetch(
      `https://newsapi.org/v2/top-headlines?country=${country}&apiKey=${apiKey}`
    );
    const data = await response.json();
    console.log(data);
    res.json(data);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.listen(port, () => {
  console.log(`Your site is running at http://localhost:${port}`);
});
