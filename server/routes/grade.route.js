import * as gradeCtrl from '../controllers/grade.controller';
import genericRoute from '../../common-modules/server/routes/generic.route';
import { exportPdf } from '../../common-modules/server/utils/template';

const router = genericRoute(gradeCtrl, router => {
    router.route('/get-edit-data')
        .get((req, res) => {
            gradeCtrl.getEditData(req, res);
        });

    router.route('/get-pivot-data')
        .get(async (req, res) => {
            await gradeCtrl.getPivotData(req, res);
        });
    router.route('/get-pivot-data/export-pdf')
        .post((req, res) => {
            exportPdf(req, res);
        });

    router.route('/handle-email')
        .post(async (req, res) => {
            gradeCtrl.handleEmail(req, res);
        });

}, req => req.path.match('handle-email'));

export default router;