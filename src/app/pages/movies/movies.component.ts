import {Component, OnInit} from '@angular/core';
import {LoggedLayoutComponent} from "../../components/logged-layout/logged-layout.component";
import {MoviesListComponent} from "../../components/movies-list/movies-list.component";
import {AsyncPipe} from "@angular/common";
import {Observable} from "rxjs";
import * as UserSelectors from "../../store/selectors/user.selectors";
import {Store} from "@ngrx/store";
import {IUserReducer} from "../../store/reducers/user.reducer";

@Component({
  selector: 'app-movies',
  standalone: true,
  imports: [
    LoggedLayoutComponent,
    MoviesListComponent,
    AsyncPipe
  ],
  templateUrl: './movies.component.html',
  styleUrl: './movies.component.scss'
})
export class MoviesComponent implements OnInit {
  userName$: Observable<string> = new Observable<string>();

  constructor(private store: Store<IUserReducer>) {
  }

  ngOnInit(): void {
    this.userName$ = this.store.select(UserSelectors.selectUserName);
  }
}
