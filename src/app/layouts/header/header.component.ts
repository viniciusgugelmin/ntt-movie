import {Component, ElementRef, Input, OnInit, ViewChild} from '@angular/core';
import {Store} from "@ngrx/store";
import {IMoviesReducer} from "../../store/reducers/movies.reducer";
import * as MoviesActions from "../../store/actions/movies.actions";
import {ButtonComponent} from "../button/button.component";
import {InputComponent} from "../input/input.component";
import {Observable} from "rxjs";
import * as UserSelectors from "../../store/selectors/user.selectors";
import * as MoviesSelectors from "../../store/selectors/movies.selectors";
import {AsyncPipe, NgIf, NgOptimizedImage} from "@angular/common";
import {IUserReducer} from "../../store/reducers/user.reducer";
import {MagnifyingGlassComponent} from "../../icons/magnifying-glass/magnifying-glass.component";
import {FormsModule} from "@angular/forms";
import {RouterLink} from "@angular/router";
import {getRoutePath} from "../../app.routes";

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [
    ButtonComponent,
    InputComponent,
    AsyncPipe,
    MagnifyingGlassComponent,
    NgIf,
    FormsModule,
    RouterLink,
    NgOptimizedImage
  ],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent implements OnInit {
  @Input() searchBar = true;

  movieTitle: string = '';
  inputHidden: boolean = true;

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
    if (event.key !== 'Enter') {
      return;
    }

    this.store.dispatch(MoviesActions.searchMoviesByTitle({searchTerm: this.movieTitle, currentPage: 1}));
  }


  onMagnifyingGlassClick(): void {
    if (!this.inputHidden && this.movieTitle) {
      this.store.dispatch(MoviesActions.searchMoviesByTitle({searchTerm: this.movieTitle, currentPage: 1}));
      return;
    }

    this.inputHidden = !this.inputHidden;
    this.movieTitle = '';

    if (!this.inputHidden) {
      setTimeout(() => {
        const searchInput = document.getElementById('movie-title');
        searchInput?.focus();
      }, 0);
    }
  }

  protected readonly getRoutePath = getRoutePath;
}
