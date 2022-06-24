// API Routes
const router = require("express").Router();

const { update } = require("../models/Person");
const Person = require("../models/Person");

// CREATE - Criação de Dados

router.post("/", async (req, res) => {
  // req.body
  const { name, salary, email, approved } = req.body;

  if (!name) {
    return res.status(422).json({ error: "O nome é obrigatório!" });
  }
  if (!email) {
    return res.status(422).json({ error: "O email é obrigatório!" });
  }

  const person = {
    name,
    salary,
    email,
    approved,
  };

  try {
    await Person.create(person);

    res
      .status(201)
      .json({ message: "Pessoa adicionada no sistema com sucesso!" });
  } catch (error) {
    res.status(500).json({ error: error });
  }
});

// READ - Leitura de Dados

router.get("/", async (req, res) => {
  try {
    const people = await Person.find();

    res.status(200).json(people);
  } catch (error) {
    res.status(500).json({ error: error });
  }
});

router.get("/:id", async (req, res) => {
  // extrair o dado da requisição, pela url = req.params

  const id = req.params.id;

  try {
    const person = await Person.findOne({ _id: id }); // encontra apenas 1 resultado

    if (!person) {
      return res.status(422).json({ message: "O usuário não foi encontrado!" });
    }

    // No MongoDB o ID se chama _id

    res.status(200).json(person);
  } catch (error) {
    res.status(500).json({ error: error });
  }
});


// UPDATE - Atualização de Dados(PUT, PATCH)
router.patch('/:id', async (req, res) => {
  const id = req.params.id

  const { name, salary, email, approved } = req.body

  const person = {
    name,
    salary, 
    email,
    approved,
  }

  try{

    const updatedPerson = await Person.updateOne({ _id: id}, person)

    if(updatedPerson.matchedCount === 0) {
      return res.status(422).json({message: "Usuário não encontrado"})
    }

    res.status(200).json({ message: 'Usuário atualizado com sucesso!'})

  } catch (error) {
    res.status(500).json({error: error})
  }
})


module.exports = router;
