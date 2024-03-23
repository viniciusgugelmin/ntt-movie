import {Component, inject, OnDestroy, OnInit} from '@angular/core';
import {LoggedLayoutComponent} from "../../components/logged-layout/logged-layout.component";
import {Observable, Subscription} from "rxjs";
import {Store} from "@ngrx/store";
import {IMoviesReducer} from "../../store/reducers/movies.reducer";
import * as MoviesActions from "../../store/actions/movies.actions";
import * as MoviesSelectors from "../../store/selectors/movies.selectors";
import {ActivatedRoute} from "@angular/router";
import {selectMovieById} from "../../store/selectors/movies.selectors";
import {AsyncPipe, NgForOf, NgIf} from "@angular/common";
import {FavoriteComponent} from "../../components/favorite/favorite.component";

@Component({
  selector: 'app-movie',
  standalone: true,
  imports: [
    LoggedLayoutComponent,
    AsyncPipe,
    NgIf,
    NgForOf,
    FavoriteComponent
  ],
  templateUrl: './movie.component.html',
  styleUrl: './movie.component.scss'
})
export class MovieComponent implements OnInit, OnDestroy {
  movie$: Observable<Movies.Movie | undefined> = new Observable<Movies.Movie | undefined>();
  movieSubscription: Subscription = new Subscription();
  isLoading$: Observable<boolean> = new Observable<boolean>();
  error$: Observable<boolean> = new Observable<boolean>();

  route = inject(ActivatedRoute);

  constructor(private store: Store<IMoviesReducer>) {
  }

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id') as Movies.Movie['imdbID'];

    this.movie$ = this.store.select(MoviesSelectors.selectMovieById(id));
    this.isLoading$ = this.store.select(MoviesSelectors.selectMoviesLoading);
    this.error$ = this.store.select(MoviesSelectors.selectMoviesError);

    this.movieSubscription = this.movie$.subscribe(movie => {
      if (!movie || !movie.Ratings) {
        this.store.dispatch(MoviesActions.getMovieDetailsById({imdbID: id}));
      }
    });
  }

  ngOnDestroy(): void {
    this.movieSubscription.unsubscribe();
  }
}
