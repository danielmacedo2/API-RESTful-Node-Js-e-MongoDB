// initial config

const express = require('express');
const app = express();
const mongoose = require('mongoose')

// Read Form JSON / middlewares

app.use(express.json());


// Initial Route / endpoint
app.get("/", (req, res) => {
  // show req

  res.json({ message: "Express método GET working" });
});

// entregar uma porta
mongoose.connect('mongodb+srv://danielmacedo:<password>@apicluster.b9bv4ja.mongodb.net/?retryWrites=true&w=majority')

// Port
app.listen(3000);
