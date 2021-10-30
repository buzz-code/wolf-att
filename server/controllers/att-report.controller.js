import AttReport from '../models/att-report.model';
import Lesson from '../models/lesson.model';
import Student from '../models/student.model';
import Teacher from '../models/teacher.model';
import Klass from '../models/klass.model';
import User from '../models/user.model';
import { getDataToSave, getListFromTable } from '../../common-modules/server/utils/common';
import genericController, { applyFilters, fetchPage } from '../../common-modules/server/controllers/generic.controller';
import { getAndParseExcelEmail } from '../../common-modules/server/utils/email';

export const { findById, store, update, destroy, uploadMultiple } = genericController(AttReport);

/**
 * Find all the items
 *
 * @param {object} req
 * @param {object} res
 * @returns {*}
 */
export async function findAll(req, res) {
    const dbQuery = new AttReport()
        .where({ 'att_reports.user_id': req.currentUser.id })
        .query(qb => {
            qb.leftJoin('students', 'students.tz', 'att_reports.student_tz')
            qb.leftJoin('teachers', 'teachers.tz', 'att_reports.teacher_id')
            qb.leftJoin('klasses', 'klasses.key', 'att_reports.klass_id')
            qb.leftJoin('lessons', 'lessons.key', 'att_reports.lesson_id')
            qb.select('att_reports.*')
        });
    applyFilters(dbQuery, req.query.filters);
    fetchPage({ dbQuery }, req.query, res);
}

/**
 * Get edit data
 *
 * @param {object} req
 * @param {object} res
 * @returns {*}
 */
export async function getEditData(req, res) {
    const [students, teachers, klasses, lessons] = await Promise.all([
        getListFromTable(Student, req.currentUser.id, 'tz'),
        getListFromTable(Teacher, req.currentUser.id, 'tz'),
        getListFromTable(Klass, req.currentUser.id, 'key'),
        getListFromTable(Lesson, req.currentUser.id, 'key'),
    ]);
    res.json({
        error: null,
        data: { students, teachers, klasses, lessons }
    });
}

export async function handleEmail(req, res) {
    try {
        const data = await getAndParseExcelEmail(req, res);
        const columns = ['klass_id', 'student_tz', '', 'teacher_id', 'lesson_id', 'abs_count', 'approved_abs_count'];
        const body = getDataToSave(data, columns);
        const report_date = new Date().toISOString().substr(0, 10);
        body.forEach(item => {
            item.report_date = report_date;
        });
        const currentUser = await User.query({
            where: { id: req.query.userId },
            select: ['email', 'id']
        });
        await uploadMultiple({ body, currentUser }, {});
    } catch (e) {
        console.log(e);
    }
}
