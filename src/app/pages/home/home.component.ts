import { Component } from '@angular/core';
import {IntroComponent} from "../../components/intro/intro.component";
import {ɵEmptyOutletComponent} from "@angular/router";

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    IntroComponent,
    ɵEmptyOutletComponent
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {

}
