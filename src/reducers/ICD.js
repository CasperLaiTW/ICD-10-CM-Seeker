import { Map } from 'immutable';
import * as ICDConstants from '../constants/ICDConstants';

let defaultState = Map();

export default function(state = defaultState, action) {
  switch (action.type) {
    case ICDConstants.DATA_UPDATE:
      return action.data;
    default:
      return state;
  }
}