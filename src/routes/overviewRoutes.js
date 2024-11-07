const express = require('express');
const { getLibraryOverview } = require('../controllers/overviewControllers');
const protect = require('../middleware/authMiddleware');  // Import the protect middleware


const router = express.Router();

router.get('/overview', protect,getLibraryOverview);

module.exports = router;
