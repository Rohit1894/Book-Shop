const express = require('express');
const app = express();
const port = 8000;
const database = require('./database');

app.use(express.json());

app.get('/books', (req , res) => {
    res.json(database);
});

app.get('/books/:id', (req , res) => {
    const id = parseInt(req.params.id);
    
    if (isNaN(id)) {
        return res.status(400).json({error: 'Invalid book ID'});
    }
    const book = database.find(b => b.id === id);

    if(!book) {
        return res.status(404).json({error: 'Book not found'}); 
    }
    res.json(book);
});

app.post('/books', (req , res) => {
    const { title, author } = req.body;

    if (!title || title.trim() === "") {
        return res.status(400).json({ error : "Title is required"});
    }
    if (!author || author.trim() === "") {
        return res.status(400).json({ error : "Author is required"});
    }
    const newBook = {
        id : database.length +1,
        title,
        author
    };

    database.push(newBook);
    res.status(201).json({
        message : "Book added successfully",
        id : newBook.id   
    })
});

app.delete('/books/:id', (req , res) => {
    const id = parseInt(req.params.id);     

    if (isNaN(id)) {
        return res.status(400).json({error: 'Invalid book ID'});
    }   

    const bookIndex = database.findIndex(b => b.id === id);

    if(bookIndex < 0) {
        return res.status(404).json({error: 'Book not found'}); 
    }

    database.splice(bookIndex, 1);
    res.status(200).json({message: 'Book deleted successfully'});
});



app.listen(port , () => {
    console.log(`Server is running on port ${port}`);          
});