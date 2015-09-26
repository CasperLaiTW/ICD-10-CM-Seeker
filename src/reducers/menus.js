import { Map } from 'immutable';
import * as MenuConstants from '../constants/MenuConstants';

let defaultState = Map();

export default function(state = defaultState, action) {
  switch (action.type) {
    case MenuConstants.DATA_UPDATE:
      return action.data;
    default:
      return state;
  }
}