import moment from "moment";
import bookshelf from '../../common-modules/server/config/bookshelf';
import Klass from "../models/klass.model";
import Teacher from "../models/teacher.model";
import User from "../models/user.model";
import StudentKlass from "../models/student-klass.model";
import Lesson from "../models/lesson.model";
import Group from "../models/group.model";
import AttReport from "../models/att-report.model";
import Grade from "../models/grade.model";

export function getUserByPhone(phone_number) {
    return new User().where({ phone_number })
        .fetch()
        .then(res => res.toJSON());
}

export function getTeacherByUserIdAndPhone(user_id, phone) {
    return new Teacher().where({ user_id })
        .where(bookshelf.knex.raw('(phone = ? or phone2 = ?)', [phone, phone]))
        .fetch({ require: false })
        .then(res => res ? res.toJSON() : null);
}

export function getKlassByUserIdAndKlassId(user_id, key) {
    return new Klass().where({ user_id, key })
        .fetch({ require: false })
        .then(res => res ? res.toJSON() : null);
}

export function getLessonByUserIdAndLessonId(user_id, key) {
    return new Lesson().where({ user_id, key })
        .fetch({ require: false })
        .then(res => res ? res.toJSON() : null);
}

export function getExistingReport(user_id, klass_id, lesson_id) {
    return new AttReport().where({ user_id, klass_id, lesson_id })
        .where('report_date', '>=', moment().add(-7, 'days').toISOString().substr(0, 10))
        .fetchAll()
        .then(res => res ? res.toJSON() : null);
}

export function getExistingGrades(user_id, klass_id, lesson_id) {
    return new Grade().where({ user_id, klass_id, lesson_id })
        .where('report_date', '>=', moment().add(-7, 'days').toISOString().substr(0, 10))
        .fetchAll()
        .then(res => res ? res.toJSON() : null);
}

export function getStudentsByUserIdAndKlassId(user_id, klass_id) {
    return new StudentKlass().where({ user_id, klass_id })
        .fetchAll({ withRelated: [{ student: function (query) { query.orderBy('name'); } }] })
        .then(res => res.toJSON())
        .then(res => res.map(item => item.student));
}

export async function getDiaryDataByGroupId(group_id) {
    const group = await new Group().where({ id: group_id })
        .fetch({ withRelated: ['klass', 'teacher', 'lesson'] })
        .then(res => res.toJSON());
    const students = await getStudentsByUserIdAndKlassId(group.user_id, group.klass_id);

    return { group, students: students.sort((a, b) => a.name.localeCompare(b.name)) };
}
