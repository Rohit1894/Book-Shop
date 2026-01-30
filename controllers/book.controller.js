const bookTable = require('../models/book.model');
const db = require('../db');
const { eq } = require('drizzle-orm');

// GET all books
const getAllBooks = async (req, res) => {
  try {
    const books = await db.select().from(bookTable);
    return res.json(books);
  } catch (err) {
    return res.status(500).json({ error: 'Failed to fetch books' });
  }
};

// GET book by id
const getBookById = async (req, res) => {
  try {
    const { id } = req.params;

    const [book] = await db
      .select()
      .from(bookTable)
      .where(eq(bookTable.id, id))
      .limit(1);

    if (!book) {
      return res.status(404).json({ error: 'Book not found' });
    }

    return res.json(book);
  } catch (err) {
    return res.status(400).json({ error: 'Invalid book id' });
  }
};

// CREATE book
const addNewBook = async (req, res) => {
  try {
    const { title, authorId, description } = req.body;

    if (!title || !authorId) {
      return res.status(400).json({
        error: 'title and authorId are required',
      });
    }

    const [result] = await db
      .insert(bookTable)
      .values({
        title,
        authorId,
        description,
      })
      .returning({ id: bookTable.id });

    return res.status(201).json({
      message: 'Book created successfully',
      id: result.id,
    });
  } catch (err) {
    return res.status(500).json({
      error: 'Failed to create book',
    });
  }
};

// DELETE book by id
const deleteBookById = async (req, res) => {
  try {
    const { id } = req.params;

    await db
      .delete(bookTable)
      .where(eq(bookTable.id, id));

    return res.json({ message: 'Book deleted successfully' });
  } catch (err) {
    return res.status(400).json({ error: 'Invalid book id' });
  }
};

module.exports = {
  getAllBooks,
  getBookById,
  addNewBook,
  deleteBookById,
};
