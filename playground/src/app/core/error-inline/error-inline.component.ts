import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'wfc-error-inline',
  templateUrl: './error-inline.component.html',
  styleUrls: ['./error-inline.component.scss']
})
export class ErrorInlineComponent {

  @Input()
  open = false;

  @Input()
  icon = '';

  @Input()
  text = '';

  @Input()
  ctaText = '';

  @Input()
  showCTA = true;

  @Output()
  buttonClick: EventEmitter<any> = new EventEmitter();

  handleButtonClick() {
    this.buttonClick.emit();
  }
}
