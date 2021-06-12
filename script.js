
// Constant Variables
//const apiKey = '50aac023b9f971cfb83298efd849196b';
const apiUrl = 'https://api.themoviedb.org/3/movie/550?api_key=50aac023b9f971cfb83298efd849196b';

const pageSize = 20;
const posterSize = "w185";
const offset = page * pageSize;

// Global Variables
var page=1;
var currentSearchTerm= '';

// Page Elements

const movieForm = document.querySelector("form");
const movieInput = document.querySelector("#search-input");
const searchButton = document.querySelector("#search-button");
const movieArea = document.querySelector("#movie-area");
const moreMoviesBtn = document.getElementById('show-me-more-btn');

movieForm.addEventListener("submit",getMovie);

/** Get results from API */

async function getMovie(event) {
    event.preventDefault();
    const movieInput = event.target.movie;
    const movie = movieInput.value;

   // Now Playing 
    const apiUrl = `https://api.themoviedb.org/3/search/movie?api_key=50aac023b9f971cfb83298efd849196b&query=${movie}`; 

    const response = await fetch(apiUrl);
    const responseData = await response.json();
    console.log(responseData);

    if(movieInput.value == '') {
      refreshPage();
    }

    movieArea.innerHTML = '';
    generateHTML(responseData);
}


function generateHTML(movieData) {
  movieData.results.forEach(element => {
    movieArea.innerHTML += `
    <div id = "movie"> 
    <h3>${element.title}</h3>
    <img id= "poster" src="https://image.tmdb.org/t/p/w500/${element.poster_path}" alt="${element.title} logo_path" />
    <p> Votes: ${element.vote_average} </p>
    </div>`
  })
}

async function getAllMovies() {
    const configurationUrl = `https://api.themoviedb.org/3/configuration?api_key=${apiKey}`;
    const configuration = await fetch (configurationUrl);
    const configJson = await configuration.json();
    const configImageUrl = configJson.images.secure_base_url;

    //Now Playing
    const apiUrlNowPlaying = `https://api.themoviedb.org/3/movie/now_playing?api_key=${apiKey}`;
    const fetchAllMovies = await fetch(apiUrlNowPlaying);
    console.log(fetchAllMovies);
    const jsonMovies = await fetchAllMovies.json();

    jsonMovies.results.forEach(element => {
      movieArea.innerHTML += `
      <div id = "movie"> 
      <h3>${element.title}</h3>
      <img id= "poster" src="https://image.tmdb.org/t/p/original/${element.poster_path}" alt="${element.title} logo_path" />
      <p> Votes: ${element.vote_average} </p>
      </div>`
    }
 
    )

  }

function refreshPage() {
  window.location.reload();
}

moreMoviesBtn.addEventListener("click", loadMoreMovies);

async function loadMoreMovies(event) {
  page++;
  event.preventDefault();
  const results = await getResults();
  displayResults(results);
}

async function getResults() {
  const offset = page * pageSize;
  const response = await fetch(`https://api.themoviedb.org/3/movie/now_playing?api_key=50aac023b9f971cfb83298efd849196b&language=en-US&page=${page}&limit=${pageSize}&offset=${offset}`);
  const jsonResponse = await response.json();
  return jsonResponse.results;
}

/** Render list of results. */
function displayResults(results) {
  const moviesHTMLString = results.map(movies => `
      <div id="movie">
          <h3> ${movies.title} </h3>
          <img src="http://image.tmdb.org/t/p/${posterSize}/${movies.poster_path}" />
          <p> Votes: ${movies.vote_average} </p></div>
      </div>
  `).join('');
  movieArea.innerHTML = movieArea.innerHTML + moviesHTMLString;
}


getAllMovies();
