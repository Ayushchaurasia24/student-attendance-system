const express = require('express');
const router = express.Router();

const studentController = require('../controllers/studentController');

// GET students
router.get('/', studentController.getStudents);

module.exports = router;