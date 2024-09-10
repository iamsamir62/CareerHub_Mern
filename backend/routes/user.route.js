import express from 'express'
import { registerUser, loginUser, updateProfile, logoutUser } from "../controllers/auth.ctrl.js"
import isAuthenticated from '../middlewares/authMiddleware.js';
import { singleUpload } from '../middlewares/multer.js';

const router = express.Router()

router.route("/register").post(singleUpload, registerUser);
router.route("/login").post(loginUser);
router.route("/logout").post(logoutUser);
router.route("/update-profile").post(isAuthenticated, singleUpload, updateProfile);


export default router;