import express from 'express';
import * as dashboardCtrl from '../controllers/dashboard.controller';
import isAuthenticated from '../../common-modules/server/middlewares/authenticate';

const router = express.Router();

router.use(isAuthenticated);

router.route('/')
    .get((req, res) => {
        dashboardCtrl.getStats(req, res);
    });

export default router;