import {Component, OnInit} from '@angular/core';
import {Store} from "@ngrx/store";
import {IMoviesReducer} from "../../store/reducers/movies.reducer";
import {Observable} from "rxjs";

@Component({
  selector: 'app-movies-list',
  standalone: true,
  imports: [],
  templateUrl: './movies-list.component.html',
  styleUrl: './movies-list.component.scss'
})
export class MoviesListComponent implements OnInit {
  movies$: Observable<Movies.Movie[]> = new Observable<Movies.Movie[]>()

  constructor(private store: Store<IMoviesReducer>) {
  }

  ngOnInit(): void {
    this.movies$ = this.store.select('movies');
  }
}
