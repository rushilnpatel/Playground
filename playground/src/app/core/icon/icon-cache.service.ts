import { Injectable } from '@angular/core';
import { IKeyValue } from '../models/data.types';

@Injectable({
  providedIn: 'root'
})
export class IconCacheService {

  cache: IKeyValue = {};

  addToCache(key: string, value: string) {
    this.cache[key] = value;
  }

  getFromCache(key: string) {
    return this.cache[key];
  }
}
