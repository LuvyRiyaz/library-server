const Book = require('../models/book');
const { successResponse, errorResponse } = require('../utils/response');
// const CustomError = require('../utils/CustomError');

// Utility function to find a book by ID
// const findBookById = async (bookId) => {
//   return Book.findById(bookId).lean();
// };

// Get all books
const getAllBooks = async () => {
  try {
    const books = await Book.find().lean();
    console.log('books: ', books);
    return successResponse({ data: books });
    console.log("demoe");
  } catch (err) {
    return errorResponse({ err });
  }
};

// Add a new book
const addBook = async ({ title, author, ISBN, quantity, price }) => {
  const newBook = new Book({
    title,
    author,
    ISBN,
    quantity,
    price
  });
  try {
    const savedBook = await newBook.save();
    return successResponse({ data: savedBook, statusCode: 201 });
  } catch (err) {
    return errorResponse({ err });
  }
};


module.exports = {
  getAllBooks,
  addBook,
};
