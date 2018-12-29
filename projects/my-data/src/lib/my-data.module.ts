import { NgModule, ModuleWithProviders } from '@angular/core';
import { MetaReducer, META_REDUCERS, StoreModule } from '@ngrx/store';
import { localStorageSync } from 'ngrx-store-localstorage';

import { MyDataComponent } from './my-data.component';
import { DataModule } from './data/index';
import {
  ROOT_META_REDUCERS,
  DATA_LOCAL_STORAGE_AUTO_SYNC_FEATURES,
  API_DATA_FEATURE_NAME,
  RESOURCE_FEATURE_NAME,
  TOKEN_FEATURE_NAME,
  API_STORE_FEATURE_NAME
} from './injection-tokens';

export function localStorageMetaReducer(
  keys: string[],
  rootMetaReducers: MetaReducer<any>[]
): MetaReducer<any>[] {
  return [
    localStorageSync({ keys, rehydrate: true, restoreDates: false }),
    ...rootMetaReducers
  ];
}

export function localStorageSyncFactory(...params: string[]): string[] {
  return params;
}

@NgModule({
  imports: [
    StoreModule.forRoot({}),
    DataModule
  ],
  declarations: [MyDataComponent],
  exports: [MyDataComponent],
  providers: [
    {
      provide: DATA_LOCAL_STORAGE_AUTO_SYNC_FEATURES,
      deps: [
        API_DATA_FEATURE_NAME,
        RESOURCE_FEATURE_NAME,
        TOKEN_FEATURE_NAME,
        API_STORE_FEATURE_NAME
      ],
      useFactory: localStorageSyncFactory
    },
    {
      provide: API_STORE_FEATURE_NAME,
      useValue: 'test.store'
    },
    {
      provide: TOKEN_FEATURE_NAME,
      useValue: 'test.token'
    },
    {
      provide: RESOURCE_FEATURE_NAME,
      useValue: 'test.resources'
    }
  ]
})
export class MyDataModule {
  public static withMetaReducers(
    rootMetaReducers: MetaReducer<any>[]
  ): ModuleWithProviders {
    return {
      ngModule: MyDataModule,
      providers: [
        {
          provide: META_REDUCERS,
          deps: [DATA_LOCAL_STORAGE_AUTO_SYNC_FEATURES, ROOT_META_REDUCERS],
          useFactory: localStorageMetaReducer
        },
        {
          provide: ROOT_META_REDUCERS,
          useValue: rootMetaReducers || []
        }
      ]
    };
  }
}
