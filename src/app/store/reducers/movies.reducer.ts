import {createReducer, on} from '@ngrx/store';
import * as MoviesActions from '../actions/movies.actions';

export interface IMoviesReducer {
  movies: Movies.Movie[];
  isLoading: boolean;
  error: any;
}

const initialState: IMoviesReducer = {
  movies: [],
  isLoading: false,
  error: null
};

export const moviesReducer = createReducer(
  initialState,
  on(MoviesActions.searchMoviesByTitle, state => ({ ...state, isLoading: true, error: false })),
  on(MoviesActions.searchMoviesByTitleSuccess, (state, { movies }) => ({ ...state, movies, isLoading: false })),
  on(MoviesActions.searchMoviesByTitleFailure, (state, { error }) => ({ ...state, isLoading: false, error }))
);
