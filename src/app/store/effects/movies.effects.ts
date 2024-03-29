import {Injectable} from '@angular/core';
import {Actions, ofType, createEffect} from '@ngrx/effects';
import {catchError, map, of} from 'rxjs';
import {mergeMap} from 'rxjs/operators';
import {MoviesService} from "../../services/movies.service";
import * as MoviesActions from '../actions/movies.actions';

@Injectable()
export class MoviesEffects {
  constructor(
    private actions$: Actions,
    private moviesService: MoviesService
  ) {
  }

  searchMoviesByTitle$ = createEffect(() => this.actions$.pipe(
      ofType(MoviesActions.searchMoviesByTitle),
      mergeMap( ({searchTerm, currentPage})=> this.moviesService.searchMoviesByTitle(searchTerm, currentPage)
        .pipe(
          map(({movies, totalPages, currentPage, searchTerm }) => MoviesActions.searchMoviesByTitleSuccess({movies, totalPages, currentPage, searchTerm})),
          catchError(error => of(MoviesActions.searchMoviesByTitleFailure({error})))
        )
    )
  ));

  getMovieDetailsById$ = createEffect(() => this.actions$.pipe(
      ofType(MoviesActions.getMovieDetailsById),
      mergeMap(({imdbID}) => this.moviesService.getMovieDetailsById(imdbID)
        .pipe(
          map(movie => MoviesActions.getMovieDetailsByIdSuccess({movie})),
          catchError(error => of(MoviesActions.getMovieDetailsByIdFailure({error})))
        )
    )
  ));

  getFavorites$ = createEffect(() => this.actions$.pipe(
      ofType(MoviesActions.getFavorites),
      mergeMap(() => this.moviesService.getFavorites()
        .pipe(
          map(favorites => MoviesActions.getFavoritesSuccess({favorites})),
          catchError(error => of(MoviesActions.getFavoritesFailure({error})))
        )
    )
  ));

  addToFavorites$ = createEffect(() => this.actions$.pipe(
      ofType(MoviesActions.addToFavorites),
      mergeMap(({movie}) => this.moviesService.addToFavorites(movie)
        .pipe(
          map(favorites => MoviesActions.getFavoritesSuccess({favorites})),
          catchError(error => of(MoviesActions.getFavoritesFailure({error})))
        )
    )
  ));

  removeFromFavorites$ = createEffect(() => this.actions$.pipe(
      ofType(MoviesActions.removeFromFavorites),
      mergeMap(({movie}) => this.moviesService.removeFromFavorites(movie)
        .pipe(
          map(favorites => MoviesActions.getFavoritesSuccess({favorites})),
          catchError(error => of(MoviesActions.getFavoritesFailure({error})))
        )
    )
  ));
}
