import Core from 'icd-10-cm-core/dist/bundle';
import _ from 'lodash';
import * as ICDConstants from '../constants/ICDConstants';

/**
 * Load ICD-10-CM json data.
 * @return {dispatch}
 */
export function loadRepo(root) {
  return (dispatch) => {
    Core.setAccident(root).then(() => {
      dispatch({
        type: ICDConstants.DATA_UPDATE,
        icd: Core,
      });
    });
  };
}

/**
 * Filter condition.
 * @param  {string} [key]   Name of condition.
 * @param  {any} [value]  Value of condition.
 * @return {dispatch}
 */
export function filter(key, value) {
  return (dispatch) => {
    const functionName = 'set' + _.capitalize(key);
    const func = Core[functionName];
    if (typeof func === 'function') {
      func.call(Core, value);
    }

    return dispatch({
      type:ICDConstants.DATA_UPDATE,
      icd: Core,
    });
  };
}

/**
 * Undo the filter.
 * @param  {string} [key] Name of condition.
 * @return {dispatch}
 */
export function undo(key) {
  Core.undo(key);
  return {
    type: ICDConstants.DATA_UPDATE,
    icd: Core
  };
}

/**
 * Reset filter.
 * @return {dispatch}
 */
export function reset() {
  Core.reset();
  return {
    type: ICDConstants.DATA_UPDATE,
    icd: Core
  }
}