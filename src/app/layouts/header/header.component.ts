import {Component, OnInit} from '@angular/core';
import {Store} from "@ngrx/store";
import {IMoviesReducer} from "../../store/reducers/movies.reducer";
import * as MoviesActions from "../../store/actions/movies.actions";
import {ButtonComponent} from "../button/button.component";
import {InputComponent} from "../input/input.component";
import {Observable} from "rxjs";
import * as UserSelectors from "../../store/selectors/user.selectors";
import * as MoviesSelectors from "../../store/selectors/movies.selectors";
import {AsyncPipe} from "@angular/common";
import {IUserReducer} from "../../store/reducers/user.reducer";

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [
    ButtonComponent,
    InputComponent,
    AsyncPipe
  ],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent implements OnInit {
  movieTitle: string = '';

  header = {
    title: "NTT Data",
    logo: "assets/images/logo.png"
  }

  userName$: Observable<string> = new Observable<string>();
  isLoading$: Observable<boolean> = new Observable<boolean>();

  constructor(private store: Store<IMoviesReducer & IUserReducer>) {
  }

  ngOnInit(): void {
    this.userName$ = this.store.select(UserSelectors.selectUserName);
    this.isLoading$ = this.store.select(MoviesSelectors.selectMoviesLoading);
  }

  onTitleChange(event: any) {
    this.movieTitle = event;
  }

  onSubmit(event: any): void {
    this.store.dispatch(MoviesActions.searchMoviesByTitle({title: this.movieTitle}));

    this.movieTitle = '';
  }
}
