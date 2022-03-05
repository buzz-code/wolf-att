import KnownAbsence from '../models/known-absence.model';
import Student from '../models/student.model';
import genericController, { applyFilters, fetchPage } from '../../common-modules/server/controllers/generic.controller';
import { getListFromTable } from '../../common-modules/server/utils/common';

export const { findById, store, update, destroy, uploadMultiple } = genericController(KnownAbsence);

/**
 * Find all the items
 *
 * @param {object} req
 * @param {object} res
 * @returns {*}
 */
export async function findAll(req, res) {
    const dbQuery = new KnownAbsence()
        .where({ 'known_absences.user_id': req.currentUser.id })
        .query(qb => {
            qb.leftJoin('students', 'students.id', 'known_absences.student_tz')
            qb.select('known_absences.*')
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
    const [students] = await Promise.all([
        getListFromTable(Student, req.currentUser.id),
    ]);
    res.json({
        error: null,
        data: { students }
    });
}
