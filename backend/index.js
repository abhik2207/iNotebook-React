const connectToMongo = require('./db');
const express = require('express')
var cors = require('cors')

connectToMongo();
const app = express()
const port = 5000

// Middleware
app.use(express.json());
app.use(cors());

// Avalaible routes
app.use('/api/auth', require('./routes/auth'))
app.use('/api/notes', require('./routes/notes'))

app.listen(port, () => {
  console.log(` --> iNotebook server listening on port ${port} <-- `)
})
