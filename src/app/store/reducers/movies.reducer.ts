import {createReducer, on} from '@ngrx/store';
import * as MoviesActions from '../actions/movies.actions';

export interface IMoviesReducer {
  movies: Movies.Movie[];
  favorites: Movies.Movie[];
  isLoading: boolean;
  error: any;
}

const initialState: IMoviesReducer = {
  movies: [],
  favorites: [],
  isLoading: false,
  error: null
};

export const moviesReducer = createReducer(
  initialState,
  on(MoviesActions.searchMoviesByTitle, state => ({ ...state, isLoading: true, error: false })),
  on(MoviesActions.searchMoviesByTitleSuccess, (state, { movies }) => ({ ...state, movies, isLoading: false })),
  on(MoviesActions.searchMoviesByTitleFailure, (state, { error }) => ({ ...state, isLoading: false, error })),

  on(MoviesActions.getMovieDetailsById, state => ({ ...state, isLoading: true, error: false })),
  on(MoviesActions.getMovieDetailsByIdSuccess, (state, { movie }) => {
    const movieStored = state.movies.find(m => m.imdbID === movie.imdbID);
    const movieObject = movieStored ? {
      ...movieStored,
      ...movie
    } : movie;

    const movies = state.movies.length ? state.movies.map(m => m.imdbID === movieObject.imdbID ? movieObject : m) : [movieObject];

    return { ...state, movies: [...movies], isLoading: false };
  }),
  on(MoviesActions.getMovieDetailsByIdFailure, (state, { error }) => ({ ...state, isLoading: false, error })),

  on(MoviesActions.getFavorites, state => ({ ...state, isLoading: true })),
  on(MoviesActions.getFavoritesSuccess, (state, { favorites }) => ({ ...state, favorites, isLoading: false })),
  on(MoviesActions.getFavoritesFailure, (state, { error }) => ({ ...state, isLoading: false, error })),
  on(MoviesActions.addToFavorites, (state, { movie }) => ({ ...state, favorites: [...state.favorites, movie] })),
  on(MoviesActions.removeFromFavorites, (state, { movie }) => {
    const favorites = state.favorites.filter(favorite => favorite.imdbID !== movie.imdbID);

    return { ...state, favorites };
  }),
);
