import { InjectionToken } from '@angular/core';

export const RESOURCE_REDUCER_FACTORY = new InjectionToken(
  '@dotrez/data resource reducer factory'
);
export const RESOURCE_FEATURE_NAME = new InjectionToken(
  '@dotrez/data resource feature name'
);

export const API_DATA_REDUCER_FACTORY = new InjectionToken(
  '@dotrez/data apiData reducer factory'
);

export const API_DATA_FEATURE_NAME = new InjectionToken<string>(
  '@dotrez/data api data feature name'
);

export const API_STORE_REDUCER_FACTORY = new InjectionToken(
  '@dotrez/data apiStore reducer factory'
);

export const API_STORE_FEATURE_NAME = new InjectionToken<string>(
  '@dotrez/data apiStore feature name'
);
