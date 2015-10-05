import Core from 'icd-10-cm-core/dist/bundle';
import * as RootConstants from '../constants/RootConstants';

export function loadRoot() {
  return {
    type: RootConstants.DATA_LOADED,
    root: Core.root
  }
}