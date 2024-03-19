import { createSelector, createFeatureSelector } from '@ngrx/store';
import { IMoviesReducer } from '../reducers/movies.reducer';

export const selectMovieState = createFeatureSelector<IMoviesReducer>('movies');

export const selectAllMovies = createSelector(
  selectMovieState,
  state => state.movies
);

export const selectMoviesLoading = createSelector(
  selectMovieState,
  state => state.isLoading
);

export const selectMoviesError = createSelector(
  selectMovieState,
  state => state.error
);
