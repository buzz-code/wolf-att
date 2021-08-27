import bookshelf from '../../common-modules/server/config/bookshelf';
import User from './user.model';
import KlassType from './klass-type.model';

const TABLE_NAME = 'klasses';

/**
 * Klass model.
 */
class Klass extends bookshelf.Model {

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

    klassType() {
        return this.belongsTo(KlassType);
    }
}

export default Klass;