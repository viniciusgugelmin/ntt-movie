import {Component, Input, Output, EventEmitter, booleanAttribute} from '@angular/core';

@Component({
  selector: 'app-button',
  standalone: true,
  imports: [],
  templateUrl: './button.component.html',
  styleUrl: './button.component.scss'
})
export class ButtonComponent {
  @Input() id: string = '';
  @Input() type: string = 'button';
  @Input({transform: booleanAttribute}) disabled: boolean = false;

  @Output() onClick: EventEmitter<void> = new EventEmitter<void>();

  buttonClicked() {
    this.onClick.emit();
  }
}
