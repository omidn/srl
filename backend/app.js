const express = require('express');
const request = require('request');
const get = require('lodash/get');
const cors = require('cors');

const PORT = 3000;
const ENDPOINT = 'https://api.cognitive.microsoft.com/bingcustomsearch/v7.0/search?customConfig=2c00195d-395e-4003-8739-aacb861d0307';

const app = express();
app.use(cors());

const options = {
  headers: {
    'Ocp-Apim-Subscription-Key': '9ca75d30efde4f9e927a30ca936ad8b4',
  },
}

const response = {
  values: [],
}

app.listen(PORT, () => {
  console.log(`Server is up at port ${PORT}`);
});

app.get('/', (req, res) => {
  const query = req.query.q;

  request({
    ...options,
    url: `${ENDPOINT}&q=${query}`,
    method: 'GET'
  }, (err, r) => {
    console.log('err', err);
    console.log('r', r);
    if (err) {
      console.log('err', err);
      res.status(300).json({ });
      return;
    }
    
    const json = JSON.parse(r.body);
    console.log('json', json);
    res.json({
      ...response,
      values: get(json, 'webPages.value', [])
    });
    
  });
});
