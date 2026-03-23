const express = require("express");
const app = express();

const sequelize = require('./config/db');
const cors = require('cors');

//midlewaree
app.use(express.json());
app.use(cors());

//routes
const attendanceRoutes = require('./routes/attendanceRoutes');
app.use('/attendance', attendanceRoutes);
const studentRoutes = require('./routes/studentRoutes');
app.use('/students', studentRoutes);

sequelize.sync().then(()=>{
    console.log("db connect");

    app.listen(3000, ()=>{
        console.log("runs at 3000");
    });
});