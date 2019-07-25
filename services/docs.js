const configs = require('../configs');
// const csv = require('fast-csv')
const parse = require('csv-parse')
const fs = require('fs');


const relatedDocsDictionary = require(`../${configs.RELATED_DOCS_DICT_PATH}`)
const docPathDictionary = require(`../${configs.DOC_PATH}`)

const findText = (path, uid) => new Promise((resolve, reject) => {
  console.log(path);
  if (!path)
    throw new Error('path is undefined');

  if (!uid)
    throw new Error('uid is undefined');
  
  const filePath = `./${configs.DOCS_DIRECTORY}/${path}`;
  let found = false;
  const parser = parse({ delimiter: ',' });
  
  // Catch any error
  parser.on('error', function(err){
    console.error(err.message)
  })
  
  parser.on('readable', function() {
    let row;
    while (row = parser.read()) {
      const [rowId, rowUid, article] = row;
      // see if uid matches rowId in the csv file
      if (rowUid === uid) {
        found = true;
        resolve(article + article + article + article);
      }
    }
  });
  console.log('exec');
  fs.createReadStream(filePath).pipe(parser);
});

const findRelatedDocs = (uid) => relatedDocsDictionary[uid] || [];
const findFilePath = (uid) => docPathDictionary[uid];

module.exports = {
  findRelatedDocs,
  findFilePath,
  findText,
};
