import { AfterContentInit, Component, ElementRef, HostBinding, Input } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { IconCacheService } from './icon-cache.service';

@Component({
  selector: 'wfc-icon',
  template: '<ng-content></ng-content>',
  styleUrls: ['./icon.component.scss']
})
export class IconComponent implements AfterContentInit {

  @Input()
  icon: string;

  @HostBinding('class.icon')
  classIcon = true;

  @HostBinding('attr.role')
  roleImage = 'image';

  constructor(private _elementRef: ElementRef, private _http: HttpClient, private _iconCacheService: IconCacheService) {
  }

  ngAfterContentInit() {

    if (!this.icon) {
      return;
    }

    const cachedIcon = this._iconCacheService.getFromCache(this.icon);

    if (cachedIcon) {
      this._elementRef.nativeElement.innerHTML = cachedIcon;
      return;
    }

    this._http.get(`${environment.iconsBasePath}${this.icon}.svg`, { responseType: 'text' })
      .toPromise()
      .then(data => {
        this._elementRef.nativeElement.innerHTML = data;
        this._iconCacheService.addToCache(this.icon, data);
      })
      .catch(error => console.error(error));
  }
}
