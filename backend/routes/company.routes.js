import express from 'express'
import isAuthenticated from '../middlewares/authMiddleware.js';
import { getAllCompany, getCompany, registerCompany, updateCompany } from '../controllers/company.ctrl.js';
import { singleUpload } from "../middlewares/multer.js";

const router = express.Router()

router.route("/register").post(isAuthenticated, registerCompany);
router.route("/").get(isAuthenticated, getAllCompany);
router.route("/:id").get(isAuthenticated, getCompany);
router.route("/update-company/:id").post(isAuthenticated, singleUpload, updateCompany);


export default router;