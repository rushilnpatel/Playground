import { Component, Input } from '@angular/core';

@Component({
  selector: '[wfc-accordion]',
  templateUrl: './accordion.component.html',
  styleUrls: ['./accordion.component.scss']
})
export class AccordionComponent {

  @Input()
  isExpanded = false;

  @Input()
  isCollapsible = true;

  expandedClick() {
    this.isExpanded = !this.isExpanded;
  }
}
