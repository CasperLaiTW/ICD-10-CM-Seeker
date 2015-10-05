import React from 'react';
import { connect } from 'react-redux';

import { loadRoot } from '../actions/RootActions';
import { Seeker } from '../components/';

class Home extends React.Component {

  constructor(props, context) {
    super(props, context);
  }

  componentWillMount() {
    this.props.loadRoot();
  }

  render() {
    return (
      <div>
        <Seeker />
      </div>
    );
  }
}

export default connect((state) => ({root: state.root}), { loadRoot })(Home);