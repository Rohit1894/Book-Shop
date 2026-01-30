const express = require('express');
const router = express.Router();

const {
  getAllBooks,
  getBookById,
  addNewBook,
  deleteBookById,
} = require('../controllers/book.controller');

// public routes
router.get('/', getAllBooks);
router.get('/:id', getBookById);

// protected routes (middleware optional)
router.post('/', addNewBook);
router.delete('/:id', deleteBookById);

module.exports = router;
