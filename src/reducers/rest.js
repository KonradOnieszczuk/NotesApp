import {
  LOAD_DATA_START, LOAD_DATA_SUCCESS, LOAD_DATA_FAILURE, UNLOAD_DATA,
  WATCH_DATA_START, UPDATE_DATA_SUCCESS, UPDATE_DATA_FAILURE, WATCH_DATA_STOP,
} from '../actions/rest';

export const DATA_INIT = 0;
export const DATA_REQUESTED = 1;
export const DATA_RECEIVED = 2;


const initialState = {
  data: undefined,
  dataStatus: DATA_INIT,
  error: undefined,
  watching: false,
  watchData: undefined,
};

export default function nav(state = initialState, action) {
  switch (action.type) {
    case LOAD_DATA_START:
      return { ...state, data: undefined, dataStatus: DATA_REQUESTED, error: undefined };

    case LOAD_DATA_SUCCESS:
      return { ...state, data: action.result, dataStatus: DATA_RECEIVED, error: undefined };

    case LOAD_DATA_FAILURE:
      return { ...state, data: undefined, dataStatus: DATA_INIT, error: action.error };

    case UNLOAD_DATA:
      return { ...state, data: undefined, dataStatus: DATA_INIT, error: undefined };

    case WATCH_DATA_START:
      return { ...state, watchData: undefined, watching: true };

    case UPDATE_DATA_SUCCESS:
      return { ...state, watchData: action.result, watching: true };

    case UPDATE_DATA_FAILURE:
      return { ...state, watching: true, error: action.error };

    case WATCH_DATA_STOP:
      return { ...state, watchData: undefined, watching: false };

    default:
      return state;
  }
}
