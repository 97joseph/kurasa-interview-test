import { Injectable } from '@angular/core';
import { LocalStorageService } from 'src/app/core/local-storage.service';
import { ILayout } from '../models/layouts';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LayoutService {

  private _layout: BehaviorSubject<ILayout> = new BehaviorSubject<ILayout>('list');
  private layoutKey = 'layout';

  public layout$ = this._layout.asObservable();

  constructor(private localStore: LocalStorageService) {
    this._layout.next(this.getLayout());
  }

  getLayout(): ILayout {
    return this.localStore.getItem(this.layoutKey) ?? 'list';
  }

  setLayout(layout: ILayout) {
    this._layout.next(layout);
    this.localStore.setItem(this.layoutKey, layout);
  }
}
