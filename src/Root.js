import React from 'react';
import { Provider } from 'react-redux';
import { ReduxRouter } from 'redux-router';

import configureStore from './store/configureStore';
import { renderDevTools } from './utils/devTools';

const store = configureStore();
export default class Root extends React.Component {
  render() {
    return (
      <div>
        <Provider store={store}>
          <ReduxRouter>
          </ReduxRouter>
        </Provider>
        {
          renderDevTools(store)
        }
      </div>
    );
  }
}
