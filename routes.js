const createCsvWriter = require('csv-writer').createArrayCsvWriter;
const express = require('express');
const get = require('lodash/get');
const request = require('request');
const asyncEach = require('async/each');
const { findId } = require('./preprocess')
const { findRelatedDocs, findFilePath, findText } = require('./services/docs')
const flatten = require('lodash/flatten');
const configs = require('./configs');

const router = express.Router();

// 
const csvWriter = createCsvWriter({
  header: ['DATE', 'QUERY', 'URL', 'IS_RELATED'],
  path: `./${configs.OUTPUT_FILE_PATH}`,
  append: true,
});

// options used to be sent to BING cognitive search API
const options = {
  headers: {
    'Ocp-Apim-Subscription-Key': configs.SUBSCRIPTION_KEY,
  },
};

// reponse format from the API
const response = {
  values: [],
}

router.get('/search', (req, res) => {
  const query = req.query.q;

  request({
    ...options,
    url: `${configs.ENDPOINT}&q=${query}`,
    method: 'GET'
  }, async (error, r) => {
    // if error return HTTP error 300 and the plain error bject
    if (error) {
      res.status(300).json({ error });
      return;
    }
    
    // read the response body
    const json = JSON.parse(r.body);

    // records returned from BING cognitive search API
    let records = get(json, 'webPages.value', [])

    // for each item in the resultSet
    records = records.map(x => ({ ...x, uid: findId(x.url) }));
    
    // find all related articles
    const relatedArticles = flatten(records.reduce((acc, curr) => { acc.push([...findRelatedDocs(curr.uid)]); return acc; }, []));


    
    const articles = [];
    asyncEach(relatedArticles, function(uid, callback) {
      const path = findFilePath(uid);
      console.log('path', path)
      // if the path was found in the DOCS_PATH
      if (path !== undefined) {
        findText(path, uid)
          .then(article => articles.push({ uid, article }))
          .then(callback)
      } else callback();
    }, function(err) {
      res.json({
        ...response,
        values: articles,
      });
    });
  });
});

router.post('/verdict', (req, res) => {

  /// verdict == 1: yes
  /// verdict == 0: not sure
  /// verdict == -1: no
  const params = {
    query, uid, verdict
  } = req.body;
  console.log('params', params);
  csvWriter.writeRecords([[
    Date.now(), query, uid, verdict
  ]])
    .then(() => {
      console.log('write complete');
    })
    .catch(err =>{
      console.log('err', err);
    });
  
  res.json({ test: 'ok' });
});

module.exports = router;
