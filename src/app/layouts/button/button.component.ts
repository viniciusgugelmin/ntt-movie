import {Component, Input, Output, EventEmitter, booleanAttribute} from '@angular/core';
import {NgClass} from "@angular/common";

@Component({
  selector: 'app-button',
  standalone: true,
  imports: [
    NgClass
  ],
  templateUrl: './button.component.html',
  styleUrl: './button.component.scss'
})
export class ButtonComponent {
  @Input() id: string = '';
  @Input() type: string = 'button';
  @Input() bordered: boolean = false;
  @Input() small: boolean = false;
  @Input({transform: booleanAttribute}) disabled: boolean = false;

  @Output() onClick: EventEmitter<void> = new EventEmitter<void>();

  buttonClicked() {
    this.onClick.emit();
  }
}
