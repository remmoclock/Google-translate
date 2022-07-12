// const PORT = 8000;
const PORT = "https://google-traduction.herokuapp.com";
const axios = require("axios").default;
const express = require("express");
const cors = require("cors");
require("dotenv").config();
console.log(process.env);
const app = express();

app.use(cors());

app.listen(PORT, () => console.log("Server run on port " + PORT));

app.get("/languages", async (req, res) => {
  const options = {
    method: "GET",
    headers: {
      "X-RapidAPI-Host": process.env.RAPID_API_HOST,
      "X-RapidAPI-Key": process.env.RAPID_API_KEY,
    },
  };

  try {
    const response = await axios(
      "https://google-translate20.p.rapidapi.com/languages",
      options
    );
    const arrayOfData = Object.keys(response.data.data).map(
      (key) => response.data.data[key]
    );
    res.status(200).json(arrayOfData);
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: err });
  }
});

app.get("/translation", async (req, res) => {
  const { textToTranslate, outputLanguage, inputLanguage } = req.query;

  const options = {
    method: "GET",
    params: {
      text: textToTranslate,
      tl: outputLanguage,
      sl: inputLanguage,
    },
    headers: {
      "x-rapidapi-host": process.env.RAPID_API_HOST,
      "x-rapidapi-key": process.env.RAPID_API_KEY,
    },
  };

  try {
    const response = await axios(
      "https://google-translate20.p.rapidapi.com/translate",
      options
    );
    res.status(200).json(response.data.data.translation);
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: err });
  }
});
