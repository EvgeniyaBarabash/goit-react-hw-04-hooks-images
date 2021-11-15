const API_KEY = '23557482-2b701da460ed677d29657aa4e';
const BASE_URL = `https://pixabay.com/api/`;
const IMAGES_PER_PAGE = 12;

function fetchImages(query, page = 1) {
  const params = `?image_type=photo&orientation=horizontal&q=`;
  const url = `${BASE_URL}${params}${query}&page=${page}&per_page=${IMAGES_PER_PAGE}&key=${API_KEY}`;
  return fetch(url).then(responce => {
    if (responce.ok) {
      return responce.json();
    }
    return Promise.reject(new Error(`Нет картинки с именем ${query}`));
  });
}
export { fetchImages };
