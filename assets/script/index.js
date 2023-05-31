'use strict';
/*
  XX
  Paul Funston

  xx

*/

import {select, onEvent, selectAll} from './util.js';

const movieJsonUrl = './assets/data/movies.json';



const options = {
  method: 'GET',
  mode: 'cors'

};


const movies = await fetchData(movieJsonUrl);
listMovies(movies);


async function fetchData(url) {
  try {
    const response = await fetch(url, options);
    if (!response.ok) {
      throw new Error(`${response.statusText} (${response.status})`);
    }
    // Parsing the reponse as JSON
    const data = await response.json();
    // Printing the movies
    return(data.response);
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
      console.log(movie);
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

