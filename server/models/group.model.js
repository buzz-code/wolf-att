import bookshelf from '../../common-modules/server/config/bookshelf';
import Klass from './klass.model';
import Teacher from './teacher.model';
import Lesson from './lesson.model';
import User from './user.model';

const TABLE_NAME = 'groups';

/**
 * Group model.
 */
class Group extends bookshelf.Model {

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

    klass() {
        return this.belongsTo(Klass, 'klass_id', 'key');
    }

    teacher() {
        return this.belongsTo(Teacher, 'teacher_id', 'tz');
    }

    lesson() {
        return this.belongsTo(Lesson, 'lesson_id', 'key');
    }
}

export default Group;