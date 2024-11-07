const express = require('express')
const router = express.Router();
const employeeControllers = require('../controllers/employeeControllers')
const protect = require('../middleware/authMiddleware');  // Import the protect middleware


router.get('/getemployee',protect,employeeControllers.getEmployeeDetails);
router.post ('/addemployee',protect, employeeControllers.addEmployeeDetails)

module.exports= router;