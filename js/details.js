const options = {
  method: 'GET',
  headers: {
    accept: 'application/json',
    Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIwNWI5YjJiZjkxMjhhOWYyNDYxMGY2MzVkNTcxMjEzNSIsInN1YiI6IjY2MjA1ODlkN2EzYzUyMDE2NDRiOTg3MiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.i9HwkNJiriGu0CRfJL3-pz_1nhuDN3qlFwsDe85WP3o'
  }
};

function fetchMovieDetails(movieId) {
  return fetch(`https://api.themoviedb.org/3/movie/${movieId}?language=en-US`, options)
    .then(response => response.json());
}

function fetchMovieCredits(movieId) {
  return fetch(`https://api.themoviedb.org/3/movie/${movieId}/credits?language=en-US`, options)
    .then(response => response.json());
}

function fetchMovieVideos(movieId) {
  return fetch(`https://api.themoviedb.org/3/movie/${movieId}/videos?language=en-US`, options)
    .then(response => response.json());
}

function fetchExternalIds(movieId) {
  return fetch(`https://api.themoviedb.org/3/movie/${movieId}/external_ids`, options)
    .then(response => response.json());
}

function createSocialLinks(externalIds, homepage) {
  const socialLinks = document.createElement('ul');
  socialLinks.classList.add('networkList')

  if (externalIds.facebook_id) {
    const facebookLink = document.createElement('li');
    const facebookAnchor = document.createElement('a');
    facebookAnchor.href = `https://www.facebook.com/${externalIds.facebook_id}`;
    facebookAnchor.target = "_blank";
    const facebookIcon = document.createElement('i');
    facebookIcon.classList.add('fab', 'fa-facebook', 'network');
    facebookAnchor.appendChild(facebookIcon);
    facebookLink.appendChild(facebookAnchor);
    socialLinks.appendChild(facebookLink);
  }

  if (externalIds.twitter_id) {
    const twitterLink = document.createElement('li');
    const twitterAnchor = document.createElement('a');
    twitterAnchor.href = `https://twitter.com/${externalIds.twitter_id}`;
    twitterAnchor.target = "_blank";
    const twitterIcon = document.createElement('i');
    twitterIcon.classList.add('fab', 'fa-twitter', 'network');
    twitterAnchor.appendChild(twitterIcon);
    twitterLink.appendChild(twitterAnchor);
    socialLinks.appendChild(twitterLink);
  }

  if (externalIds.instagram_id) {
    const instagramLink = document.createElement('li');
    const instagramAnchor = document.createElement('a');
    instagramAnchor.href = `https://instagram.com/${externalIds.instagram_id}/`;
    instagramAnchor.target = "_blank";
    const instagramIcon = document.createElement('i');
    instagramIcon.classList.add('fab', 'fa-instagram', 'network');
    instagramAnchor.appendChild(instagramIcon);
    instagramLink.appendChild(instagramAnchor);
    socialLinks.appendChild(instagramLink);
  }

  if (homepage) {
    const websiteLink = document.createElement('li');
    const websiteAnchor = document.createElement('a');
    websiteAnchor.href = homepage;
    websiteAnchor.target = "_blank";
    const websiteIcon = document.createElement('i');
    websiteIcon.classList.add('fas', 'fa-link', 'network');
    websiteAnchor.appendChild(websiteIcon);
    websiteLink.appendChild(websiteAnchor);
    socialLinks.appendChild(websiteLink);
  }

  const networksContainer = document.querySelector('.networks');
  networksContainer.innerHTML = '';
  networksContainer.appendChild(socialLinks);
}

function renderMovieDetails(movie) {
  const dynamicImageUrl = `https://image.tmdb.org/t/p/w500${movie.poster_path}`;
  const backgroundContainer = document.querySelector('.detail');
  backgroundContainer.style.backgroundImage = `linear-gradient(to right top, #6d6969a7, #6d6969a7), url(${dynamicImageUrl})`;

  const containerDetail = document.querySelector('.containerDetail');
  containerDetail.innerHTML = '';

  const imgDetail = document.createElement('div');
  imgDetail.classList.add('imgDetail');
  const img = document.createElement('img');
  img.src = `https://image.tmdb.org/t/p/w500${movie.poster_path}`;
  img.alt = movie.title;
  imgDetail.appendChild(img);

  const textDetail = document.createElement('div');
  textDetail.classList.add('textDetail');
  const h1 = document.createElement('h1');
  h1.textContent = movie.title;

  const releaseDate = new Date(movie.release_date);
  const pDate = document.createElement('p');
  pDate.textContent = releaseDate.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'numeric',
    day: 'numeric'
  });

  const genres = movie.genres.map(genre => genre.name).join(', ');
  const pGenres = document.createElement('p');
  pGenres.textContent = `${pDate.textContent} • ${genres} • ${movie.runtime}m`;

  textDetail.appendChild(h1);
  textDetail.appendChild(pGenres);

  const h2Overview = document.createElement('h2');
  h2Overview.textContent = 'Overview';
  const pOverview = document.createElement('p');
  pOverview.textContent = movie.overview;
  textDetail.appendChild(h2Overview);
  textDetail.appendChild(pOverview);

  const conteinerCredits = document.createElement('div');
  conteinerCredits.classList.add('conteinerCredits');
  textDetail.appendChild(conteinerCredits);

  containerDetail.appendChild(imgDetail);
  containerDetail.appendChild(textDetail);

  const infoDiv = document.querySelector('.info');
  const infoTable = document.createElement('table');
  infoTable.classList.add('infoTable')
  infoTable.innerHTML = `
    <thead>
      <tr>
        <th colspan="2">Information</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td><strong>Status</strong></td>
        <td>${movie.status}</td>
      </tr>
      <tr>
        <td><strong>Original Language</strong></td>
        <td>${movie.spoken_languages[0].english_name}</td>
      </tr>
      <tr>
        <td><strong>Budget</strong></td>
        <td>$${movie.budget.toLocaleString('en-US')}</td>
      </tr>
      <tr>
        <td><strong>Revenue</strong></td>
        <td>$${movie.revenue.toLocaleString('en-US')}</td>
      </tr>
    </tbody>
  `;
  infoDiv.appendChild(infoTable);

  return fetchMovieCredits(movie.id)
    .then(credits => {
      const directors = credits.crew.filter(member => member.job === 'Director').slice(0, 2);
      const writers = credits.crew.filter(member => member.department === 'Writing');

      directors.forEach(director => {
        const divCredits = document.createElement('div');
        const h3 = document.createElement('h3');
        h3.textContent = director.name;
        const p = document.createElement('p');
        p.textContent = 'Director';
        divCredits.appendChild(h3);
        divCredits.appendChild(p);
        conteinerCredits.appendChild(divCredits);
      });

      writers.forEach(writer => {
        const divCredits = document.createElement('div');
        const h3 = document.createElement('h3');
        h3.textContent = writer.name;
        const p = document.createElement('p');
        p.textContent = 'Writer';
        divCredits.appendChild(h3);
        divCredits.appendChild(p);
        conteinerCredits.appendChild(divCredits);
      });
    })
    .catch(err => console.error(err));
}

function renderMovieTrailer(videos) {
  const officialTrailers = videos.results.filter(trailer => trailer.type === "Trailer" && trailer.official);

  if (officialTrailers.length > 0) {
    const latestOfficialTrailer = officialTrailers[officialTrailers.length - 1];

    const iframe = document.createElement('iframe');
    iframe.width = 560;
    iframe.height = 315;
    iframe.title = "YouTube video player";
    iframe.style = "border-color: transparent;";
    iframe.src = `https://www.youtube.com/embed/${latestOfficialTrailer.key}`;
    iframe.allow = "accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share";

    const titleTrailer = document.createElement('h2');
    titleTrailer.textContent = 'Ver Trailer';
    titleTrailer.classList.add('titleTrailer');

    const trailerContainer = document.querySelector('.containerTrailer');
    trailerContainer.innerHTML = '';
    trailerContainer.appendChild(titleTrailer);
    trailerContainer.appendChild(iframe);
  } else {
    console.error('No se encontró ningún trailer oficial.');
  }
}

document.addEventListener('DOMContentLoaded', function () {
  const urlParams = new URLSearchParams(window.location.search);
  const movieId = urlParams.get('id');

  Promise.all([
    fetchMovieDetails(movieId),
    fetchMovieCredits(movieId),
    fetchMovieVideos(movieId),
    fetchExternalIds(movieId)
  ])
    .then(([movieDetails, credits, videos, externalIds]) => {
      renderMovieDetails(movieDetails);
      renderMovieTrailer(videos);
      createSocialLinks(externalIds,movieDetails.homepage);
    })
    .catch(err => console.error(err));
});

