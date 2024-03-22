import {Component, ElementRef, EventEmitter, Input, Output} from '@angular/core';
import {NgClass} from "@angular/common";

@Component({
  selector: 'app-input',
  standalone: true,
  imports: [
    NgClass
  ],
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
  @Input() small: boolean = false;
  @Input() faded: boolean = false;
  @Input() otherClass: string = '';

  isFocused: boolean = false;

  @Output() onChange: EventEmitter<string> = new EventEmitter<string>();
  @Output() onBlur: EventEmitter<void> = new EventEmitter<void>();
  @Output() onKeyPress: EventEmitter<void> = new EventEmitter<void>();

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

  onBlurEvent(event: any) {
    this.onBlur.emit();
  }

  onKeyPressEvent(event: any) {
    this.onKeyPress.emit(event);
  }
}
