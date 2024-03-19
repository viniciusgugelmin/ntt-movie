import { createAction, props } from '@ngrx/store';

export const searchMoviesByTitle = createAction('[Movie] Search Movies By Title', props<{ title: Movies.Movie['Title'] }>());
export const searchMoviesByTitleSuccess = createAction('[Movie] Search Movies By Title Success', props<{ movies: Movies.Movie[] }>());
export const searchMoviesByTitleFailure = createAction('[Movie] Search Movies By Title Failure', props<{ error: any }>());
