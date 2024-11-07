const Book = require('../models/book');
const Employee = require('../models/employee');
const Issue = require('../models/issueModels');

const getLibraryOverview = async (req, res) => {
  try {
    // Get total number of books
    const totalBooks = await Book.countDocuments();

    // Get total number of members
    const totalMembers = await Employee.countDocuments();

    // Get number of returned books
    const returnedBooks = await Issue.countDocuments({ status: 'Returned' });

    // Get number of non-returned books
    const nonReturnedBooks = await Issue.countDocuments({ status: 'Issued' });

    // Get number of overdue books
    const overdueBooks = await Issue.countDocuments({ dueDate: { $lt: new Date() }, status: 'Issued' });

    // Construct the overview object
    const overview = {
      totalBooks,
      totalMembers,
      returnedBooks,
      nonReturnedBooks,
      overdueBooks,
    };

    res.status(200).json(overview);
  } catch (error) {
    console.error(error);
    res.status(500).send(error.message);
  }
};

module.exports = {
  getLibraryOverview,
};
