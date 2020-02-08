import { Component, ElementRef, EventEmitter, HostBinding, Input, Output, ViewChild } from '@angular/core';

@Component({
  selector: '[wfc-search]',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent {

  private _open = false;
  private _focus = false;

  @Input()
  placeholder = 'Search';

  @Output()
  searchTextChange: EventEmitter<string> = new EventEmitter();

  @ViewChild('input', {static: false})
  input: ElementRef;

  @HostBinding('class.open')
  get classOpen() {
    return this._open;
  }

  @HostBinding('class.focus')
  get classFocus() {
    return this._focus;
  }

  toggle() {
    this._open = !this._open;
  }

  handleKeyup() {
    this.searchTextChange.emit(this.input.nativeElement.value);
  }

  handleClick(event: MouseEvent) {
    event.preventDefault();
    this.toggle();
  }

  handleFocus() {
    this._focus = true;
  }

  handleBlur() {
    this._focus = false;
  }

  reset() {
    this.input.nativeElement.value = '';
    this.searchTextChange.emit('');
  }
}
