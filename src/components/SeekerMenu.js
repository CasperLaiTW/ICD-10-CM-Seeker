import React, { PropTypes } from 'react';
import List from 'react-list-select';
import _ from 'lodash';
import { Panel, Button, Row, Col } from 'react-bootstrap';

import '../styles/react-list-select.scss';

export default class SeekerMenu extends React.Component {

  static propTypes = {
    label: PropTypes.string.isRequired,
    list: PropTypes.object,
    filter: PropTypes.func.isRequired,
    undo: PropTypes.func.isRequired,
    filterKey: PropTypes.string.isRequired,
  }

  constructor(props, context) {
    super(props, context);
    this.state = {
      list: this.props.list,
      value: undefined,
      current: undefined,
    };
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.list !== undefined) {
      this.setState({
        list: nextProps.list.sortBy(v => !v.enabled),
      });
    }
  }

  render() {
    let { label } = this.props;
    let { list } = this.state;
    if (list === undefined) {
      return null;
    }

    return (
      <Panel
        header={label}
      >
        {this._wrapper()}
      </Panel>
    );
  }

  reset() {
    this.setState({
      value: undefined,
      current: undefined,
    });
  }

  _wrapper() {
    const { current } = this.state;
    const { items, disabled } = this._getListState();
    if (_.isEmpty(current)) {
      return (<List
          items={items}
          disabled={disabled}
          onChange={this._onChange.bind(this)}
        />
      );
    }

    return (
      <Row>
        <Col lg={8}>
          <span>{this.state.current.name}</span>
        </Col>
        <Col lg={2}>
          <Button onClick={this._handleReset.bind(this)}>重設項目</Button>
        </Col>
      </Row>
    );
  }

  _getListState() {
    const { list } = this.state;
    let items = [];
    let disabled = [];
    list.forEach((value, key) => {
      items.push(value.name);
      if (!value.enabled) {
        disabled.push(items.length - 1);
      }
    });
    return {items: items, disabled: disabled};
  }

  _handleReset() {
    this.reset();
    this.props.undo(this.props.filterKey);
  }

  _onChange(select) {
    const { filterKey, filter } = this.props;
    const { list } = this.state;
    const current = list.skip(select).take(1).toObject();
    const value = _.first(_.keys(current));
    this.setState({
      value: value,
      current: current[value],
    });
    filter(filterKey, value);
  }
}