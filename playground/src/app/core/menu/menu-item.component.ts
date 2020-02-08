import {
  Component,
  HostListener,
  Input
} from '@angular/core';

@Component({
  selector: '[wfc-menu-item]',
  templateUrl: './menu-item.component.html',
  styleUrls: ['./menu-item.component.scss']
})
export class MenuItemComponent {

  @Input()
  text: string;

  @Input()
  value: any = this.text;

  @Input()
  icon: string = null;

  @Input()
  parent: any;

  @HostListener('click', ['$event'])
  onClick(event: Event) {

    if (!this.parent) {
      return;
    }

    event.preventDefault();
    event.stopPropagation();

    this.parent.close();
  }
}
