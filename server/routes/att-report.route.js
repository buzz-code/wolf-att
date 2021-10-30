import * as attReportCtrl from '../controllers/att-report.controller';
import genericRoute from '../../common-modules/server/routes/generic.route';
import { getAndParseExcelEmail } from '../../common-modules/server/utils/email';

const router = genericRoute(attReportCtrl, router => {
    router.route('/get-edit-data')
        .get((req, res) => {
            attReportCtrl.getEditData(req, res);
        });

    router.route('/handle-email')
        .post(async (req, res) => {
            const data = await getAndParseExcelEmail(req, res);
            // attReportCtrl.handleEmail(data);
        });
}, req => req.path.match('handle-email'));

export default router;