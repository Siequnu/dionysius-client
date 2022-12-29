/* eslint-disable no-undef */
const express = require('express');
const cors = require('cors');
const axios = require('axios');
const bodyParser = require('body-parser');
const cheerio = require('cheerio');

const fetch = (...args) =>
  import('node-fetch').then(({ default: fetch }) => fetch(...args));

const app = express();
const port = 3000;

app.use(bodyParser.json());
app.use(
  cors({
    origin: '*',
  })
);

app.get('/', (request, response) => {
  response.json({ message: 'API server is running', running: true });
});

app.post(`/getShowImageUrl`, async (request, response) => {
  const imageUrl = await getShowImageUrl(request.body.url);
  response.json({ imageUrl: imageUrl });
});

app.post(`/getShowDetails`, async (request, response) => {
  const showData = await getShowDetails(request.body.url);
  response.json(showData);
});

app.post(`/getBase64Image`, async (request, response) => {
  const base64 = await imageUrlToBase64(request.body.url);
  response.json({ base64: base64 });
});

app.listen(port, () => {
  console.log(`Dionysus browser API started on ${port}`);
});

async function imageUrlToBase64(imageUrl) {
  const imageUrlData = await fetch(imageUrl);
  const buffer = await imageUrlData.arrayBuffer();
  const stringifiedBuffer = Buffer.from(buffer).toString('base64');
  const contentType = imageUrlData.headers.get('content-type');
  return `data:image/${contentType};base64,${stringifiedBuffer}`;
}

async function getShowImageUrl(url) {
  let imageUrl = null;
  await axios.get(url).then((res) => {
    const $ = cheerio.load(res.data);

    imageUrl = $('.section-watch .section-watch-overview img')
      .first()
      .prop('src');
  });

  return imageUrl;
}

async function getShowDetails(url) {
  let showData = {
    imageUrl: null,
    seasonCount: null,
    seasons: [],
  };

  await axios
    .get(url)
    .then(async (res) => {
      const $ = cheerio.load(res.data);

      showData.imageUrl = await getShowImageUrl(url);

      showData.seasonCount = $('.section-watch-overview .badge.badge-info')
        .first()
        .text()
        .replace('Seasons: ', '');

      $('.section-watch-season table tbody').each((index, element) => {
        const seasonObject = {
          season: showData.seasonCount - index,
          episodes: [],
        };
        // Get episodes
        $(element)
          .find('tr')
          .each((index, episodeElement) => {
            seasonObject.episodes.push({
              number: $(episodeElement).find('th').text(),
              title: $(episodeElement).find('.epTitle').text(),
              datePublished: $(episodeElement)
                .find("*[itemprop = 'datePublished'] span")
                .last()
                .text(),
              downloadLink: $(episodeElement).find('.downloadvid').data('href'),
              episodeThumbnail: $(episodeElement)
                .find('.watch-episode-thumb')
                .prop('src'),
            });
          });

        showData.seasons.push(seasonObject);
      });
    })
    .catch((error) => {
      console.log(error);
    });

  return showData;
}
