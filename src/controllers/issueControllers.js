const Issue = require('../models/issueModels');
const Book = require('../models/book');
const Member = require('../models/employee');
const { sendNotification } = require('../config');

// Function to issue a book
const issueBook = async (req, res) => {
  const { title, employeeId, issueDate, dueDate } = req.body;

  try {
    // Update book availability and quantity
    const book = await Book.findOne({ title: title, available: true });
    if (!book || book.quantity < 1) {
      return res.status(404).send('Book not found or not available');
    }

    book.quantity -= 1;
    if (book.quantity < 1) {
      book.available = false;
    }
    await book.save();

    // Create new issue
    const issue = new Issue({
      title,
      employeeId,
      issueDate,
      dueDate,
      status: 'Issued',
      flagged: false,
    });
    await issue.save();

    // Send notification to the member
    const member = await Member.findOne({ employeeId: employeeId });
    if (!member) {
      return res.status(404).send('Member not found');
    }
    sendNotification(member.email, book.title, dueDate, 'Book Issue Notification', `You have successfully borrowed the book "${book.title}". The due date is ${dueDate}.`);

    res.status(201).json(issue);
  } catch (error) {
    console.error(error);
    res.status(500).send(error.message);
  }
};

// Function to return a book
const returnBook = async (req, res) => {
  const { title, employeeId } = req.body;

  try {
    const issue = await Issue.findOneAndUpdate(
      { title, employeeId, status: 'Issued' },
      { $set: { status: 'Returned', flagged: false } },
      { new: true }
    );

    if (!issue) {
      return res.status(404).send('Issue not found');
    }

    const book = await Book.findOne({ title: title });
    if (!book) {
      return res.status(404).send('Book not found');
    }

    book.quantity += 1;
    if (book.quantity > 0) {
      book.available = true;
    }
    await book.save();

    const member = await Member.findOne({ employeeId: employeeId });
    if (!member) {
      return res.status(404).send('Member not found');
    }
    sendNotification(member.email, book.title, null, 'Book Return Notification', `You have successfully returned the book "${book.title}".`);

    res.status(200).json(issue);
  } catch (error) {
    console.error(error);
    res.status(500).send(error.message);
  }
};

// Function to handle non-returned books
const handleNonReturnedBooks = async (req, res) => {
  try {
    const overdueIssues = await Issue.find({ dueDate: { $lt: new Date() }, status: 'Issued' });

    overdueIssues.forEach(async (issue) => {
      const member = await Member.findOne({ employeeId: issue.employeeId });
      if (member) {
        sendNotification(member.email, issue.title, issue.dueDate, 'Overdue Book Notification', `The book "${issue.title}" was due on ${issue.dueDate}. Please return it as soon as possible.`);
        await Issue.findByIdAndUpdate(issue._id, { $set: { flagged: true } });
      }
    });

    res.status(200).json(overdueIssues);
  } catch (error) {
    console.error(error);
    res.status(500).send(error.message);
  }
};

// Function to get all issued books
const getIssuedBooks = async (req, res) => {
  try {
    const issuedBooks = await Issue.find({ status: 'Issued' });

    const currentDate = new Date();

    const issuedBooksWithRemainingDays = issuedBooks.map(issue => {
      const dueDate = new Date(issue.dueDate);
      const remainingDays = Math.ceil((dueDate - currentDate) / (1000 * 60 * 60 * 24)); // Calculate remaining days
      return {
        ...issue.toObject(),
        remainingDays: remainingDays >= 0 ? remainingDays : 0, // Ensure remaining days is not negative
      };
    });

    res.status(200).json(issuedBooksWithRemainingDays);
  } catch (error) {
    console.error(error);
    res.status(500).send(error.message);
  }
};

// Function to get all returned books
const getReturnedBooks = async (req, res) => {
  try {
    const returnedBooks = await Issue.find({ status: 'Returned' });
    res.status(200).json(returnedBooks);
  } catch (error) {
    console.error(error);
    res.status(500).send(error.message);
  }
};

module.exports = {
  issueBook,
  returnBook,
  handleNonReturnedBooks,
  getIssuedBooks,
  getReturnedBooks,
};
