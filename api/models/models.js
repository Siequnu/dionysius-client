import { Schema as _Schema, model } from "mongoose";
const Schema = _Schema;

const BrowserSchema = new Schema({
  code: String,
  cookies: String,
  lastUpdated: Date,
});

const ShowSchema = new Schema({
  title: String,
  url: String,
  thumbnail: String,
  details: Object,
});

// Export the models
export const Browser = model("Browser", BrowserSchema);
export const Show = model("Show", ShowSchema);
