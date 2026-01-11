const express = require('express');
const router = express.Router();
const sectionController = require('../controllers/sectionController');
const authMiddleware = require('../middlewares/authMiddleware');


router.get('/course/:courseId', authMiddleware, sectionController.getSectionsByCourseId);
router.put('/:courseId/:id', sectionController.updateSection);
router.post('/:courseId', sectionController.createSection);
router.delete('/:courseId/:id', sectionController.deleteSection);

module.exports = router;