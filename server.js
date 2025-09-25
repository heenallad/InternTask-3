const express = require('express');
const app = express();
const PORT = 3000;

app.use(express.json());

let books = [];
let idCounter = 1;

// CREATE a new book
app.post('/books',(req,res) => {
    const {title,author} = req.body;
    const newBook = {id: idCounter++, title, author};
    books.push(newBook);
    res.status(201).json(newBook);
});

// READ all books
app.get('/books',(req,res) => {
    res.json(books);
});

// READ book by the ID indiviually
app.get('/books/:id',(req,res) => {
    const book = books.find(b => b.id === parseInt(req.params.id));
    if(!book) return res.status(404).json({message: 'Book not found'});
    res.json(book);
});

// UPDATE book by ID
app.put('/books/:id',(req,res) => {
    const book = books.find(b => b.id === parseInt(req.params.id));
    if(!book) return res.status(404).json({message: 'Book not found'});

    const {title,author} = req.body;
    book.title = title || book.title;
    book.author = author || book.author;
    res.json(book);
});

// DELETE book by ID
app.delete('/books/:id', (req, res) => {
  const index = books.findIndex(b => b.id === parseInt(req.params.id));
  if (index === -1) return res.status(404).json({ message: 'Book not found' });

  const deletedBook = books.splice(index, 1);
  res.json(deletedBook[0]);
});

//Start the server

app.listen(PORT,() => {
    console.log('Server running on http://localhost:${PORT}');
});
