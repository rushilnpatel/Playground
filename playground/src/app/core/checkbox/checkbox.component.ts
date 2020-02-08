import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';
import { ICheckbox } from './checkbox.types';

@Component({
  selector: 'wfc-checkbox',
  templateUrl: './checkbox.component.html',
  styleUrls: ['./checkbox.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CheckboxComponent {

  @Input()
  label = '';

  @Input()
  name = '';

  @Input()
  value = '';

  @Input()
  checked = false;

  @Output()
  checkboxChange: EventEmitter<ICheckbox> = new EventEmitter();

  handleChange(event: Event) {

    this.checked = event.target['checked'];

    this.checkboxChange.emit({
      checked: event.target['checked'],
      key: this.name,
      label: this.label,
      value: this.value
    });
  }
}
