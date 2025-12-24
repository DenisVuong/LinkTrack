import express from "express";
import { redirectToOriginalUrl } from "../controllers/redirectController.js";

const router = express.Router();

// Route publique de redirection (pas d'authentification requise)
// Cette route doit être montée au niveau racine, pas sous /api/
router.get("/:short_code", redirectToOriginalUrl);

export default router;
