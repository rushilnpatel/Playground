import { Component, EventEmitter, Input, Output } from '@angular/core';
import { IKeyValueLabel } from '../models/data.types';

@Component({
  selector: 'wfc-chiclet',
  templateUrl: './chiclet.component.html',
  styleUrls: ['./chiclet.component.scss']
})
export class ChicletComponent {

  @Input()
  data: IKeyValueLabel;

  @Output()
  remove: EventEmitter<IKeyValueLabel> = new EventEmitter();

  get label() {
    return this.data.label;
  }

  get key() {
    return this.data.key;
  }

  get value() {
    return this.data.value;
  }

  handleCloseClick() {
    this.remove.emit(this.data);
  }
}
