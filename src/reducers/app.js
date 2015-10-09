import * as AppConstants from '../constants/AppConstants';

let defaultState = {
  loading: false
};

export default function(state = defaultState, action) {
  switch (action.type) {
    case AppConstants.APP_LOADING:
      return _.assign(state, {loading: true})
    case AppConstants.APP_LOADED:
    default:
      return _.assign(state, {loading: false});
  }
}