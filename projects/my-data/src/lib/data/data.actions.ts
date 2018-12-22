import { Action } from '@ngrx/store';

export enum ApiDataActionTypes {
  UpsertApiData = '[ApiData] Upsert Data',
  DeleteApiData = '[ApiData] Delete Data',
  ClearApiDatas = '[ApiData] Clear All Data',
  ClearApiData = '[ApiData] Clear Data'
}

export class UpsertData implements Action {
  readonly type = ApiDataActionTypes.UpsertApiData;

  constructor(public payload: { key: string; data: any }) {}
}

export class DeleteData implements Action {
  readonly type = ApiDataActionTypes.DeleteApiData;

  constructor(public payload: { id: string }) {}
}

export class ClearAllData implements Action {
  readonly type = ApiDataActionTypes.ClearApiDatas;
}

export class ClearData implements Action {
  readonly type = ApiDataActionTypes.ClearApiData;

  constructor(public payload: { key: string }) {}
}

export type DataActions = UpsertData | DeleteData | ClearAllData | ClearData;
