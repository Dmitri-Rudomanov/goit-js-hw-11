
import galleryTpl from './templates/gallery.hbs';
import './css/common.css';
import PicsApiService from './js/picture-service';
import LoadMoreBtn from './js/components/load-more-btn';
import Notiflix from 'notiflix';

const refs = {
  searchForm: document.querySelector('.search-form'),
  galleryContainer: document.querySelector('.gallery'),
};
const loadMoreBtn = new LoadMoreBtn({
  selector: '[data-action="load-more"]',
  hidden: true,
});
const picsApiService = new PicsApiService();

refs.searchForm.addEventListener('submit', onSearch);
loadMoreBtn.refs.button.addEventListener('click', fetchGallery);

function onSearch(e) {
  e.preventDefault();

  picsApiService.query = e.currentTarget.elements.searchQuery.value;

  if (picsApiService.query === '') {
    Notiflix.Notify.failure('Please enter your search query');
    return
  }

  picsApiService.resetPage();
  picsApiService.resetHits();
  clearGalleryContainer();
  fetchGallery();
}

function fetchGallery() {
  loadMoreBtn.disable();
  picsApiService.fetchGallery().then(({ hits,totalHits }) => {
    console.log(hits)
    if (hits.length !== 0) {
      picsApiService.incrementHits(hits.length)
      console.log(picsApiService.hitsCounter)
      loadMoreBtn.show();
      console.log(totalHits)
      appendGalleryMarkup(hits);
      loadMoreBtn.enable();
      hitsCheck(totalHits,picsApiService.hitsCounter)
      return
    } 
     Notiflix.Notify.failure("Sorry, there are no images matching your search query. Please try again.")
    
  });
}

function appendGalleryMarkup(gallery) {
  refs.galleryContainer.insertAdjacentHTML('beforeend', galleryTpl(gallery));
}

function clearGalleryContainer() {
  refs.galleryContainer.innerHTML = '';
}

function hitsCheck(totalHits, hitsCounter) { 
  if (totalHits - hitsCounter <= 0) {
    Notiflix.Notify.warning("We're sorry, but you've reached the end of search results.")
    loadMoreBtn.hide();
  }
  return
}