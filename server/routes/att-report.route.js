import * as attReportCtrl from '../controllers/att-report.controller';
import genericRoute from '../../common-modules/server/routes/generic.route';

const router = genericRoute(attReportCtrl, router => {
    router.route('/get-edit-data')
        .get((req, res) => {
            attReportCtrl.getEditData(req, res);
        });

    router.route('/get-pivot-data')
        .get(async (req, res) => {
            await attReportCtrl.getPivotData(req, res);
        });

    router.route('/handle-email')
        .post(async (req, res) => {
            attReportCtrl.handleEmail(req, res);
        });

}, req => req.path.match('handle-email'));

export default router;