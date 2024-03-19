import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-input',
  standalone: true,
  imports: [],
  templateUrl: './input.component.html',
  styleUrl: './input.component.scss'
})
export class InputComponent {
  @Input() id: string = '';
  @Input() name: string = '';
  @Input() type: string = 'text';
  @Input() label: string = '';
  @Input() placeholder: string = '';
  @Input() value: string = '';
  @Input() bordered: boolean = true;
  @Input() disabled: boolean = false;
  @Input() required: boolean = false;
  @Input() otherClass: string = '';

  isFocused: boolean = false;

  @Output() onChange: EventEmitter<string> = new EventEmitter<string>();

  onInputChange(event: any) {
    this.value = event.target.value;
    this.onChange.emit(this.value);
  }

  onFocusIn(event: any) {
    this.isFocused = true;
  }

  onFocusOut(event: any) {
    this.isFocused = false;
  }
}
