import express from 'express'
import { registerUser, loginUser, updateProfile } from "../controllers/auth.ctrl.js"
import isAuthenticated from '../middlewares/authMiddleware.js';

const router = express.Router()

router.route("/register").post(registerUser);
router.route("/login").post(loginUser);
router.route("/update-profile").post(isAuthenticated, updateProfile);


export default router;