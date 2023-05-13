import { newPage } from "../browser/browser.js";

const fetch = (...args) =>
  import("node-fetch").then(({ default: fetch }) => fetch(...args));

export async function getShowImageUrl(req, res) {
  try {
    const imageUrl = await findShowImageUrl(req.body.url);

    res.json({ imageUrl });
  } catch (err) {
    res.json({ error: err.message });
  }
}

export async function findShowImageUrl(url) {
  const page = await newPage();
  await page.goto(url);

  const imgElement = await page.$(".section-watch .section-watch-overview img");
  const imageUrl = imgElement
    ? await page.evaluate((img) => img.getAttribute("src"), imgElement)
    : null;

  await page.close();

  return imageUrl;
}

export async function getShowDetails(req, res) {
  try {
    const showData = await getShowDetailsHelper(req.body.url);
    res.json(showData);
  } catch (err) {
    res.json({ error: err });
    console.error("Error fetching show details:", err);
  }
}
async function getShowDetailsHelper(url) {
  const page = await newPage();

  await page.goto(url);

  let showData = {
    imageUrl: null,
    seasonCount: null,
    seasons: [],
  };

  try {
    showData.imageUrl = await findShowImageUrl(url); // Assuming getShowImageUrl is defined elsewhere
    console.log(showData.imageUrl);
    const seasonCountElement = await page.$(
      ".section-watch-overview .badge.badge-info"
    );
    showData.seasonCount = await page.evaluate(
      (element) => element.textContent.replace("Seasons: ", ""),
      seasonCountElement
    );

    const seasonElements = await page.$$(".section-watch-season table tbody");

    for (let i = 0; i < seasonElements.length; i++) {
      const seasonObject = {
        season: showData.seasonCount - i,
        episodes: [],
      };

      const episodeElements = await seasonElements[i].$$("tr");

      for (let episodeElement of episodeElements) {
        const number = await episodeElement.$eval(
          "th",
          (element) => element.textContent
        );
        const title = await episodeElement.$eval(
          ".epTitle",
          (element) => element.textContent
        );
        const datePublished = await episodeElement.$eval(
          "*[itemprop = 'datePublished'] span:last-child",
          (element) => element.textContent
        );
        const downloadLink = await episodeElement.$eval(
          ".downloadvid",
          (element) => element.getAttribute("data-href")
        );
        const episodeThumbnail = await episodeElement.$eval(
          ".watch-episode-thumb",
          (element) => element.getAttribute("src")
        );

        seasonObject.episodes.push({
          number,
          title,
          datePublished,
          downloadLink,
          episodeThumbnail,
        });
      }

      showData.seasons.push(seasonObject);
    }
  } catch (error) {
    console.log(error);
  }
  page.close();
  return showData;
}

export async function getBase64Image(req, res) {
  try {
    const base64 = await imageUrlToBase64(req.body.url);
    res.json({ base64: base64 });
  } catch (err) {
    res.json({ error: err });
    console.error("Error fetching show details:", err);
  }
}

async function imageUrlToBase64(imageUrl) {
  const imageUrlData = await fetch(imageUrl);
  const buffer = await imageUrlData.arrayBuffer();
  const stringifiedBuffer = Buffer.from(buffer).toString("base64");
  const contentType = imageUrlData.headers.get("content-type");
  return `data:image/${contentType};base64,${stringifiedBuffer}`;
}
