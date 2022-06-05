// const API_URL = 'https://api.themoviedb.org/3/';
const BASE_IMG = 'https://image.tmdb.org/t/p/w300';
const time_window = 'day';
const media_type = 'movie';

const API = axios.create({
  baseURL: 'https://api.themoviedb.org/3/',
  headers: {
    'content-type': 'application/json',
  },
  params: {
    'api_key': API_KEY,
  }
})

async function getTrending() {
  const { data } = await API.get(`/trending/${media_type}/${time_window}`);
  data?.results.forEach(movie => {
    const trendingPreviewContainer = document.querySelector('#trendingPreview .trendingPreview-movieList');
    const movieCont = document.createElement('div');
    movieCont.classList.add('movie-container');

    const movieImg = document.createElement('img');
    movieImg.classList.add('movie-img');
    movieImg.setAttribute('alt', movie.title)
    movieImg.setAttribute('src', `${BASE_IMG}${movie.poster_path}`)

    movieCont.appendChild(movieImg);
    trendingPreviewContainer.appendChild(movieCont);
  })
}

async function getCategories() {
  const { data } = await API.get(`/genre/movie/list`);
  data?.genres.forEach(category => {
    const categoriesContainer = document.querySelector('#categoriesPreview .categoriesPreview-list');
    const categoryCont = document.createElement('div');
    categoryCont.classList.add('category-container');

    const categoryTitle = document.createElement('h3');
    categoryTitle.classList.add('category-title');
    categoryTitle.setAttribute('id', `id${category.id}`)

    const categoryTitleText = document.createTextNode(category.name);

    categoryTitle.appendChild(categoryTitleText);

    categoryCont.appendChild(categoryTitle);
    categoriesContainer.appendChild(categoryCont);
  })
}

getTrending()
getCategories()