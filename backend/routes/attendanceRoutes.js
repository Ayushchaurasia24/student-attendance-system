const express = require("express");
const router = express.Router();
const controller = require('../controllers/attendanceController');

router.post('/mark', controller.markAttendance);
router.get('/date', controller.getAttendanceByDate);
router.get('/report', controller.getReport);

module.exports = router;