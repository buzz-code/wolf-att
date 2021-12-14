import bookshelf from '../../common-modules/server/config/bookshelf';
import Lesson from './lesson.model';
import Student from './student.model';
import Teacher from './teacher.model';
import User from './user.model';

const TABLE_NAME = 'att_reports_and_grades';

/**
 * AttReport model.
 */
class AttReportAndGrade extends bookshelf.Model {

    /**
     * Get table name.
     */
    get tableName() {
        return TABLE_NAME;
    }

    // get hasTimestamps() {
    //     return true;
    // }

    user() {
        return this.belongsTo(User);
    }

    student() {
        return this.belongsTo(Student, 'student_tz', 'tz');
    }

    teacher() {
        return this.belongsTo(Teacher, 'teacher_id', 'tz');
    }

    lesson() {
        return this.belongsTo(Lesson, 'lesson_id', 'key');
    }
}

export default AttReportAndGrade;