

const API_KEY = '25037516-2b063c6f0e72bb55016baf1cc';
const BASE_URL = 'https://pixabay.com/api/';


export default class PicsApiService {
  constructor() {
    this.searchQuery = '';
    this.page = 1;
    this.hitsCounter = 0;
  }

  fetchGallery() {
    const url = `${BASE_URL}?key=${API_KEY}&q=${this.searchQuery}&lang=en&per_page=20&page=${this.page}&safesearch=true&orientation=horizontal&image_type=photo`;

    return fetch(url)
      .then(response => response.json())
      .then(({ hits,totalHits }) => {
        console.log(hits)
        console.log(totalHits)
        this.incrementPage();
        return { hits,totalHits }
      })
  }

  incrementPage() {
    this.page += 1;
  }

  incrementHits(value) {
    this.hitsCounter += value;
  }
  
  resetHits() {
    this.hitsCounter = 0;;
  }

  resetPage() {
    this.page = 1;
  }

  get query() {
    return this.searchQuery;
  }

  set query(newQuery) {
    this.searchQuery = newQuery;
  }
}
