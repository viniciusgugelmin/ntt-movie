import { Component } from '@angular/core';
import {HeaderComponent} from "../../layouts/header/header.component";
import {FooterComponent} from "../../layouts/footer/footer.component";

@Component({
  selector: 'app-logged-layout',
  standalone: true,
  imports: [
    HeaderComponent,
    FooterComponent
  ],
  templateUrl: './logged-layout.component.html',
  styleUrl: './logged-layout.component.scss'
})
export class LoggedLayoutComponent {

}
