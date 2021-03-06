import { config } from './config.js';

export const carousel = ($container, movies) => {
  let currentSlide = 0;

  let isMoving = false;

  // 캐러셀 DURATION
  const DURATION = 500;

  // 1페이지당 보여줄 영화 수
  const PAGE_PER_MOVIES = 5;

  $container.innerHTML = renderMovieCarousel(movies);

  let $carouselPrevBtn = document.querySelector('.carousel-control.prev');
  let $carouselNextBtn = document.querySelector('.carousel-control.next');
  let $carouselSlides = document.querySelector('.carousel-slides');

  $carouselPrevBtn.style.visibility = 'hidden';

  const move = (currentSlide, duration = 0) => {
    if (duration) isMoving = true;

    $carouselSlides.style.setProperty('--duration', duration);

    $carouselSlides.style.setProperty('--currentSlide', currentSlide);
  };

  $container.onclick = ({ target }) => {
    if (
      (!target.classList.contains('carousel-control') && !target.classList.contains('carousel-control-image')) ||
      isMoving
    )
      return;

    let nextSlide = target.classList.contains('prev') ? -1 : 1;

    currentSlide += 1 * nextSlide;

    if (currentSlide < 0) currentSlide = 0;

    let restMovies = movies.length - currentSlide * PAGE_PER_MOVIES;

    if (restMovies < PAGE_PER_MOVIES) {
      currentSlide += restMovies / PAGE_PER_MOVIES - 1;
    }

    if (currentSlide > 0) {
      $carouselPrevBtn.style.visibility = 'visible';
      $carouselNextBtn.style.visibility = currentSlide >= movies.length / 5 - 1 ? 'hidden' : 'visible';
    } else if (currentSlide === 0) $carouselPrevBtn.style.visibility = 'hidden';

    move(currentSlide, DURATION);
  };

  $container.ontransitionend = () => {
    isMoving = false;
  };
};

const renderMovieCarousel = movies => {
  const template = [];

  template.push(`<ul class="box-office carousel-slides">`);

  template.push(
    [...movies]
      .map((movie, i) => {
        let temp = `
          <li class="movie-item">
            <div class="movie-item-container">
             <div class="movie-poster">
              <div class="movie-poster-num" data-num="${i + 1}">${i + 1}</div>
              <img src="${config.image_base_url + movie?.poster_path}" alt="movie-poster" />
            </div>
            <div class="movie-detail">
             <span class="movie-title">${movie?.title}</span>
             <div class="movie-info">
              <span class="movie-year">${movie?.release_date}</span>
              <span>ㆍ</span>
              <span class="movie-country">${movie?.country}</span>
             </div>
              <div>연령등급 : ${movie?.certification}</div>
              <span class="movie-score">평균★3.9</span>
             </div>
           </div>
          </li>`;
        return temp;
      })
      .join('')
  );

  template.push(`</ul>
    <button class="carousel-control prev">
      <img
        class="carousel-control-image prev"
        src="data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIxMiIgaGVpZ2h0PSIxNiIgdmlld0JveD0iMCAwIDEyIDE2Ij4KICAgIDxnIGZpbGw9Im5vbmUiIGZpbGwtcnVsZT0iZXZlbm9kZCI+CiAgICAgICAgPHBhdGggZD0iTTAgMEgxMlYxNkgweiIgdHJhbnNmb3JtPSJyb3RhdGUoMTgwIDYgOCkiLz4KICAgICAgICA8cGF0aCBmaWxsPSIjMjkyQTMyIiBzdHJva2U9IiMyOTJBMzIiIHN0cm9rZS13aWR0aD0iLjM1IiBkPSJNMy40MjkgMTMuNDA5TDQuMzU0IDE0LjI1OCAxMC42OCA4LjQ2IDExLjE0MyA4LjAzNiA0LjM1NCAxLjgxMyAzLjQyOSAyLjY2MiA5LjI5MSA4LjAzNnoiIHRyYW5zZm9ybT0icm90YXRlKDE4MCA2IDgpIi8+CiAgICA8L2c+Cjwvc3ZnPgo="
        alt="backward"
      />
    </button>
    <button class="carousel-control next">
      <img
        class="carousel-control-image next"
        src="data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIxMiIgaGVpZ2h0PSIxNiIgdmlld0JveD0iMCAwIDEyIDE2Ij4KICAgIDxnIGZpbGw9Im5vbmUiIGZpbGwtcnVsZT0iZXZlbm9kZCI+CiAgICAgICAgPHBhdGggZD0iTTAgMEgxMlYxNkgweiIvPgogICAgICAgIDxwYXRoIGZpbGw9IiMyOTJBMzIiIHN0cm9rZT0iIzI5MkEzMiIgc3Ryb2tlLXdpZHRoPSIuMzUiIGQ9Ik0zLjQyOSAxMy40MDlMNC4zNTQgMTQuMjU4IDEwLjY4IDguNDYgMTEuMTQzIDguMDM2IDQuMzU0IDEuODEzIDMuNDI5IDIuNjYyIDkuMjkxIDguMDM2eiIvPgogICAgPC9nPgo8L3N2Zz4K"
        alt="forward"
      />
    </button>`);
  return template.join('');
};
