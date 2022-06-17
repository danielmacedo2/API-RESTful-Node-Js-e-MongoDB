// initial config

const express = require('express');
const app = express();

// Read Form JSON / middlewares
app.use({
    extended: true,
})

app.use(express.json())

// Initial Route / endpoint


// Port
app.listen(3000)