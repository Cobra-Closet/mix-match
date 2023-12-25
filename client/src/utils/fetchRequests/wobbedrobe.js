export function requestWobbedrobeAdd(itemType, body) {
  return fetch(`wobbedrobe/add/${itemType}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(body),
  })
    .then((res) => res.json())
    .catch((err) => console.log('App: add to wobbedrobe: ERROR', err));
}

export function requestWobbedrobeGet(itemType) {
  return fetch(`wobbedrobe/get/${itemType}`, {
    method: 'GET',
    headers: { 'Content-Type': 'application/json' },
  })
    .then((res) => res.json())
    .catch((err) =>
      console.log('App: reading wobbedrobe ', itemType, ': ERROR: ', err)
    );
}

export function requestWobbedrobeUpdate(itemType, id, body) {
  return fetch(`wobbedrobe/update/${itemType}/${id}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(body),
  })
    .then((res) => res.json())
    .catch((err) => console.log('App: update wobbedrobe: ERROR', err));
}

export function requestWobbedrobeDelete(itemType, id) {
  return fetch(`wobbedrobe/delete/${itemType}/${id}`, {
    method: 'DELETE',
    headers: { 'Content-Type': 'application/json' },
  })
    .then((res) => res.json())
    .catch((err) => console.log('App: delete wobbedrobe item: ERROR: ', err));
}
