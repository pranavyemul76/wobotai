const express = require("express");
const cors = require("cors");
const port = process.env.PORT || 8080;
const host = process.env.HOST || "localhost";
const mongoose = require("mongoose");
const Router = require("./Router/Router");
require("dotenv").config();
const app = express();
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors({ origin: "*" }));
app.use("/", Router);

mongoose
  .connect(process.env.URL, { useNewUrlParser: true, useUnifiedTopology: true })
  .then((res) => {
    app.listen(port, host, () => {
      console.log(`server run on ${port}`);
    });
  })
  .catch((res) => {
    console.log(res);
  });
