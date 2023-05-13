import { Show } from "../models/models.js";
import { getShowDetailsHelper } from "./showController.js";

export async function getAllShows(req, res) {
  try {
    const shows = await Show.find();
    res.json({ shows: shows });
  } catch (err) {
    res.json({ error: err });
    console.error("Error fetching shows:", err);
  }
}

export async function getShowById(req, res) {
  try {
    const show = await Show.findById(req.body.id);
    res.json({ show: show });
  } catch (err) {
    res.json({ error: err });
    console.error("Error fetching show:", err);
  }
}
export async function createShow(req, res) {
  try {
    const showDetails = await getShowDetailsHelper(req.body.url);
    const show = new Show({ ...req.body, details: showDetails });
    await show.save();
    res.json(show);
  } catch (err) {
    res.json({ error: err });
    console.error("Error creating show:", err);
  }
}

export async function deleteShow(req, res) {
  console.log(req.body);
  try {
    const show = await Show.findByIdAndDelete(req.body.id);
    res.json(show);
  } catch (err) {
    res.json({ error: err });
    console.error("Error deleting show:", err);
  }
}
