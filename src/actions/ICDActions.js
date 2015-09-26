import { ICDTen } from 'icd-10-cm-core';
import * as ICDConstants from '../constants/ICDConstants';
import * as MenuConstants from '../constants/MenuConstants';

export function loadRepo() {
  return {
    type: ICDConstants.DATA_UPDATE,
    icd: ICDTen
  };
}
