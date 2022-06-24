// initial config
require("dotenv").config();
const express = require("express");
const app = express();
const mongoose = require("mongoose");

// Read Form JSON / middlewares

app.use(
  express.urlencoded({
    extended: true,
  }),
)


app.use(express.json());


// API Routes
const personRoutes = require('./routes/personRoutes')

app.use('/person', personRoutes)


// Initial Route / endpoint
app.get("/", (req, res) => {
  // show req

  res.json({ message: "Express método GET working" });
});

// Credentials
const dbUser = process.env.DB_USER;
const dbPassword = process.env.DB_PASS;

// entregar uma porta
mongoose
  .connect(
    `mongodb+srv://${dbUser}:${dbPassword}@apicluster.b9bv4ja.mongodb.net/?retryWrites=true&w=majority`
  )
  .then(() => {
    console.log("MongoDB conectado!");
    app.listen(3000);
  }).catch((error) => {
    console.log(error);
  });