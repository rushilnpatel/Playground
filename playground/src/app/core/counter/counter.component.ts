import { Component, Input, HostListener } from '@angular/core';

@Component({
  selector: '[wfc-card-value]',
  templateUrl: './counter.component.html',
  styleUrls: ['./counter.component.scss']
})

export class CounterComponent {
  
  @Input() 
  title: string;

  @Input() 
  value: number;

  @Input()
  routeValue: string;

  @HostListener('click', ['$event'])
  onClick(event: Event) {
    event.preventDefault();
  }
}

