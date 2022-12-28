/* eslint-disable no-undef */
const express = require('express');
const cors = require('cors');
const axios = require('axios');
const bodyParser = require('body-parser');
const cheerio = require('cheerio');

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

app.post(`/getShowDetails`, async (request, response) => {
  const url = request.body.url;

  const showData = await getShowDetails(url);
  response.json(showData);
});

app.listen(port, () => {
  console.log(`Flixtor browser API started on ${port}`);
});

async function getShowDetails(url) {
  let showData = {
    imageUrl: null,
    seasonCount: null,
    seasons: [],
  };

  await axios
    .get(url)
    .then((res) => {
      const $ = cheerio.load(res.data);

      showData.imageUrl = $('.section-watch .section-watch-overview img')
        .first()
        .prop('src');

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

      //.forEach((seasonDiv) =>
      //  console.log($(seasonDiv).find('.t14'))
      //);
    })
    .catch((error) => {
      console.log(error);
    });

  return showData;
}
