import React, { PropTypes } from 'react';
import List from 'react-list-select';
import _ from 'lodash';
import { Panel } from 'react-bootstrap';
import { Map } from 'immutable';

import '../styles/react-list-select.scss';

export default class SeekerMenu extends React.Component {

  static propTypes = {
    label: PropTypes.string.isRequired,
    list: PropTypes.object,
    filter: PropTypes.func.isRequired,
  }

  constructor(props, context) {
    super(props, context);
    this.state = {
      list: this.props.list
    };
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      list: nextProps.list.sortBy(v => !v.enabled),
    });
  }

  _onChange(select) {
    const { filterKey, filter } = this.props;
    const { list } = this.state;
    const value = _.first(_.keys(list.skip(select).take(1).toObject()));
    filter(filterKey, value);
  }

  render() {
    let { label } = this.props;
    let { list } = this.state;
    if (list === undefined) {
      return null;
    }

    let items = [];
    let disabled = [];
    list.forEach((value, key) => {
      items.push(value.name);
      if (!value.enabled) {
        disabled.push(items.length - 1);
      }
    });

    return (
      <Panel header={label}>
        <List
          items={items}
          disabled={disabled}
          onChange={this._onChange.bind(this)}
        />
      </Panel>
    );
  }
}