import { Map } from 'immutable';
import * as FilterConstants from '../constants/FilterConstants';

let defaultState = Map();

export default function(state = defaultState, action) {
  switch (action.type) {
    case FilterConstants.DATA_UPDATE:
      return state;
    default:
      return state;
  }
}