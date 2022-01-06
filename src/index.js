
import galleryTpl from './templates/gallery.hbs';
import './css/common.css';
import PicsApiService from './js/picture-service';
import LoadMoreBtn from './js/components/load-more-btn';
import Notiflix from 'notiflix';
import SimpleLightbox from "simplelightbox";
import 'simplelightbox/dist/simple-lightbox.min.css';

const refs = {
  searchForm: document.querySelector('.search-form'),
  galleryContainer: document.querySelector('.gallery'),
};
const loadMoreBtn = new LoadMoreBtn({
  selector: '[data-action="load-more"]',
  hidden: true,
});
const picsApiService = new PicsApiService();
var lightbox = new SimpleLightbox('.gallery a')

refs.searchForm.addEventListener('submit', onSearch);
loadMoreBtn.refs.button.addEventListener('click', fetchGallery);

function onSearch(e) {
  e.preventDefault();
  picsApiService.query = e.currentTarget.elements.searchQuery.value;

  if (picsApiService.query === '') {
    Notiflix.Notify.failure('Please enter your search query');
    return
  }
  picsApiService.fetchGallery()
  .then(({ totalHits }) => Notiflix.Notify.success(`Hooray! We found ${totalHits} images.`));
  picsApiService.resetPage();
  picsApiService.resetHits();
  clearGalleryContainer();
  fetchGallery();
}

function fetchGallery() {
  loadMoreBtn.disable()
  picsApiService.fetchGallery()
    .then(({ hits,totalHits }) => {
      picsApiService.incrementPage();
      return { hits,totalHits }
    })
    .then(({ hits, totalHits }) => {
      if (hits.length !== 0) {
      appendGalleryMarkup(hits);
      lightbox.refresh()
      picsApiService.incrementHits(hits.length)
      hitsCheck(totalHits, picsApiService.hitsCounter)
      loadMoreBtn.show();
      loadMoreBtn.enable();
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


