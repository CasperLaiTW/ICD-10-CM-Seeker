import React from 'react';
import { connect } from 'react-redux';

import { loadRepo } from '../actions/ICDActions';
import { Seeker } from '../components/';

class Home extends React.Component {

  constructor(props, context) {
    super(props, context);
  }

  componentWillMount() {
    this.props.loadRepo();
  }

  render() {
    const { menus, ICD } = this.props;
    return (
      <div>
        <Seeker />
      </div>
    );
  }
}

export default connect((state) => ({menus: state.menus, ICD:state.ICD}), { loadRepo })(Home);