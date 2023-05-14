import { Router } from "express";
const router = Router();
import {
  getShow,
  getShows,
  createShow,
  deleteShow,
} from "../controllers/showController.js";

router.get(`/shows`, getShows);
router.get(`/show`, getShow);
router.post(`/show`, createShow);
router.delete(`/show`, deleteShow);

export default router;
