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

  const image = await getShowDetails(url);
  response.json({ image: image });
});

app.listen(port, () => {
  console.log(`Flixtor browser API started on ${port}`);
});

async function getShowDetails(url) {
  let image = null;

  await axios
    .get(url)
    .then((res) => {
      const $ = cheerio.load(res.data);

      image = $('.section-watch .section-watch-overview img')
        .first()
        .prop('src');

      const seasons = $('.section-watch-season');

      seasons.each((index, element) => {
        console.log($(element).find('.table-episodes').toArray());
      });

      //.forEach((seasonDiv) =>
      //  console.log($(seasonDiv).find('.t14'))
      //);
    })
    .catch((error) => {
      console.log(error);
    });

  return image;
}
