const express = require('express')
const books = express.Router()
const Book = require('../models/book.js')

books.get('/seed', (req, res) => {
    Book.insertMany([{
        "title": "The Shinobi Initiative",
        "description": "The reality-bending adventures of a clandestine service agency in the year 2166",
        "year": 2014,
        "quantity": 10,
        "imageURL": "https://imgur.com/LEqsHy5.jpeg"
      },
      {
        "title": "Tess the Wonder Dog",
        "description": "The tale of a dog who gets super powers",
        "year": 2007,
        "quantity": 3,
        "imageURL": "https://imgur.com/cEJmGKV.jpg"
      },
      {
        "title": "The Annals of Arathrae",
        "description": "This anthology tells the intertwined narratives of six fairy tales.",
        "year": 2016,
        "quantity": 8,
        "imageURL": "https://imgur.com/VGyUtrr.jpeg"
      },
      {
        "title": "Wâˆ€RP",
        "description": "A time-space anomaly folds matter from different points in earth's history in on itself, sending six unlikely heroes on a race against time as worlds literally collide.",
        "year": 2010,
        "quantity": 4,
        "imageURL": "https://imgur.com/qYLKtPH.jpeg"
      }])
        .then(res.status(200).json({
            message: 'Seed successful'
        }))
        .catch(res.status(400).json({
            message: 'Seed unsuccessful'
        }))
})

// INDEX
books.get('/', (req, res) => {
    Book.find({})
      .then((books) => {
        console.log('All books found successfully')
        res.status(200).json(books)
      })
      .catch((err) => {
        console.error('Error finding books:', err)
        res.status(400).json({ message: err.message })
      })
})

// INDIVIDUAL BOOK/SHOW
books.get('/:id', (req, res) => {
    Book.findById(req.params.id)
      .then((book) => {
        if (book) {
          console.log(`Book with id ${req.params.id} found successfully`)
          res.status(200).json(book);
        } else {
          console.log(`Book with id ${req.params.id} not found`) 
          res.status(404).json({ message: 'Book not found' });
        }
      })
      .catch((err) => {
        console.error(`Error finding book with id ${req.params.id}:`, err)
        res.status(400).json({ message: err.message });
      });
  });

  // CREATE 
  books.post('/', (req, res) => {
    const newBook = new Book({
        title: req.body.title,
        description: req.body.description,
        year: req.body.year,
        quantity: req.body.quantity,
        imageURL: req.body.imageURL
    })

    newBook.save()
     .then((book) => {
        console.log(`New book with id ${book._id} created successfully`)
        res.status(201).json(book)
     })
     .catch((err) => {
        console.error(`Error creating new book: ${err}`)
        res.status(400).json({ message: err.message })
     })
  })

  //UPDATE 
  books.put('/:id', async (req, res) => {
    try {
        const book = await Book.findById(req.params.id);
        if (!book) {
            console.log(`Book with id ${req.params.id} not found`);
            return res.status(404).json({ message: 'Book not found' });
        }

        book.title = req.body.title;
        book.description = req.body.description;
        book.year = req.body.year;
        book.quantity = req.body.quantity;
        book.imageURL = req.body.imageURL;

        const updatedBook = await book.save();
        console.log(`Book with id ${req.params.id} updated successfully`);
        res.status(200).json(updatedBook);
    } catch (err) {
        console.error(`Error updating book with id ${req.params.id}:`, err);
        res.status(400).json({ message: err.message });
    }
});

// DELETE
books.delete('/:id', (req, res) => {
    Book.findByIdAndRemove(req.params.id)
      .then(book => {
        if (!book) {
          console.log(`Book with id ${req.params.id} not found`);
          return res.status(404).json({ message: 'Book not found' });
        }
        console.log(`Book with id ${req.params.id} deleted successfully`);
        res.status(200).json({ message: 'Book deleted successfully' });
      })
      .catch(err => {
        console.error(`Error deleting book with id ${req.params.id}:`, err);
        return res.status(400).json({ message: err.message });
      });
  });
  
  
  

module.exports = books