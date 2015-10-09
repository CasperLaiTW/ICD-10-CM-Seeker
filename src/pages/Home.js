import React from 'react';
import { connect } from 'react-redux';
import Spinkit from "react-spinkit";

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
        {this._wrapperLoading()}
      </div>
    );
  }

  _wrapperLoading() {
    if (this.props.app.loading) {
      return (
        <div style={{width: '100%', position: 'fixed', height: '100%', backgroundColor: 'rgba(245, 245, 245, .8)', top: 0, zIndex: 99 }}>
          <div style={{position: 'absolute' ,top: '50%', left: '50%'}}>
            <Spinkit spinnerName='three-bounce' />
            <h4 style={{margin: '1em 0 0 -2.5em'}}>資料讀取中，請稍後</h4>
          </div>
        </div>
      );
    }
    return null;
  }
}

export default connect((state) => ({app: state.app}), { loadRoot }, null, {pure: false})(Home);