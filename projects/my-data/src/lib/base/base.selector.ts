import { MemoizedSelector } from '@ngrx/store';

export interface BaseSelector {
  getFeatureState: MemoizedSelector<object, any>;
}
