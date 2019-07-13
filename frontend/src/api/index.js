export const search = (query) => new Promise((resolve, reject) => {
  const endpoint = `http://localhost:3000?q=${query}`;
  const request = new Request (endpoint, {
    method: 'GET',
  });
  
  fetch(request)
    .then(res => res.json())
    .then(json => resolve(json.values))
    .catch(err => reject(err));
});
