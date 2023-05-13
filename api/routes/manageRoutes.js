import { Router } from "express";
const router = Router();
import {
  getAllShows,
  getShowById,
  createShow,
  deleteShow,
} from "../controllers/manageController.js";

router.get("/shows/get", getAllShows);
router.post(`/show/get`, getShowById);
router.post(`/show/create`, createShow);
router.post(`/show/delete`, deleteShow);

export default router;
