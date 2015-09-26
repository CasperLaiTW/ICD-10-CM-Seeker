import React, { PropTypes } from 'react';

export default class Seeker extends React.Component {

  static propTypes = {
    menus: PropTypes.object.isRequired,
    ICD: PropTypes.object.isRequired
  }

  constructor(props, context) {
    super(props, context);
  }

  render() {
    return (
      <div>
        
      </div>
    );
  }
}
