import {Component, OnInit} from '@angular/core';
import {Store} from "@ngrx/store";
import {IMoviesReducer} from "../../store/reducers/movies.reducer";
import {Observable} from "rxjs";
import {AsyncPipe, NgForOf, NgIf} from "@angular/common";
import * as MoviesSelectors from "../../store/selectors/movies.selectors";

@Component({
  selector: 'app-movies-list',
  standalone: true,
  imports: [
    NgForOf,
    AsyncPipe,
    NgIf
  ],
  templateUrl: './movies-list.component.html',
  styleUrl: './movies-list.component.scss'
})
export class MoviesListComponent implements OnInit {
  movies$: Observable<Movies.Movie[]> = new Observable<Movies.Movie[]>()
  isLoading$: Observable<boolean> = new Observable<boolean>();
  error$: Observable<boolean> = new Observable<boolean>();

  constructor(private store: Store<IMoviesReducer>) {
  }

  ngOnInit(): void {
    this.movies$ = this.store.select(MoviesSelectors.selectAllMovies);
    this.isLoading$ = this.store.select(MoviesSelectors.selectMoviesLoading);
    this.error$ = this.store.select(MoviesSelectors.selectMoviesError);
  }
}
