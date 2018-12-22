import { Injectable } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { Observable } from 'rxjs';
import { Dictionary } from '@ngrx/entity/src/models';

import { DataSelectors } from './data.selectors';
import {
  UpsertData,
  DeleteData,
  ClearAllData,
  ClearData
} from './data.actions';
import { Data } from './data.model';
import { DataNames } from '../enums/data-names.enum';

@Injectable({
  providedIn: 'root'
})
export class DataManagerService {
  public readonly dataFeature$: Observable<Dictionary<Data>> = this.store.pipe(
    select(this.dataSelectors.getFeatureState)
  );

  constructor(
    protected store: Store<any>,
    protected dataSelectors: DataSelectors
  ) {}

  getData(type: DataNames): Observable<any> {
    return this.store.pipe(select(this.dataSelectors.selectData(type)));
  }

  upsertData(type: DataNames, data: any): void {
    this.store.dispatch(new UpsertData({ data, key: type }));
  }

  deleteData(type: DataNames): void {
    this.store.dispatch(new DeleteData({ id: type }));
  }

  clearAll(): void {
    this.store.dispatch(new ClearAllData());
  }

  clear(type: DataNames): void {
    this.store.dispatch(new ClearData({ key: type }));
  }
}
