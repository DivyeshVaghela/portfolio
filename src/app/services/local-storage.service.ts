import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LocalStorageService {

  constructor() { }

  set(key: string, value: Object | Array<Object | string> | string) {
    let valueToStore = null;
    if (typeof value === "object"){
      valueToStore = JSON.stringify(value);
    } else {
      valueToStore = value;
    }
    localStorage.setItem(key, valueToStore);
  }

  get(key: string, asJSON: boolean = true): Object | Array<Object | string> | string {
    let value = localStorage.getItem(key);
    if (asJSON){
      value = JSON.parse(value);
    }
    return value;
  }
}
