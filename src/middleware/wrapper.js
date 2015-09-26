import * as ICDConstants from '../constants/ICDConstants';
import * as MenuConstants from '../constants/MenuConstants';

export default store => next => action => {
  if (action.type === ICDConstants.DATA_UPDATE ) {
    store.dispatch({
      type: MenuConstants.DATA_UPDATE,
      data: action.icd.getConditionState(),
    });
    return next({
      type: ICDConstants.DATA_UPDATE,
      data: action.icd.result(),
    });
  }
  return next(action);
}