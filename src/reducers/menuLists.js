import { Map } from 'immutable';
import * as MenuConstants from '../constants/MenuConstants';

let defaultState = {};

export default function(state = defaultState, action) {
  switch (action.type) {
    case MenuConstants.DATA_UPDATE:
      return action.menusList;
    default:
      return state;
  }
}