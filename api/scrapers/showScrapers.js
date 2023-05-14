import { newPage } from "../browser/browser.js";

export async function scrapeShowImageUrl(url) {
  const page = await newPage();
  await page.goto(url);

  const imgElement = await page.$(".section-watch .section-watch-overview img");
  const imageUrl = imgElement
    ? await page.evaluate((img) => img.getAttribute("src"), imgElement)
    : null;

  await page.close();

  return imageUrl;
}

export async function scrapeShowDetails(url) {
  const page = await newPage();

  await page.goto(url);

  let showData = {
    imageUrl: null,
    seasonCount: null,
    seasons: [],
  };

  try {
    showData.imageUrl = await scrapeShowImageUrl(url);

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
