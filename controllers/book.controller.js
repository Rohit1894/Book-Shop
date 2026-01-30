const e = require('express');
const {books} = require('../models/book.model');

// get all books

exports.getAllBooks = (req, res) => {
    res.json(books);
}

// get book by id

exports.getBookById = (req, res) => {
    const id = parseInt(req.params.id);
    if (isNaN(id)) {
        return res.status(400).json({error: 'Invalid book ID'});
    }
    const book = books.find(b => b.id === id);

    if(!book) {
        return res.status(404).json({error: 'Book not found'}); 
    }
    res.json(book);
}

// add new book
exports.addNewBook = (req, res) => {
    const { title, author } = req.body;
    if (!title || title.trim() === "") {
        return res.status(400).json({ error : "Title is required"});
    }
    if (!author || author.trim() === "") {
        return res.status(400).json({ error : "Author is required"});
    }
    const newBook = {
        id : books.length +1,
        title,
        author
    };
    books.push(newBook);
    res.status(201).json(newBook);
}

// delete book by id
exports.deleteBookById = (req, res) => {
    const id = parseInt(req.params.id);
    if (isNaN(id)) {
        return res.status(400).json({error: 'Invalid book ID'});
    }
    const bookIndex = books.findIndex(b => b.id === id);
    if(bookIndex < 0) {
        return res.status(404).json({error: 'Book not found'}); 
    }   
    books.splice(bookIndex, 1);
    res.json({ message: 'Book deleted successfully' });
}