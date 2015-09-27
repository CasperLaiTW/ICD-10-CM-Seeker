import { ICDTen } from 'icd-10-cm-core';
import _ from 'lodash';
import * as ICDConstants from '../constants/ICDConstants';

export function loadRepo() {
  return {
    type: ICDConstants.DATA_UPDATE,
    icd: ICDTen
  };
}

export function filter(key, value) {
  const functionName = 'set' + _.capitalize(key);
  const func = ICDTen[functionName];
  if (typeof func === 'function') func.call(ICDTen, value);

  return {
    type:ICDConstants.DATA_UPDATE,
    icd: ICDTen,
  };
}

export function undo(key) {
  ICDTen.undo(key);
  return {
    type: ICDConstants.DATA_UPDATE,
    icd: ICDTen
  };
}