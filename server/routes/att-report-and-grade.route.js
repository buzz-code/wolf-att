import * as attReportAndGradeCtrl from '../controllers/att-report-and-grade.controller';
import genericRoute from '../../common-modules/server/routes/generic.route';
import { exportPdf } from '../../common-modules/server/utils/template';

const router = genericRoute(attReportAndGradeCtrl, router => {
    router.route('/get-edit-data')
        .get((req, res) => {
            attReportAndGradeCtrl.getEditData(req, res);
        });

    router.route('/get-pivot-data')
        .get(async (req, res) => {
            await attReportAndGradeCtrl.getPivotData(req, res);
        });
    router.route('/get-pivot-data/export-pdf')
        .post((req, res) => {
            exportPdf(req, res);
        });

    // router.route('/handle-email')
    //     .post(async (req, res) => {
    //         attReportAndGradeCtrl.handleEmail(req, res);
    //     });

}, req => req.path.match('handle-email'));

export default router;