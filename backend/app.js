const express = require('express');
const request = require('request');
const get = require('lodash/get');
const cors = require('cors');
const bodyParser = require('body-parser');
const createCsvWriter = require('csv-writer').createArrayCsvWriter;
const configs = require('./configs');

const app = express();

app.use(bodyParser.json())
app.use(cors());

const csvWriter = createCsvWriter({
  header: ['DATE', 'QUERY', 'URL', 'IS_RELATED'],
  path: './data.csv',
  append: true,
});

const options = {
  headers: {
    'Ocp-Apim-Subscription-Key': '9ca75d30efde4f9e927a30ca936ad8b4',
  },
}

const response = {
  values: [],
}

app.listen(configs.PORT, () => {
  console.log(`Server is up at port ${configs.PORT}`);
});

app.get('/', (req, res) => {
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

app.post('/', (req, res) => {
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
