import * as ICDConstants from '../constants/ICDConstants';
import * as MenuConstants from '../constants/MenuConstants';

/**
 * Wrap ICD-10-CM data to menu and data reduces.
 * @param  {Store} [store]
 * @return {next}
 */
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