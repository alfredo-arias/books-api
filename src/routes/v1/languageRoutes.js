import { Router } from "express";
import * as LanguageController from "../../controllers/languageController.js";

const router = Router();

router.get("/v1/languages", LanguageController.getAllLanguages);

export default router;
