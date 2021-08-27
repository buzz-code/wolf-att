import * as studentKlassCtrl from '../controllers/student-klass.controller';
import genericRoute from '../../common-modules/server/routes/generic.route';

const router = genericRoute(studentKlassCtrl, router => {
    router.route('/get-edit-data')
        .get((req, res) => {
            studentKlassCtrl.getEditData(req, res);
        });
        
    router.route('/report-by-klass-type')
        .get((req, res) => {
            studentKlassCtrl.reportByKlassType(req, res);
        });
});

export default router;