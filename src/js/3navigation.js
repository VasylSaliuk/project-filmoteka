const homeRef = document.querySelector('.home__link');
const libraryRef = document.querySelector('.library__link');
const homePageSectionRef = document.querySelector('[data-home-section]');
const librarySectionRef = document.querySelector('[data-library-section]');
const detailsSectionRef = document.querySelector('[data-details-section]');
const toggleQueueBtn = document.querySelector('[data-toggle-queue]');
const toggleWatchedBtn = document.querySelector('[data-toggle-watched]');
const favoriteBtn = document.querySelector('[data-toggle-favorite]');
const watchedBtn = document.querySelector('[data-action-watched]');
const queueBtn = document.querySelector('[data-action-queue]');
const favoriteMobileBtn = document.querySelector('[data-action-favorite]');
const logoRefs = document.querySelector('.logo__js');
const navigationRefs = document.querySelector('.navigation');
const togleSwitchBtn = document.querySelector('[data-action-togle]');
// получаем доступ к mobile-menu
const homeMobileRef = document.querySelector('.home__link-mobile');
const libraryMobileRef = document.querySelector('.library__link-mobile');
// получаем доступ к details About и кнопке Read More
// const readMoreBtn = document.getElementById('read__more');
const aboutContent = document.querySelector('.about__content');
const ditailsDescription = document.querySelector('#details__about');
// переменные для измнения иконок и текста в кнопках в detailsPage
const favoritePreTextIconRef = document.querySelector('[data-icon-favorite="addPlus"]');
const favoriteSpanTextRef = document.querySelector('[data-favorite-text="textButton"]');

const queuePreTextIconRef = document.querySelector('[data-icon-queue="addPlus"]');
const watchedSpanTextRef = document.querySelector('[data-watched-text="textButton"]');
const watchedPreTextIconRef = document.querySelector('[data-icon-watched="addPlus"]');

const queueSpanTextRef = document.querySelector('[data-queue-text="textButton"]');

// получаем доступ к кнопке НАЗАД
const returnBtn = detailsSectionRef.querySelector('#return__btn');
// создаем глобальную переменную selectFilm
let selectFilm = {};

// вешаем слушатели
homeRef.addEventListener('click', activeHomePage);
logoRefs.addEventListener('click', activeHomePage);
libraryRef.addEventListener('click', activeLibraryPage);
togleSwitchBtn.addEventListener('click', switchTheme);
homeMobileRef.addEventListener('click', activeHomePage);
libraryMobileRef.addEventListener('click', activeLibraryPage);
returnBtn.addEventListener('click', isReturnBtn);

//создаем функцию activeHomePage которая показывает домашнюю страницу и прячет остальные
function activeHomePage(e) {
  e.preventDefault();
  movieApi.resetPage();
  clearInput();
  trailer.clearTrailerKey();
  renderFilms = movieApi.fetchPopularFilmsList();
  renderPopularFilms();
  toggleActiveLink(homeRef);
  homeMobileRef.classList.add('sidenav-close');
  homePageSectionRef.classList.remove('is-hidden');
  librarySectionRef.classList.add('is-hidden');
  detailsSectionRef.classList.add('is-hidden');
}
//создаем функцию activeLibraryPage которая показывает домашнюю страницу и прячет остальные
function activeLibraryPage(e) {
  e.preventDefault();
  clearInput();
  trailer.clearTrailerKey();
  toggleActiveLink(libraryRef);
  libraryMobileRef.classList.add('sidenav-close');
  librarySectionRef.classList.remove('is-hidden');
  homePageSectionRef.classList.add('is-hidden');
  detailsSectionRef.classList.add('is-hidden');

  // queueBtn.focus();
  drawQueueFilmList();
  drawWatchedFilmList();
  drawFavoriteFilmList();
}
function activeWatchedMobile(e) {
  e.preventDefault();
  clearInput();
  toggleActiveLink(libraryRef);
  libraryMobileRef.classList.add('sidenav-close');
  librarySectionRef.classList.remove('is-hidden');
  homePageSectionRef.classList.add('is-hidden');
  detailsSectionRef.classList.add('is-hidden');
  refs.mobileWatchedBtn.classList.add('sidenav-close');

  // watchedBtn.focus();
  drawQueueFilmList();
  drawWatchedFilmList();
  drawFavoriteFilmList();
}

function activeQueuedMobile(e) {
  e.preventDefault();
  clearInput();
  toggleActiveLink(libraryRef);
  libraryMobileRef.classList.add('sidenav-close');
  librarySectionRef.classList.remove('is-hidden');
  homePageSectionRef.classList.add('is-hidden');
  detailsSectionRef.classList.add('is-hidden');
  refs.mobileQueueBtn.classList.add('sidenav-close');
  // queueBtn.focus();

  drawQueueFilmList();
  drawWatchedFilmList();
  drawFavoriteFilmList();
}

function activeFavoriteMobile(e) {
  e.preventDefault();
  clearInput();
  toggleActiveLink(libraryRef);
  libraryMobileRef.classList.add('sidenav-close');
  librarySectionRef.classList.remove('is-hidden');
  homePageSectionRef.classList.add('is-hidden');
  detailsSectionRef.classList.add('is-hidden');
  refs.mobileFavoriteBtn.classList.add('sidenav-close');
  // favoriteMobileBtn.focus();

  drawQueueFilmList();
  drawWatchedFilmList();
  drawFavoriteFilmList();
}

// создаем функцию activeDetailsPage которая показывает страницу детальной отрисовки фильма
function activeDetailsPage(movieId, itsLibraryFilm) {
  detailsSectionRef.classList.remove('is-hidden');
  homePageSectionRef.classList.add('is-hidden');
  librarySectionRef.classList.add('is-hidden');
  const filmsQueue = JSON.parse(localStorage.getItem('filmsQueue'));
  const filmsWatched = JSON.parse(localStorage.getItem('filmsWatched'));
  const filmsFavorite = JSON.parse(localStorage.getItem('filmsFavorite'));
  if (itsLibraryFilm) {
    if (watchedBtn.classList.contains('active')) {
      selectFilm = filmsWatched.find(el => {
        if (el.id === movieId) {
          return el;
        }
      });
    } else if (queueBtn.classList.contains('active')) {
      selectFilm = filmsQueue.find(el => {
        if (el.id === movieId) {
          return el;
        }
      });
    } else {
      selectFilm = filmsFavorite.find(el => {
        if (el.id === movieId) {
          return el;
        }
      });
    }
  } else {
    selectFilm = renderFilms.then(data => {
      return data.find(el => {
        if (el.id === movieId) {
          // add alex - функция рендера кнопки трейлера
          trailer.renderMovieTrailer(el.id);
          return el;
        }
      });
    });
  }

  showDetails(selectFilm);
  toggleQueueBtn.addEventListener('click', toggleToQueue);
  toggleWatchedBtn.addEventListener('click', toggleToWatched);
  favoriteBtn.addEventListener('click', toggleToFavorite);
}

function toggleActiveLink(link) {
  const currentActiveLink = navigationRefs.querySelector('.active');
  if (currentActiveLink) {
    currentActiveLink.classList.remove('active');
  }
  link.classList.add('active');
}

// КНОПКА ВВЕРХ получение доступа и логика
const goTopBtn = document.querySelector('.back__to__top');

window.addEventListener('scroll', trackScroll);
goTopBtn.addEventListener('click', backToTop);

// функция получения скролла страници и получние высоты одного экрана
function trackScroll() {
  const scrolled = window.pageYOffset;
  const coords = document.documentElement.clientHeight;
  if (scrolled > coords) {
    goTopBtn.classList.add('back__to__top-show');
  }
  if (scrolled < coords) {
    goTopBtn.classList.remove('back__to__top-show');
  }
}
// функция скролла вверх и ацнимация с помощью setTimout
function backToTop() {
  if (window.pageYOffset > 0) {
    window.scrollBy(0, -80);
    setTimeout(backToTop, 20);
  }
}

// функция возврата на предыдущую страницу
function isReturnBtn() {
  // add alex - сносит кнопку трейлера
  trailer.clearTrailerKey();

  if (libraryRef.classList.contains('active')) {
    librarySectionRef.classList.remove('is-hidden');
    homePageSectionRef.classList.add('is-hidden');
    detailsSectionRef.classList.add('is-hidden');
    drawQueueFilmList();
    drawWatchedFilmList();
    drawFavoriteFilmList();
  } else {
    homePageSectionRef.classList.remove('is-hidden');
    librarySectionRef.classList.add('is-hidden');
    detailsSectionRef.classList.add('is-hidden');
  }
}
