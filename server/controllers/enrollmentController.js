const { Enrollment } = require('../models');

exports.getAllEnrollments = async (req, res) => {
  try {
    const enrollments = await Enrollment.findAll();
    res.json(enrollments);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.createEnrollment = async (req, res) => {
  try {
    const { userId, courseId } = req.body;
    const newEnrollment = await Enrollment.create({ userId, courseId });
    res.status(201).json(newEnrollment);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
