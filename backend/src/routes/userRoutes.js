import express from "express";
import { allAccess, userBoard, moderatorBoard, adminBoard, } from "../controllers/userController.js";
import { authJwt } from "../middleWares/index.js";

const router = express.Router();

// Route publique
router.get("/all", allAccess);

// Route User
router.get("/user", [authJwt.verifyToken], userBoard);

// Route Moderateur
router.get("/mod", [authJwt.verifyToken, authJwt.isModerator], moderatorBoard);

// Route Admin
router.get("/admin", [authJwt.verifyToken, authJwt.isAdmin], adminBoard);

export default router;
