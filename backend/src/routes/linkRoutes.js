import express from "express";
import { createLink, getMyLinks, deleteLink } from "../controllers/linkController.js";
import { getLinkClicks } from "../controllers/statsController.js";
import { authJwt } from "../middleWares/index.js";

const router = express.Router();

// Route pour créer un nouveau lien
router.post("/", [authJwt.verifyToken], createLink);

// Route pour récupérer tous les liens de l'utilisateur connecté 
router.get("/my-links", [authJwt.verifyToken], getMyLinks);

// Route pour récupérer les statistiques (clicks) d'un lien
router.get("/:short_code/clicks", [authJwt.verifyToken], getLinkClicks);

// Route pour supprimer un lien spécifique (par short_code)
router.delete("/:short_code", [authJwt.verifyToken], deleteLink);

export default router;
