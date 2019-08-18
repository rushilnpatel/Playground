import { AfterViewInit, Component, ElementRef, Input, Renderer2 } from '@angular/core';

@Component({
  selector: 'wfc-donut-chart',
  templateUrl: './donut-chart.component.html',
  styleUrls: ['./donut-chart.component.scss']
})
export class DonutChartComponent implements AfterViewInit {

  private _items: number[] = [];
  private _processedItems: any[] = [];

  unset = false;

  @Input()
  get items(): number[] {
    return this._items;
  }

  set items(value: number[]) {
    this._items = value;

    if (!this._items.length || this._items.every(item => item === 0)) {
      this._unsetData();
    } else {
      this._processData();
    }
  }

  @Input()
  animate = true;

  constructor(private _elementRef: ElementRef, private _renderer: Renderer2) {
  }

  ngAfterViewInit() {

    if (this.animate) {
      this._renderer.addClass(this._elementRef.nativeElement, 'animate');
    }

    setTimeout(() => {
      this._renderer.addClass(this._elementRef.nativeElement, 'active');
    }, 500);
  }

  private _processData() {

    const total = this._items.reduce((sum, a) => sum + Math.max((a || 0), 0));

    let startAngle = 0;

    this._processedItems = this._items.map(item => {

      const percentage = (Math.max(item, 0) * 100) / total;
      const endAngle = 360 * (percentage / 100);

      let tmpObject = {
        startAngle: Math.floor(startAngle),
        endAngle: Math.floor(endAngle + startAngle)
      };

      startAngle += endAngle;

      return tmpObject;
    });
  }

  private _unsetData() {
    this.unset = true;
    this._items = [0];
    this._processedItems = [{
      startAngle: 0,
      endAngle: 360
    }];
  }

  private _polarToCartesian(centerX: number, centerY: number, radius: number, angle: number): any {

    const angleInRadians = (angle - 180) * Math.PI / 180;

    return {
      x: centerX + (radius * Math.cos(angleInRadians)),
      y: centerY + (radius * Math.sin(angleInRadians))
    };
  }

  private _describeArc(x: number, y: number, radius: number, startAngle: number, endAngle: number): string {

    switch (true) {

      // 0 length arc but we needed for the CSS nth-of-type
      case startAngle === endAngle:
        return '';

      // Full circle
      case startAngle === 0 && endAngle === 360:
        return `M${x}, ${y}m${-radius}, 0a${radius}, ${radius} 0 1, 0 ${radius * 2}, 0a${radius}, ${radius} 0 1, 0 ${-radius * 2}, 0`;

      default:
        const start = this._polarToCartesian(x, y, radius, endAngle);
        const end = this._polarToCartesian(x, y, radius, startAngle);
        const largeArcFlag = endAngle - startAngle <= 180 ? '0' : '1';

        return [
          'M', start.x, start.y,
          'A', radius, radius, 0, largeArcFlag, 0, end.x, end.y
        ].join(' ');
    }
  }

  getPath(index: number): string {
    return this._describeArc(50, 50, 40, this._processedItems[index].startAngle, this._processedItems[index].endAngle);
  }
}
