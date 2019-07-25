const configs = require('../configs');
const csv = require('fast-csv')

const relatedDocsDictionary = require(`../${configs.RELATED_DOCS_DICT_PATH}`)
const docPathDictionary = require(`../${configs.DOC_PATH}`)

const findText = (path, uid) => new Promise((resolve, reject) => {
  const filePath = `./${configs.DOCS_DIRECTORY}/${path}`;
  let found = false;
  const csvstream = csv.parseFile(filePath, { headers: true })
    .on('data', function (row) {
      csvstream.pause();
      rowId = row['ch:appDocId'];
      
      // see if uid matches rowId in the csv file
      if (rowId === uid) {
        found = true;
        text = row['TextToShow']
        csvstream.end();
        resolve(text);
      }
      csvstream.resume();
    })
    .on('end', () => {
      if (!found) {
        reject('document not found');
      }
    })
    .on('error', error => console.log(error));
});

const findRelatedDocs = (uid) => relatedDocsDictionary[uid] || [];
const findFilePath = (uid) => docPathDictionary[uid];

module.exports = {
  findRelatedDocs,
  findFilePath,
  findText,
};
