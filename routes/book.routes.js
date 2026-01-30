const express = require('express');
const router = express.Router();

const {
    getAllBooks,
    getBookById,
    addNewBook,
    deleteBookById
} = require('../controllers/book.controller');

const {authenticate} = require('../middlewares/auth.middleware');

//Route to get all books

//public routes
router.get('/', getAllBooks);
router.get('/:id',  getBookById);

//protected routes
router.post('/',  addNewBook);
router.delete('/:id',  deleteBookById);


module.exports = router;