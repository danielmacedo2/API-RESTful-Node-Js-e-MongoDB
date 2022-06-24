// API Routes
const router = require("express").Router();

const Person = require('../models/Person');

// CREATE - Criação de Dados

router.post('/', async (req, res) => {
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

// READ - Leitura de Dados

router.get('/', async (req, res) => {
  try{
    const people = await Person.find()

    res.status(200).json(people)
  } catch (error) {
    res.status(500).json({error: error})
  }
})

module.exports = router;