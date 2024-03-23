import {booleanAttribute, Component, Input} from '@angular/core';
import {NgIf} from "@angular/common";

@Component({
  selector: 'app-heart',
  standalone: true,
  imports: [
    NgIf
  ],
  templateUrl: './heart.component.html',
  styleUrl: './heart.component.scss'
})
export class HeartComponent {
  @Input({transform: booleanAttribute}) filled: boolean = false;
}
