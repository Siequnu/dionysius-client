import { Schema as _Schema, model } from "mongoose";
const Schema = _Schema;

const BrowserSchema = new Schema({
  code: String,
  cookies: String,
  lastUpdated: Date,
});

const ShowSchema = new Schema({
  name: String,
  url: String,
});

const EpisodeSchema = new Schema({
  name: String,
  thumbnail: String,
  watched: String,
  show: {
    type: _Schema.Types.ObjectId,
    ref: "Show",
    required: true,
  },
});

// Export the models
export const Browser = model("Browser", BrowserSchema);
export const Show = model("Show", ShowSchema);
export const Episode = model("Episode", EpisodeSchema);
