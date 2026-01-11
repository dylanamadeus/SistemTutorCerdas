import express from 'express';
const router = express.Router();

import userRoutes from './user.js';
import authRoutes from './authRoutes.js';
import courseRoutes from './courseRoutes.js';
import materialsRoutes from './materialRoutes.js';
import tutorRoutes from "./tutorRoutes.js";
import tutorToogleRoutes from "./tutorToogleRoutes.js";
import sectionRoutes from "./sectionRoutes.js";

// Authentication
router.use('/auth', authRoutes);

// Feature routes
router.use('/users', userRoutes);
router.use('/courses', courseRoutes);
router.use('/materials', materialsRoutes);
router.use('/tutor', tutorRoutes);
router.use('/tutortoogle', tutorToogleRoutes);
router.use('/section', sectionRoutes);

// module.exports = router;  
export default router;
