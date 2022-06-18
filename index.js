// initial config

const express = require('express');
const app = express();

// Read Form JSON / middlewares
app.use({
    extended: true,
})

app.use(express.json())

// Initial Route / endpoint
app.get('/', (req, res) => {

    // show req

    res.json({message: "Express método GET working"})

})

// Port
app.listen(3000)