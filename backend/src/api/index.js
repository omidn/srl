import { ENDPOINT } from '../config';

export const search = (query) => new Promise((resolve, reject) => {
  const path = `${ENDPOINT}?q=${query}`;
  const request = new Request (path, {
    method: 'GET',
  });
  
  fetch(request)
    .then(res => res.json())
    .then(json => resolve(json.values))
    .catch(err => reject(err));
});


export const saveLabel = (form) => new Promise((resolve, reject) => {
  const request = new Request(ENDPOINT, {
    headers: {
      'Content-Type': 'application/json'
    },
    method: 'POST',
    body: JSON.stringify(form),
  });
  
  fetch(request)
    .then(res => res.json())
    .then(json => resolve(json.values))
    .catch(err => reject(err));
});
