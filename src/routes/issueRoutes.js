const express = require('express');
const router = express.Router();
const issuecontrollers = require ('../controllers/issueControllers')
const protect = require('../middleware/authMiddleware');  // Import the protect middleware


router.post('/issuebook', protect,issuecontrollers.issueBook);
router.post('/return', protect,issuecontrollers.returnBook);
router.get('/overdue',protect, issuecontrollers.handleNonReturnedBooks);
router.get('/getIssuedBook', protect,issuecontrollers.getIssuedBooks);
router.get('/getReturnedBook', protect,issuecontrollers.getReturnedBooks);

module.exports = router;
