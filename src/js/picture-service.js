

const API_KEY = '25037516-2b063c6f0e72bb55016baf1cc';
const BASE_URL = 'https://pixabay.com/api/';
const axios = require('axios');

export default class PicsApiService {
  constructor() {
    this.searchQuery = '';
    this.page = 1;
    this.perPage = 20;
    this.hitsCounter = 0;
  }

  async fetchMoreGallery() {
    const url = `${BASE_URL}?key=${API_KEY}&q=${this.searchQuery}&lang=en&per_page=${this.perPage}&page=${this.page}&safesearch=true&orientation=horizontal&image_type=photo`;

    const response = await axios.get(url);
    const items = await response.data;
    return items
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
