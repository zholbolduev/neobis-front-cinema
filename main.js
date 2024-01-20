const API_KEY = "43a5d28a-bf4d-4fdf-b736-18e2287d0cc2";
const API_URL_POPULAR =
  "https://kinopoiskapiunofficial.tech/api/v2.2/films/collections?type=TOP_POPULAR_MOVIES&page=1";
const API_URL_SEARCH =
  "https://kinopoiskapiunofficial.tech/api/v2.1/films/search-by-keyword?keyword=";

getMovies(API_URL_POPULAR);

async function getMovies(url) {
  const resp = await fetch(url, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      "X-API-KEY": API_KEY,
    },
  });

  const respData = await resp.json();

  const moviesData = respData.films || respData.items;
  showMovies(moviesData);
}

function getClassByRate(vote) {
  if (vote >= 7) {
    return "green";
  } else if (vote > 5) {
    return "orange";
  } else {
    return "red";
  }
}

function showMovies(data) {
  console.log(data);

  const moviesEl = document.querySelector(".movies");

  document.querySelector(".movies").innerHTML = "";

  data.forEach((movie) => {
    const movieEl = document.createElement("div");
    movieEl.classList.add("movie");
    movieEl.innerHTML = `<div class="movie__cover-inner">
    <img
      src="${movie.posterUrl}"
      alt="${movie.nameRu}"
      class="movie-cover"
    />

    <div class="movie__cover--darkened"></div>
  </div>

  <div class="movie__info">
    <div class="movie__title">${movie.nameRu}</div> 
    <div class="movie__category">${movie.genres.map(
      (genre) => ` ${genre.genre}`
    )}</div>
    ${
      movie.ratingKinopoisk &&
      `
    <div class="movie__average movie__average--${getClassByRate(
      movie.ratingKinopoisk
    )}">${movie.ratingKinopoisk}</div>
        `
    }
  </div>`;
    moviesEl.appendChild(movieEl);
  });
}

const form = document.querySelector("form");
const search = document.querySelector(".header__search");

form.addEventListener("submit", async (e) => {
  e.preventDefault();

  const encodedSearchValue = encodeURIComponent(search.value);
  const apiSearchUrl = `${API_URL_SEARCH}${encodedSearchValue}`;
  if (search.value) {
    await getMovies(apiSearchUrl);

    search.value = "";
  }
});
