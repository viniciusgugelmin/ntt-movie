import { createAction, props } from '@ngrx/store';

export const searchMoviesByTitle = createAction('[Movie] Search Movies By Title', props<{ searchTerm: Movies.Movie['Title'], currentPage: number }>());
export const searchMoviesByTitleSuccess = createAction('[Movie] Search Movies By Title Success', props<{ movies: Movies.Movie[], totalPages: number, currentPage: number, searchTerm: string }>());
export const searchMoviesByTitleFailure = createAction('[Movie] Search Movies By Title Failure', props<{ error: any }>());

export const getMovieDetailsById = createAction('[Movie] Get Movie Details By Id', props<{ imdbID: Movies.Movie['imdbID'] }>());
export const getMovieDetailsByIdSuccess = createAction('[Movie] Get Movie Details By Id Success', props<{ movie: Movies.Movie }>());
export const getMovieDetailsByIdFailure = createAction('[Movie] Get Movie Details By Id Failure', props<{ error: any }>());

export const getFavorites = createAction('[Movie] Get Favorites');
export const getFavoritesSuccess = createAction('[Movie] Get Favorites Success', props<{ favorites: Movies.Movie[] }>());
export const getFavoritesFailure = createAction('[Movie] Get Favorites Failure', props<{ error: any }>());
export const addToFavorites = createAction('[Movie] Add To Favorites', props<{ movie: Movies.Movie }>());
export const removeFromFavorites = createAction('[Movie] Remove From Favorites', props<{ movie: Movies.Movie }>());
