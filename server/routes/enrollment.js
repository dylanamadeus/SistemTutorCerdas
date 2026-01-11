const express = require('express');
const router = express.Router();
const enrollmentController = require('../controllers/enrollmentController');

router.get('/', enrollmentController.getAllEnrollments);
router.post('/', enrollmentController.createEnrollment);

module.exports = router;
