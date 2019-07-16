const express = require('express');
const request = require('request');
const get = require('lodash/get');
const cors = require('cors');
const bodyParser = require('body-parser');
const createCsvWriter = require('csv-writer').createArrayCsvWriter;
const configs = require('./configs');

const csvWriter = createCsvWriter({
  header: ['DATE', 'QUERY', 'URL', 'IS_RELATED'],
  path: './data.csv',
  append: true,
});

const options = {
  headers: {
    'Ocp-Apim-Subscription-Key': configs.SUBSCRIPTION_KEY,
  },
}

const response = {
  values: [],
}

const app = express();
app.use(bodyParser.json())
app.use(cors());
app.use(express.static('public'))

app.listen(configs.PORT, () => {
  console.log(`Server is up at port ${configs.PORT}`);
});

app.use('/', express.static('public'))

app.get('/query', (req, res) => {
  const query = req.query.q;

  request({
    ...options,
    url: `${configs.ENDPOINT}&q=${query}`,
    method: 'GET'
  }, (error, r) => {
    
    if (error) {
      res.status(300).json({ error });
      return;
    }
    
    const json = JSON.parse(r.body);
    res.json({
      ...response,
      values: get(json, 'webPages.value', [])
    });
  });
});

app.post('/save', (req, res) => {
  const params = {
    query, webPage , isRelated
  } = req.body;
  
  csvWriter.writeRecords([[
    Date.now(), query, webPage.url, isRelated
  ]])
    .then(() =>{
      console.log('write complete');
    })
    .catch(err =>{
      console.log('err', err);
    });
  
  res.json({ test: 'ok' });
});
