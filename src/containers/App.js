import React from 'react';

import { Header } from '../components/';

export default class App extends React.Component {

  constructor(props, context) {
    super(props, context);
  }

  render() {
    return (
      <div>
        <Header />
        {this.props.children}
      </div>
    );
  }
}