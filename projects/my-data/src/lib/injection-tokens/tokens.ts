import { InjectionToken } from '@angular/core';
import { MetaReducer, Action } from '@ngrx/store';

export const ROOT_META_REDUCERS = new InjectionToken<
  MetaReducer<any, Action>[]
>('data root meta reducers');

export const RESOURCE_REDUCER_FACTORY = new InjectionToken(
  'reducer factory'
);

export const RESOURCE_FEATURE_NAME = new InjectionToken(
  'data resource feature name'
);

export const API_DATA_REDUCER_FACTORY = new InjectionToken(
  'data apiData reducer factory'
);

export const API_DATA_FEATURE_NAME = new InjectionToken<string>(
  'data api data feature name'
);

export const API_STORE_REDUCER_FACTORY = new InjectionToken(
  'data apiStore reducer factory'
);

export const API_STORE_FEATURE_NAME = new InjectionToken<string>(
  'data apiStore feature name'
);

export const DATA_LOCAL_STORAGE_AUTO_SYNC_FEATURES = new InjectionToken<
  string[]
>('data local storage auto sync features');

export const TOKEN_FEATURE_NAME = new InjectionToken<string>(
  'data token feature name'
);
