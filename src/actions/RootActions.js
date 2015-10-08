import Core from 'icd-10-cm-core/dist/bundle';
import * as RootConstants from '../constants/RootConstants';

export function loadRoot() {
  return (dispatch) => {
    Core.getRoot().then(json => {
      dispatch({
        type: RootConstants.DATA_LOADED,
        data: json,
      });
    });
  }
}