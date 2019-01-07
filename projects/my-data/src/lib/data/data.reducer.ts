import { EntityState, EntityAdapter, createEntityAdapter } from '@ngrx/entity';
import { Data } from './data.model';
import { DataActions, ApiDataActionTypes } from './data.actions';

export interface ApiDataFeatureState extends EntityState<Data> {
  // additional entities state properties
}

export const apiDataAdapter: EntityAdapter<Data> = createEntityAdapter<Data>();

export const ApiDataInitialState: ApiDataFeatureState = apiDataAdapter.getInitialState(
  {
    // additional entity state properties
  }
);

export function apiDataReducerFactory(): (state: ApiDataFeatureState, action: DataActions) => ApiDataFeatureState {
  return (
    state = ApiDataInitialState,
    action: DataActions
  ): ApiDataFeatureState => {
    switch (action.type) {
      case ApiDataActionTypes.UpsertApiData: {
        return apiDataAdapter.upsertOne(
          { id: action.payload.key, value: action.payload.data },
          state
        );
      }

      case ApiDataActionTypes.DeleteApiData: {
        return apiDataAdapter.removeOne(action.payload.id, state);
      }

      case ApiDataActionTypes.ClearApiDatas: {
        return apiDataAdapter.removeAll(state);
      }

      case ApiDataActionTypes.ClearApiData: {
        return apiDataAdapter.removeOne(action.payload.key, state);
      }

      default: {
        return state;
      }
    }
  };
}
