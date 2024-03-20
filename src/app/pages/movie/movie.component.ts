import { Component } from '@angular/core';
import {LoggedLayoutComponent} from "../../components/logged-layout/logged-layout.component";

@Component({
  selector: 'app-movie',
  standalone: true,
  imports: [
    LoggedLayoutComponent
  ],
  templateUrl: './movie.component.html',
  styleUrl: './movie.component.scss'
})
export class MovieComponent {

}
