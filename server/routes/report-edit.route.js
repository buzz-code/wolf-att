import express from 'express';
import isAuthenticated from '../../common-modules/server/middlewares/authenticate';
import * as reportEditCtrl from '../controllers/report-edit.controller';
import validate from '../../common-modules/server/config/joi.validate';
import schema from '../../common-modules/server/utils/validator';

const router = express.Router();

router.use(isAuthenticated);

router.route('/get-edit-data')
    .get((req, res) => {
        reportEditCtrl.getEditData(req, res);
    });

router.route('/get-report-results')
    .post((req, res) => {
        reportEditCtrl.getReportResults(req, res);
    });

// router.route('/')
//     .post(validate(schema.any), (req, res) => {
//         reportEditCtrl.store(req, res);
//     })
//     .get((req, res) => {
//         reportEditCtrl.findAll(req, res);
//     });

// router.route('/:id')
//     .get((req, res) => {
//         reportEditCtrl.findById(req, res);
//     })
//     .put((req, res) => {
//         reportEditCtrl.update(req, res);
//     })
//     .delete((req, res) => {
//         reportEditCtrl.destroy(req, res);
//     });

export default router;