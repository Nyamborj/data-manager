import { Injectable, Inject } from '@angular/core';
import {
  createFeatureSelector,
  createSelector,
  MemoizedSelector
} from '@ngrx/store';
import { Dictionary } from '@ngrx/entity/src/models';

import { API_DATA_FEATURE_NAME } from '../injection-tokens/tokens';
import { Data } from './data.model';
import { BaseSelector } from '../base/base.selector';
import { apiDataAdapter, ApiDataFeatureState } from './data.reducer';

@Injectable({
  providedIn: 'root'
})
export class DataSelectors implements BaseSelector {
  private _entitySelectors = apiDataAdapter.getSelectors();

  protected selectApiDataFeature = createFeatureSelector<ApiDataFeatureState>(
    this.apiDataFeatureName
  );

  public getFeatureState: MemoizedSelector<
    object,
    Dictionary<Data>
  > = createSelector(
    this.selectApiDataFeature,
    this._entitySelectors.selectEntities
  );

  public selectData = <T>(name: string) => {
    return createSelector(
      this.getFeatureState,
      entities => (entities[name] ? (entities[name].value as T) : undefined)
    );
    // tslint:disable-next-line:semicolon
  };

  constructor(
    @Inject(API_DATA_FEATURE_NAME) protected apiDataFeatureName: string
  ) {}
}
