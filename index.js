// DEPENDENCIES
const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')

// CONFIGURATION
require('dotenv').config();
console.log(process.env.PORT);
console.log(process.env.MONGO_URI);
const PORT = process.env.PORT
const app = express()
mongoose.connect(process.env.MONGO_URI, {useNewUrlParser: true, useUnifiedTopology: true})
  .then(() => {
    console.log('connected to mongo: ', process.env.MONGO_URI);
  })
  .catch((err) => {
    console.error('Error connecting to MongoDB:', err);
  });

// MIDDLEWARE
app.use(express.json())
app.use(express.urlencoded({extended: true})) //help receive http requests
app.use(cors())


// ROUTES
app.get('/', (req, res) => {
    res.send('This is my books-api!')
})

// BOOKS
const booksController = require('./controllers/books_controller.js')
app.use('/books', booksController)

// 404 PAGE
app.get('*', (req, res) => {
    res.send('<h1>404 Page<h1>')
})

// LISTEN
app.listen(process.env.PORT, () => {
    console.log(`Server listening on port ${PORT}`)
})