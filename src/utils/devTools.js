import React from 'react';

/**
 * Render dev tools
 * @param  {Stroe} [store]
 * @return {ReactDOM|null}
 */
export function renderDevTools(store) {
  if (__DEV__) {
    const { DevTools, DebugPanel, LogMonitor } = require('redux-devtools/lib/react');
    return (
      <DebugPanel top right bottom>
        <DevTools store={store} monitor={LogMonitor} />
      </DebugPanel>
    );
  }

  return null;
}