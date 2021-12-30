import './css/styles.css';
import { fetchCountries } from './js/fetchCountries';
import countryMarkupHbs from './templates/country.hbs';
import countryListMarkupHbs from './templates/country-list.hbs';
import Notiflix from 'notiflix';

var debounce = require('lodash.debounce');
const DEBOUNCE_DELAY = 300;
const refs = {
    searchBox: document.querySelector("#search-box"),
    countryList: document.querySelector(".country-list"),
    countryInfo:document.querySelector(".country-info")
}

refs.searchBox.addEventListener("input",debounce(onSearchInput,DEBOUNCE_DELAY))

function onSearchInput(e) { 
    if (e.target.value !== "") {
        const countryInput = e.target.value.trim()
        fetchCountries(countryInput)
            .then(r => lengthCheck(r))
            .catch(error => clearAreaError())
    }
    else { 
    clearArea()
    }

}
function lengthCheck(r) { 
    if (r.length > 10) {
        Notiflix.Notify.info("Too many matches found. Please enter a more specific name.")
    }
    else { 
        listMarkup(r)
    }
}

function listMarkup(r) { 
    if (r.length >= 2 && r.length <= 10) {
        const markup = countryListMarkupHbs(r)
        refs.countryList.innerHTML = markup
        refs.countryInfo.innerHTML = ""
    }
    else { countryMarkup(r)}
}

function countryMarkup(r) { 
    refs.countryList.innerHTML = ""
    const markup = countryMarkupHbs(r)
    refs.countryInfo.innerHTML = markup
}
function clearArea() { 
    refs.countryList.innerHTML = ""
    refs.countryInfo.innerHTML = ""
}
function clearAreaError() { 
    clearArea()
    Notiflix.Notify.failure("Oops, there is no country with that name")
}