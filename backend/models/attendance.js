const Sequelize = require("sequelize");
const sequelize = require('../config/db');
const Student = require('./student');

const Attendance = sequelize.define('attendance' , {
    date: {
        type: Sequelize.DATEONLY,
        allowNull: false
    },
    status: {
        type: Sequelize.ENUM('present', 'absent'),
        allowNull: false
    }
});

//relationships
Student.hasMany(Attendance);
Attendance.belongsTo(Student);

module.exports = Attendance;