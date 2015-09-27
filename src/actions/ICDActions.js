import { ICDTen } from 'icd-10-cm-core';
import _ from 'lodash';
import * as ICDConstants from '../constants/ICDConstants';

/**
 * Load ICD-10-CM json data.
 * @return {dispatch}
 */
export function loadRepo() {
  return {
    type: ICDConstants.DATA_UPDATE,
    icd: ICDTen
  };
}

/**
 * Filter condition.
 * @param  {string} [key]   Name of condition.
 * @param  {any} [value]  Value of condition.
 * @return {dispatch}
 */
export function filter(key, value) {
  const functionName = 'set' + _.capitalize(key);
  const func = ICDTen[functionName];
  if (typeof func === 'function') func.call(ICDTen, value);

  return {
    type:ICDConstants.DATA_UPDATE,
    icd: ICDTen,
  };
}

/**
 * Undo the filter.
 * @param  {string} [key] Name of condition.
 * @return {dispatch}
 */
export function undo(key) {
  ICDTen.undo(key);
  return {
    type: ICDConstants.DATA_UPDATE,
    icd: ICDTen
  };
}

/**
 * Reset filter.
 * @return {dispatch}
 */
export function reset() {
  ICDTen.reset();
  return {
    type: ICDConstants.DATA_UPDATE,
    icd: ICDTen
  }
}