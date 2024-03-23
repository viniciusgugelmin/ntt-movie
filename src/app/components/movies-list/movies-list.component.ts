import {Component, OnDestroy, OnInit} from '@angular/core';
import {Store} from "@ngrx/store";
import {IMoviesReducer} from "../../store/reducers/movies.reducer";
import {Observable, Subscription} from "rxjs";
import {AsyncPipe, NgClass, NgForOf, NgIf, NgOptimizedImage} from "@angular/common";
import * as MoviesSelectors from "../../store/selectors/movies.selectors";
import {RouterLink} from "@angular/router";
import * as MoviesActions from "../../store/actions/movies.actions";
import {ButtonComponent} from "../../layouts/button/button.component";

@Component({
  selector: 'app-movies-list',
  standalone: true,
  imports: [
    NgForOf,
    AsyncPipe,
    NgIf,
    NgOptimizedImage,
    RouterLink,
    NgClass,
    ButtonComponent
  ],
  templateUrl: './movies-list.component.html',
  styleUrl: './movies-list.component.scss'
})
export class MoviesListComponent implements OnInit, OnDestroy {
  movies$: Observable<Movies.Movie[]> = new Observable<Movies.Movie[]>()
  moviesSubscription: Subscription = new Subscription();
  movies: Movies.Movie[] = [];

  currentPage$: Observable<number> = new Observable<number>();
  currentPageSubscription: Subscription = new Subscription();
  currentPage: number = 1;

  totalPages$: Observable<number> = new Observable<number>();
  totalPagesSubscription: Subscription = new Subscription();
  totalPages: number = 0;

  searchTerm$: Observable<string> = new Observable<string>();
  searchTermSubscription: Subscription = new Subscription();
  searchTerm: string = '';

  favorites$: Observable<Movies.Movie[]> = new Observable<Movies.Movie[]>()
  favoritesSubscription: Subscription = new Subscription();
  favorites: Movies.Movie[] = [];

  isLoading$: Observable<boolean> = new Observable<boolean>();
  error$: Observable<boolean> = new Observable<boolean>();

  pagesRemaining: number = 0;

  constructor(private store: Store<IMoviesReducer>) {
  }

  ngOnInit(): void {
    this.movies$ = this.store.select(MoviesSelectors.selectAllMovies);

    this.currentPage$ = this.store.select(MoviesSelectors.selectCurrentPage);
    this.totalPages$ = this.store.select(MoviesSelectors.selectTotalPages);
    this.searchTerm$ = this.store.select(MoviesSelectors.selectSearchTerm);

    this.favorites$ = this.store.select(MoviesSelectors.selectFavorites);

    this.isLoading$ = this.store.select(MoviesSelectors.selectMoviesLoading);
    this.error$ = this.store.select(MoviesSelectors.selectMoviesError);

    this.currentPageSubscription = this.currentPage$.subscribe(currentPage => {
      this.currentPage = currentPage;
      this.pagesRemaining = this.totalPages - (currentPage - 1);
    });

    this.totalPagesSubscription = this.totalPages$.subscribe(totalPages => {
      this.totalPages = totalPages;
    });

    this.searchTermSubscription = this.searchTerm$.subscribe(searchTerm => {
      this.searchTerm = searchTerm;
    });

    this.favoritesSubscription = this.favorites$.subscribe(favorites => {
      this.favorites = favorites;
    });

    this.moviesSubscription = this.movies$.subscribe(movies => {
      this.movies = movies.filter(movie => !this.favorites.find(favorite => favorite.imdbID === movie.imdbID));
    });
  }

  ngOnDestroy(): void {
    this.currentPageSubscription.unsubscribe();
    this.totalPagesSubscription.unsubscribe();
    this.searchTermSubscription.unsubscribe();
    this.favoritesSubscription.unsubscribe();
    this.moviesSubscription.unsubscribe();
  }

  async seeMore() {
    this.store.dispatch(MoviesActions.searchMoviesByTitle({searchTerm: this.searchTerm, currentPage: this.currentPage}));
  }
}
