'use strict';
/*
  XX
  Paul Funston

  xx

*/

import {select, onEvent, selectAll} from './util.js';

const movieJsonUrl = './assets/data/movies.json';
const citiesJsonUrl = './assets/data/cities.json';

const movieSearch = select(".movie-search");
const citySearch = select(".city-search");
const movieResultsBox = select(".movie-results");
const cityResultsBox = select(".city-results");
const noResultsString = "None Found.";


const options = {
  method: 'GET',
  headers: { 'Content-Type': 'application/json; charset=UTF-8' },
  mode: 'cors',
};

const {results: movies} = await fetchData(movieJsonUrl);
const {cities} = await fetchData(citiesJsonUrl);



listMovies(movies);
onEvent("keyup", movieSearch, function(event) {
  search(event);
});

onEvent("keyup", citySearch, function(event) {
  search(event);
});




async function fetchData(url) {
  try {
    const response = await fetch(url, options);
    if (!response.ok) {
      throw new Error(`${response.statusText} (${response.status})`);
    }
    // Parsing the reponse as JSON
    const data = await response.json();
    // Printing the movies

    return(data);
  } catch(error) {
    console.log(error.message);
  }
};

function listMovies(array) {
    const section = select(".movie-container");
    section.innerHTML = "";

    if(array.length <= 0) {
      throw new Error("No Movies found.")
    }

    array.forEach(movie => {
      const movieCard = createMovieCard(movie);
      section.append(movieCard);
    });
}

function createMovieCard(movie) {
  const movieCard = document.createElement("div");
  movieCard.classList.add("movie-card");

  const moviePoster = document.createElement("div");
  moviePoster.innerHTML = `<img src="${movie.img}">`;

  const movieTitle = document.createElement("div");
  movieTitle.innerHTML = `<p>${movie.title}</p>`

  movieCard.append(moviePoster);
  movieCard.append(movieTitle);

  return movieCard;
}

function search(event) {
  
  const target = event.target;

  if(target.value.length < 2) {
    return;
  }

  const list = getAvailableResults(target);
  const searchResults = createSearchResultsElement(list);
  console.log(target.clientWidth);
  const width = target.clientWidth;
  searchResults.style.width = `${width}`;
  searchResults.style.maxWidth = `${width}`;
  target.parentNode.append(searchResults);
  onEvent("blur", target, function() {
    setTimeout(() => {
      searchResults.remove()}, 150);
  });
  onEvent("keyup", target, function() {
    searchResults.remove();
  })
  
}

function getAvailableResults(node) {
  let results = [];
  const string = node.value.toLowerCase();
  if (node == citySearch) {
    results = cities.filter(city => city.name.toLowerCase().includes(string))
    results = results.map(city => city.name);
  }

  if (node == movieSearch) {
    results = movies.filter(movie => movie.title.toLowerCase().includes(string));
    results = results.map(movie => movie.title + ` (${movie.year})`);
  }

  return results;
}

function createSearchResultsElement(array) {
  const searchResults = document.createElement("div");
  searchResults.classList.add("search-result-container");
  
  if(array.length == 0) {
    searchResults.append(createSearchResultButton(noResultsString));
    return searchResults;
  }

  array.forEach(item => {
    searchResults.append(createSearchResultButton(item))
  })

  return searchResults;
}

function createSearchResultButton(string) {
    const resultButton = document.createElement("div");

    resultButton.classList.add("search-result");
    resultButton.innerHTML = `<p>${string}</p>`

    if  (string != noResultsString) {
      resultButton.classList.add("result-button");
      onEvent("click", resultButton, function () {
        clearInput();
      });
    }
    return resultButton;
}

function clearInput() {
  movieSearch.value = '';
  citySearch.value = '';
}


