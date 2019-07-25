
const idRegex = /HI\d+.html/g
const findId = (url) => {
  const matches = url.match(idRegex) || [];
  return (matches.length == 0) ? '' : matches[0].split('.')[0];
}

module.exports = {                  
  findId,
};
