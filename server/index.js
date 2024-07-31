const express = require("express");
const dotenv = require("dotenv");
const {readdirSync} = require("fs");
const cors=require('cors');
const { connectDB } = require("./connection");
dotenv.config();
const app = express();
connectDB();
app.use(
  cors({
    
    origin: process.env.CLIENT_URL,
    credentials: true,
  })
);
app.use(express.json());

const port = process.env.PORT || 5000;

readdirSync("./routes").map((route) => {
  app.use("/api", require(`./routes/${route}`));
});
app.listen(port, () => {
  console.log(`Running on port ${port}`);
});
