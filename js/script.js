document.addEventListener('DOMContentLoaded', function() {
  const arrowUp = document.querySelector('.arrowUp');
  const arrowUpIcon = document.querySelector('.arrowUp .fas.fa-chevron-circle-up');

  arrowUp.style.display = 'none';

  window.addEventListener('scroll', function() {
    const sectionMain = document.querySelector('.sectionMain');
    const footer = document.querySelector('.footer');

    if (sectionMain.getBoundingClientRect().top <= window.innerHeight && sectionMain.getBoundingClientRect().bottom >= 0) {
      arrowUp.style.display = 'none'; 
    } else {
      arrowUp.style.display = 'block'; 

      if (footer.getBoundingClientRect().top <= window.innerHeight) {
        arrowUpIcon.style.color = '#000000'; 
      } else {
        arrowUpIcon.style.color = '#ffffff';
      }
    }
  });
});



let currentPageTrend = 1;
let currentPageAcclaimed = 1;

const options = {
  method: 'GET',
  headers: {
    accept: 'application/json',
    Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIwNWI5YjJiZjkxMjhhOWYyNDYxMGY2MzVkNTcxMjEzNSIsInN1YiI6IjY2MjA1ODlkN2EzYzUyMDE2NDRiOTg3MiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.i9HwkNJiriGu0CRfJL3-pz_1nhuDN3qlFwsDe85WP3o'
  }
};

function fetchTrendMovies() {
  return fetch(`https://api.themoviedb.org/3/movie/popular?language=en-US&page=${currentPageTrend}`, options)
    .then(response => response.json())
    .catch(err => console.error(err));
}

function fetchAcclaimedMovies() {
  return fetch('https://api.themoviedb.org/3/movie/top_rated?language=en-US&page=1', options)
    .then(response => response.json())
    .catch(err => console.error(err));
}

function renderTrendMovies(data) {
  const trendContainer = document.getElementById('trendContainer');
  trendContainer.innerHTML = '';

  data.results.forEach(movie => {
    const movieItem = document.createElement('div');
    movieItem.classList.add('movie');

    const movieImg = document.createElement('img');
    movieImg.classList.add('imgTrend');
    movieImg.src = `https://image.tmdb.org/t/p/w500${movie.poster_path}`;
    movieImg.alt = movie.title;
    movieImg.loading = 'lazy';

    const movieTitle = document.createElement('div');
    movieTitle.classList.add('titlemovie');
    movieTitle.innerHTML = `<h4>${movie.title}</h4>`;

    movieItem.appendChild(movieImg);
    movieItem.appendChild(movieTitle);
    trendContainer.appendChild(movieItem);
  });
}

function renderAcclaimedMovies(data) {
  const acclaimedContainer = document.getElementById('acclaimedContainer');
  acclaimedContainer.innerHTML = '';

  data.results.forEach(movie => {
    const movieItem = document.createElement('div');
    movieItem.classList.add('movieItem');

    const movieImg = document.createElement('img');
    movieImg.classList.add('imgAcclaimed');
    movieImg.src = `https://image.tmdb.org/t/p/w500${movie.poster_path}`;
    movieImg.alt = movie.title;
    movieImg.loading = 'lazy';

    movieItem.appendChild(movieImg);
    acclaimedContainer.appendChild(movieItem);
  });
}

function nextPageTrend() {
  currentPageTrend++;
  fetchTrendMovies()
    .then(data => {
      renderTrendMovies(data);
    })
    .catch(err => console.error(err));
}

function prevPageTrend() {
  if (currentPageTrend > 1) {
    currentPageTrend--;
    fetchTrendMovies()
      .then(data => {
        renderTrendMovies(data);
      })
      .catch(err => console.error(err));
  }
}

function nextPageAcclaimed() {
  currentPageAcclaimed++;
  fetchAcclaimedMovies()
    .then(data => {
      renderAcclaimedMovies(data);
    })
    .catch(err => console.error(err));
}

function prevPageAcclaimed() {
  if (currentPageAcclaimed > 1) {
    currentPageAcclaimed--;
    fetchAcclaimedMovies()
      .then(data => {
        renderAcclaimedMovies(data);
      })
      .catch(err => console.error(err));
  }
}

document.querySelector('#trend .next').addEventListener('click', nextPageTrend);
document.querySelector('#trend .prev').addEventListener('click', prevPageTrend);

// Load initial page for trend movies
fetchTrendMovies()
  .then(data => {
    renderTrendMovies(data);
  })
  .catch(err => console.error(err));

// Load initial page for acclaimed movies
fetchAcclaimedMovies()
  .then(data => {
    renderAcclaimedMovies(data);
  })
  .catch(err => console.error(err));