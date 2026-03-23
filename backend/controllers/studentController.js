const Student = require('../models/student');

// GET all students
exports.getStudents = async (req, res) => {
  try {
    const students = await Student.findAll();
    res.json(students);
  } catch (err) {
    res.status(500).json(err);
  }
};