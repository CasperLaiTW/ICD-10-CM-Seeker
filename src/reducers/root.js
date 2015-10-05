import * as RootConstants from '../constants/RootConstants';

let defaultState = {};

export default function(state = defaultState, action) {
  switch (action.type) {
    case RootConstants.DATA_LOADED:
      return action.data === undefined ? state : action.data;
    default:
      return state;
  }
}