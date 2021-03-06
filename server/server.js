const express = require("express");
const PORT = process.env.PORT || 8000;
const cors = require("cors");
require("dotenv").config();
const app = express();
const axios = require("axios").default;
const path = require("path")

app.use(cors());

app.use(
  express.static(path.join(__dirname + "/public"))
);

 app.get("/languages", async (req, res) => {
  const options = {
    method: "GET",
    headers: {
      "X-RapidAPI-Host": process.env.REACT_APP_GOOGLE_HOST_API,
      "X-RapidAPI-Key": process.env.REACT_APP_GOOGLE_KEY_API,
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
      "x-rapidapi-host": process.env.REACT_APP_GOOGLE_HOST_API,
      "x-rapidapi-key": process.env.REACT_APP_GOOGLE_KEY_API,
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

app.listen(PORT, () => console.log("Server run on port " + PORT));
