const BASE_URL = "http://dev.bittenred.com:61537/movies";

export default function request(startId = 0) {
  const url = `${BASE_URL}?start=${startId}`;
  return fetch(url).then(result => result.json()); // Dont understand why
}
