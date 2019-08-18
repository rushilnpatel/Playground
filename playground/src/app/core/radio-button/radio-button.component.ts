import { Component, ElementRef, EventEmitter, Input, Output, ViewChild } from '@angular/core';
import { IRadioButton } from './radio-button.types';

@Component({
  selector: 'wfc-radio-button',
  templateUrl: './radio-button.component.html',
  styleUrls: ['./radio-button.component.scss']
})
export class RadioButtonComponent {

  @ViewChild('radioInput', {static: false})
  radioInput: ElementRef;

  @Input()
  label = '';

  @Input()
  name = '';

  @Input()
  value = '';

  @Input()
  get checked(): boolean {
    return this.radioInput.nativeElement.checked;
  }

  set checked(value: boolean) {
    this.radioInput.nativeElement.checked = value;
  }

  @Output()
  radioButtonChange: EventEmitter<IRadioButton> = new EventEmitter();

  handleChange(event: Event) {
    this.radioButtonChange.emit({
      checked: true,
      key: this.name,
      label: this.label,
      value: this.value
    });
  }
}
