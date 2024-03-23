import {Component, OnInit} from '@angular/core';
import {Store} from "@ngrx/store";
import {IMoviesReducer} from "../../store/reducers/movies.reducer";
import {Observable, Subscription} from "rxjs";
import {AsyncPipe, NgClass, NgForOf, NgIf, NgOptimizedImage} from "@angular/common";
import * as MoviesSelectors from "../../store/selectors/movies.selectors";
import {RouterLink} from "@angular/router";

@Component({
  selector: 'app-movies-list',
  standalone: true,
  imports: [
    NgForOf,
    AsyncPipe,
    NgIf,
    NgOptimizedImage,
    RouterLink,
    NgClass
  ],
  templateUrl: './movies-list.component.html',
  styleUrl: './movies-list.component.scss'
})
export class MoviesListComponent implements OnInit {
  movies$: Observable<Movies.Movie[]> = new Observable<Movies.Movie[]>()
  moviesSubscription: Subscription = new Subscription();
  movies: Movies.Movie[] = [];

  favorites$: Observable<Movies.Movie[]> = new Observable<Movies.Movie[]>()
  favoritesSubscription: Subscription = new Subscription();
  favorites: Movies.Movie[] = [];

  isLoading$: Observable<boolean> = new Observable<boolean>();
  error$: Observable<boolean> = new Observable<boolean>();

  constructor(private store: Store<IMoviesReducer>) {
  }

  ngOnInit(): void {
    this.movies$ = this.store.select(MoviesSelectors.selectAllMovies);
    this.favorites$ = this.store.select(MoviesSelectors.selectFavorites);
    this.isLoading$ = this.store.select(MoviesSelectors.selectMoviesLoading);
    this.error$ = this.store.select(MoviesSelectors.selectMoviesError);

    this.favoritesSubscription = this.favorites$.subscribe(favorites => {
      this.favorites = favorites;
    });

    this.moviesSubscription = this.movies$.subscribe(movies => {
      this.movies = movies.filter(movie => !this.favorites.find(favorite => favorite.imdbID === movie.imdbID));
    });
  }
}
