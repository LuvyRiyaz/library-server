const express = require('express');
const router = express.Router();
const booksController = require('../controllers/bookControllers');
const protect = require('../middleware/authMiddleware');  // Importing your authentication middleware

// Apply the protect middleware to routes that require authentication
router.get('/getbooks', protect, booksController.getAllBooks);
router.post('/addbook', protect, booksController.addBook);

module.exports = router;
