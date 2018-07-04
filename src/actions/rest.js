import { headers, processStatus } from 'grommet/utils/Rest';

export const LOAD_DATA_START = 'LOAD_DATA_START';
export const LOAD_DATA_SUCCESS = 'LOAD_DATA_SUCCESS';
export const LOAD_DATA_FAILURE = 'LOAD_DATA_FAILURE';
export const UNLOAD_DATA = 'UNLOAD_DATA';

export const WATCH_DATA_START = 'WATCH_DATA_START';
export const UPDATE_DATA_SUCCESS = 'UPDATE_DATA_SUCCESS';
export const UPDATE_DATA_FAILURE = 'UPDATE_DATA_FAILURE';
export const WATCH_DATA_STOP = 'WATCH_DATA_STOP';

let watchTimer;

export function loadDataSuccess(result) {
  return { type: LOAD_DATA_SUCCESS, result };
}

export function loadDataFailure(error) {
  return { type: LOAD_DATA_FAILURE, error };
}

export function loadData() {
  return function a(dispatch) {
    dispatch({ type: LOAD_DATA_START });

    const options = { method: 'GET', headers };

    fetch('/rest/api/key', options)
      .then(processStatus)
      .then(response => response.json())
      .then(result => dispatch(loadDataSuccess(result)))
      .catch(error => dispatch(loadDataFailure(error)));
  };
}

export function unloadData() {
  return { type: UNLOAD_DATA };
}

export function updateDataSuccess(result) {
  return { type: UPDATE_DATA_SUCCESS, result };
}

export function updateDataFailure(error) {
  return { type: UPDATE_DATA_FAILURE, error };
}

export function watchData() {
  return function a(dispatch) {
    dispatch({ type: WATCH_DATA_START });

    watchTimer = setInterval(() => {
      const options = { method: 'GET', headers };

      fetch('/rest/api/cpu', options)
        .then(processStatus)
        .then(response => response.json())
        .then(result => dispatch(updateDataSuccess(result)))
        .catch(error => dispatch(updateDataFailure(error)));
    }, 2000);
  };
}

export function unwatchData() {
  return function a(dispatch) {
    dispatch({ type: WATCH_DATA_STOP });

    clearInterval(watchTimer);
  };
}
