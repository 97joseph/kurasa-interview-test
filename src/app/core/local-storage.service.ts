import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LocalStorageService {

  constructor() { }

  getItem(itemKey: string): any {
    const item = localStorage.getItem(itemKey);
    return item ? JSON.parse(item) : null;
  }

  setItem(itemKey: string, item: any) {
    localStorage.setItem(itemKey, JSON.stringify(item));
  }
}
