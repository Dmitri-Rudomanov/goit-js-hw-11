/*
 * - Пагинация
 *   - страница и кол-во на странице
 * - Загружаем статьи при сабмите формы
 * - Загружаем статьи при нажатии на кнопку «Загрузить еще»
 * - Обновляем страницу в параметрах запроса
 * - Рисуем статьи
 * - Сброс значения при поиске по новому критерию
 *
 * https://newsapi.org/
 * 4330ebfabc654a6992c2aa792f3173a3
 * http://newsapi.org/v2/everything?q=cat&language=en&pageSize=5&page=1
 */

import galleryTpl from './templates/gallery.hbs';
import './css/common.css';
import PicsApiService from './js/picture-service';
import LoadMoreBtn from './js/components/load-more-btn';

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

  picsApiService.query = e.currentTarget.elements.query.value;

  if (picsApiService.query === '') {
    return alert('Введи что-то нормальное');
  }

  loadMoreBtn.show();
  picsApiService.resetPage();
  clearGalleryContainer();
  fetchGallery();
}

function fetchGallery() {
  loadMoreBtn.disable();
  picsApiService.fetchGallery().then(gallery => {
    appendGalleryMarkup(gallery);
    loadMoreBtn.enable();
  });
}

function appendGalleryMarkup(gallery) {
  refs.galleryContainer.insertAdjacentHTML('beforeend', galleryTpl(gallery));
}

function clearGalleryContainer() {
  refs.galleryContainer.innerHTML = '';
}
