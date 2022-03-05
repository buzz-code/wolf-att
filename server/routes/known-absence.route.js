import * as knownAbsenceCtrl from '../controllers/known-absence.controller';
import genericRoute from '../../common-modules/server/routes/generic.route';

const router = genericRoute(knownAbsenceCtrl, router => {
    router.route('/get-edit-data')
        .get((req, res) => {
            knownAbsenceCtrl.getEditData(req, res);
        });
});

export default router;