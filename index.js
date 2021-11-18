const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const PORT = process.env.PORT || 5000;
const { default: axios } = require("axios");
const fs = require("fs");

const app = express();
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get("/products", async (req, res) => {
  try {
    const products = await axios.get(
      "https://5bz4k87guh.execute-api.ap-south-1.amazonaws.com/default/products",
      {
        headers: {
          "x-api-key": "4stMifzQhb4D2RMj6dfrq76PSbB9X7rS36c4kS2g",
        },
      }
    );
    console.log(products.data.length);

    res.send(products.data);
  } catch (error) {
    console.log(error.message);
    // res.sendStatus(400).send(error);
    fs.readFile(`data.json`, "utf8", (err, data) => {
      if (err) {
        console.error(err);
        return;
      }

      res.send(data);
    });
  }
});

app.listen(PORT, console.log("Listening"));
