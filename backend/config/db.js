const Sequelize = require('sequelize');

//db connection
const sequelize = new Sequelize('attendance_db', 'root', 'Ayush@123', {
    host: 'localhost',
    dialect: 'mysql'
});

module.exports = sequelize;