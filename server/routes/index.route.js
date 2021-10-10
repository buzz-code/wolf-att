import express from 'express';
import authRoutes from './auth.route';
import userRoutes from './user.route';
import yemotRoutes from './yemot.route';
import teacherRoutes from './teacher.route';
import studentRoutes from './student.route';
import lessonRoutes from './lesson.route';
import klassRoutes from './klass.route';
import studentKlassRoutes from './student-klass.route';
import groupRoutes from './group.route';
import textRoutes from './text.route';
import klassTypeRoutes from './klass-type.route';
import attReportRoutes from './att-report.route';
import reportEditRoutes from './report-edit.route';
import dashboardRoutes from './dashboard.route';

const router = express.Router();

router.use('/auth', authRoutes);
router.use('/users', userRoutes);
router.use('/yemot', yemotRoutes);
router.use('/teachers', teacherRoutes);
router.use('/students', studentRoutes);
router.use('/lessons', lessonRoutes);
router.use('/klasses', klassRoutes);
router.use('/student-klasses', studentKlassRoutes);
router.use('/groups', groupRoutes);
router.use('/texts', textRoutes);
router.use('/klass-types', klassTypeRoutes);
router.use('/att-reports', attReportRoutes);
router.use('/report-edit', reportEditRoutes);
router.use('/dashboard', dashboardRoutes);

export default router;