const { Sequelize, where } = require('sequelize');
const Attendance = require('../models/attendance');
const Student = require('../models/student');

//mark attend
exports.markAttendance = async (req, res) => {

  const { date, records } = req.body;

  try {
    for (let r of records) {

      // Check if already exists
      const existing = await Attendance.findOne({
        where: {
          studentId: r.studentId,
          date: date
        }
      });

      if (existing) {
        // Update instead of duplicate
        await existing.update({ status: r.status });

      } else {
        // Create new
        await Attendance.create({
          studentId: r.studentId,
          date,
          status: r.status
        });
      }
    }

    res.json({ message: "Attendance saved (no duplicates)" });

  } catch (err) {
    res.status(500).json(err);
  }
};

//get by date
exports.getAttendanceByDate = async (req,res) =>{
    const {date} = req.query;

    try{
        const data = await Attendance.findAll({
            where: {date},
            include: Student
        });

        res.json(data);
    } catch(err){
        res.status(500).json(err);
    }
};

//report
exports.getReport = async(req,res) =>{
    try{
        const report = await Attendance.findAll({
            attributes: [
                'studentId',
                [Sequelize.fn('COUNT', Sequelize.col('id')), 'total'],
                [
                    Sequelize.fn(
                        'SUM',
                        Sequelize.literal("status = 'present'")
                    ),
                    'presentCount'
                ]
            ],
            group: ['studentId']
        });

        const result = report.map(r => {
            const total = r.dataValues.total;
            const present = r.dataValues.presentCount;

            return {
                studentId: r.studentId,
                total,
                present,
                percentage: ((present / total) * 100).toFixed(2)
            };
        });
        res.json(result);
    } catch (err) {
        res.status(500).json(err);
    }
};