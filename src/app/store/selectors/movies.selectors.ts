import { createSelector, createFeatureSelector } from '@ngrx/store';
import { IMoviesReducer } from '../reducers/movies.reducer';

export const selectMovieState = createFeatureSelector<IMoviesReducer>('movies');

export const selectAllMovies = createSelector(
  selectMovieState,
  state => state.movies
);

export const selectMovieById = (imdbID: string) => createSelector(
  selectAllMovies,
  movies => movies.find(movie => movie.imdbID === imdbID)
);

export const selectFavorites = createSelector(
  selectMovieState,
  state => state.favorites
);

export const selectMoviesLoading = createSelector(
  selectMovieState,
  state => state.isLoading
);

export const selectMoviesError = createSelector(
  selectMovieState,
  state => state.error
);
