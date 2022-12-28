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
  response.json({ message: 'Worked' });
});

app.post(`/getShowDetails`, (request, response) => {
  const url = request.body.url;

  axios
    .get(url)
    .then((res) => {
      const $ = cheerio.load(res.data);

      const image = $('.section-watch .section-watch-overview img')
        .first()
        .prop('src');

      const seasons = $('.section-watch-season');

      seasons.each((index, element) => {
        console.log($(element).find('.table-episodes').toArray());
      });

      //.forEach((seasonDiv) =>
      //  console.log($(seasonDiv).find('.t14'))
      //);

      response.json({ image: image });
    })
    .catch((error) => {
      console.log(error);
    });
});

app.listen(port, () => {
  console.log(`Flixtor browser API started on ${port}`);
});
