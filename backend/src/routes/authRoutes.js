import express from "express";
import { signup, signin } from "../controllers/authController.js";
import { verifySignUp } from "../middleWares/index.js";

const router = express.Router();

// Route Signup
router.post(
    "/signup",
    [verifySignUp.checkDuplicateUsernameOrEmail, verifySignUp.checkRolesExisted],
    signup,
);

// Route Signin
router.post("/signin", signin);

export default router;
