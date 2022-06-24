// initial config
const express = require("express");
const app = express();
const mongoose = require("mongoose");
require("dotenv").config();

const Person = require('./models/Person')

// Read Form JSON / middlewares

app.use(express.json());

// API Routes
app.post('/person', async (req, res) => {

  // req.body
  const {name, salary, email, approved} = req.body

  if(!name) {
    return res.status(422).json({error: 'O nome é obrigatório!'})
  }
  if(!email) {
     return res.status(422).json({error: 'O email é obrigatório!'})
  }


  const person = {
    name,
    salary,
    email,
    approved
  }
  
  try {
    await Person.create(person)

    res.status(201).json({ message: 'Pessoa adicionada no sistema com sucesso!'})
  } catch (error) {
    res.status(500).json({error: error})
  }

})
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