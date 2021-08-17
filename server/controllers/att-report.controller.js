import AttReport from '../models/att-report.model';
import AttType from '../models/att-type.model';
import Lesson from '../models/lesson.model';
import Student from '../models/student.model';
import Teacher from '../models/teacher.model';
import { getListFromTable } from '../../common-modules/server/utils/common';
import genericController, { applyFilters, fetchPage } from '../../common-modules/server/controllers/generic.controller';

export const { findById, store, update, destroy, uploadMultiple } = genericController(AttReport);

/**
 * Find all the items
 *
 * @param {object} req
 * @param {object} res
 * @returns {*}
 */
export async function findAll(req, res) {
    const dbQuery = new AttReport({ user_id: req.currentUser.id })
        .query(qb => {
            qb.leftJoin('students', 'students.tz', 'att_reports.student_tz')
            qb.leftJoin('teachers', 'teachers.tz', 'att_reports.teacher_id')
            qb.leftJoin('lessons', 'lessons.key', 'att_reports.lesson_id')
            qb.leftJoin('att_types', 'att_types.key', 'att_reports.att_type_id')
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
    const [students, teachers, lessons, attTypes] = await Promise.all([
        getListFromTable(Student, req.currentUser.id, 'tz'),
        getListFromTable(Teacher, req.currentUser.id, 'tz'),
        getListFromTable(Lesson, req.currentUser.id, 'key'),
        getListFromTable(AttType, req.currentUser.id, 'key'),
    ]);
    res.json({
        error: null,
        data: { students, teachers, lessons, attTypes }
    });
}
