import { Component } from '@angular/core';
import {LoggedLayoutComponent} from "../../components/logged-layout/logged-layout.component";
import {MoviesListComponent} from "../../components/movies-list/movies-list.component";

@Component({
  selector: 'app-movies',
  standalone: true,
  imports: [
    LoggedLayoutComponent,
    MoviesListComponent
  ],
  templateUrl: './movies.component.html',
  styleUrl: './movies.component.scss'
})
export class MoviesComponent {

}
