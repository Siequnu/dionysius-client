import { Show } from "../models/models.js";
import { scrapeShowDetails } from "../scrapers/showScrapers.js";

export async function getShows(req, res) {
  try {
    res.json({ shows: await Show.find() });
  } catch (err) {
    res.json({ error: err });
    console.error("Error fetching shows:", err);
  }
}

export async function getShow(req, res) {
  try {
    console.log("Show controller: got request for", req.query);
    const show = await Show.findById(req.query.id);

    const showData = await scrapeShowDetails(show.url);

    const updatedShow = await Show.findOneAndUpdate(
      { _id: req.query.id },
      { lastUpdated: new Date(), details: showData },
      { new: true }
    );
    res.json(updatedShow);
  } catch (err) {
    res.json({ error: err });
    console.error("Error fetching show details:", err);
  }
}

export async function createShow(req, res) {
  console.log(`API: received request to create show`, req.body.url);
  try {
    const showDetails = await scrapeShowDetails(req.body.url);
    const show = new Show({ ...req.body, details: showDetails });
    await show.save();
    res.json(show);
  } catch (err) {
    res.json({ error: err });
    console.error("Error creating show:", err);
  }
}

export async function deleteShow(req, res) {
  console.log(`API: received request to delete show ${req.query.id}`);
  try {
    const show = await Show.findByIdAndDelete(req.query.id);
    res.json(show);
  } catch (err) {
    res.json({ error: err });
    console.error("Error deleting show:", err);
  }
}
