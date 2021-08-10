import bookshelf from '../../common-modules/server/config/bookshelf';

const TABLE_NAME = 'texts';

/**
 * Text model.
 */
class Text extends bookshelf.Model {

    /**
     * Get table name.
     */
    get tableName() {
        return TABLE_NAME;
    }

    /**
     * Table has timestamps.
     */
    // get hasTimestamps() {
    //     return true;
    // }
}

export default Text;