
const movieForm = document.querySelector("form");
const movieArea = document.querySelector("#movie-area");
const moreMovies = document.querySelector(".show-more-area");

movieForm.addEventListener("submit",getMovie);

async function getMovie(event) {
    event.preventDefault();
    const movieInput = event.target.movie;
    const movie = movieInput.value;
    const apiURL = "https://api.themoviedb.org/3/movie/550?api_key=50aac023b9f971cfb83298efd849196b" + movie;

    const response = await fetch(apiURL);
    const responseData = await response.json();

    generateHTML(responseData);
}

function generateHTML(movieData) {
    movieArea.innerHTML = `
    <h1>${movieData.name}</h1>
    <img src="${movieData.logo_path}" alt="${movieData.name}" >/
    <p> Votes: ${movieData.vote_average} </p>
    
  `;
}