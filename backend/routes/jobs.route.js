import express from 'express'
import isAuthenticated from '../middlewares/authMiddleware.js';
import { getAllCompany, getCompany, registerCompany, updateCompany } from '../controllers/company.ctrl.js';
import { getAdminJobs, getAllJobs, getJobById, postJob } from '../controllers/job.ctrl.js';

const router = express.Router()

router.route("/postjob").post(isAuthenticated, postJob);
router.route("/").get(isAuthenticated, getAllJobs);
router.route("/adminjobs").get(isAuthenticated, getAdminJobs);
router.route("/:id").get(isAuthenticated, getJobById);



export default router;