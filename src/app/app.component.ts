import {Component, OnInit} from '@angular/core';
import {Router, RouterOutlet} from '@angular/router';
import * as UserActions from "./store/actions/user.actions";
import * as MoviesActions from "./store/actions/movies.actions";
import {Store} from "@ngrx/store";
import {IUserReducer} from "./store/reducers/user.reducer";
import {IMoviesReducer} from "./store/reducers/movies.reducer";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent implements OnInit {
  constructor(private store: Store<IUserReducer | IMoviesReducer>, private router: Router) {
  }

  ngOnInit(): void {
    this.store.dispatch(UserActions.getName());
    this.store.dispatch(MoviesActions.getFavorites());
  }
}
