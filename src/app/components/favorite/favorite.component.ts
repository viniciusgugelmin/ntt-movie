import {Component, Input, OnDestroy, OnInit} from '@angular/core';
import {HeartComponent} from "../../icons/heart/heart.component";
import {Store} from "@ngrx/store";
import {IMoviesReducer} from "../../store/reducers/movies.reducer";
import * as MoviesActions from "../../store/actions/movies.actions";
import * as MoviesSelectors from "../../store/selectors/movies.selectors";
import {Observable, Subscription} from "rxjs";
import {AsyncPipe} from "@angular/common";
import {ButtonComponent} from "../../layouts/button/button.component";

@Component({
  selector: 'app-favorite',
  standalone: true,
  imports: [
    HeartComponent,
    AsyncPipe,
    ButtonComponent
  ],
  templateUrl: './favorite.component.html',
  styleUrl: './favorite.component.scss'
})
export class FavoriteComponent implements OnInit, OnDestroy {
  @Input() imdbID: Movies.Movie['imdbID'] = '';

  movie$: Observable<Movies.Movie | undefined> = new Observable<Movies.Movie | undefined>();
  movieSubscription: Subscription = new Subscription();
  movie: Movies.Movie | undefined;

  isFavorite$: Observable<boolean> = new Observable<boolean>();
  isFavoriteSubscription: Subscription = new Subscription();
  isFavorite: boolean = false;

  constructor(private store: Store<IMoviesReducer>) {
  }

  ngOnInit() {
    this.movie$ = this.store.select(MoviesSelectors.selectMovieById(this.imdbID));
    this.isFavorite$ = this.store.select(MoviesSelectors.selectIsFavorite(this.imdbID));

    this.movieSubscription = this.movie$.subscribe((movie) => {
      if (movie) {
        this.movie = movie;
      }
    });

    this.isFavoriteSubscription = this.isFavorite$.subscribe((isFavorite) => {
      this.isFavorite = isFavorite;
    });
  }

  ngOnDestroy() {
    this.movieSubscription.unsubscribe();
    this.isFavoriteSubscription.unsubscribe();
  }

  toggleFavorite() {
    if (!this.movie) {
      return;
    }

    if (this.isFavorite) {
      this.removeFromFavorite();
      return;
    }

    this.addToFavorite();
  }

  addToFavorite() {
    this.store.dispatch(MoviesActions.addToFavorites({ movie: this.movie! }));
  }

  removeFromFavorite() {
    this.store.dispatch(MoviesActions.removeFromFavorites({ movie: this.movie! }));
  }
}
