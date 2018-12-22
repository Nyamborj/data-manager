import { NgModule, Inject } from '@angular/core';
import { ReducerManager } from '@ngrx/store';

import {
  API_DATA_REDUCER_FACTORY,
  API_DATA_FEATURE_NAME
} from '../injection-tokens/tokens';
import { apiDataReducerFactory } from './data.reducer';


@NgModule({
  providers: [
    {
      provide: API_DATA_REDUCER_FACTORY,
      useFactory: apiDataReducerFactory
    },
    {
      provide: API_DATA_FEATURE_NAME,
      useValue: 'sample.data'
    }
  ]
})
export class DataModule {
  constructor(
    protected reducerManager: ReducerManager,
    @Inject(API_DATA_REDUCER_FACTORY) protected reducerFactory: any,
    @Inject(API_DATA_FEATURE_NAME) protected reducerName: string
  ) {
    reducerManager.addFeature({
      key: reducerName,
      reducerFactory: null,
      reducers: reducerFactory
    });
  }
}
