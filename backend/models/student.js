const Sequelize = require("sequelize");
const sequelize = require('../config/db');

const Student = sequelize.define('student', {
    name: {
        type: Sequelize.STRING,
        allowNull: false
    }
});
module.exports = Student;