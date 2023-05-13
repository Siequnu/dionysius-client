import { Router } from "express";
const router = Router();
import {
  getShowImageUrl,
  getShowDetails,
  getBase64Image,
} from "../controllers/showController.js";

router.post("/getShowImageUrl", getShowImageUrl);
router.post(`/getShowDetails`, getShowDetails);
router.post(`/getBase64Image`, getBase64Image);

export default router;
