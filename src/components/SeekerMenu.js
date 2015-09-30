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
    bsStyle: PropTypes.string,
  }

  constructor(props, context) {
    super(props, context);
    const list = this.props.list.sortBy(v => !v.enabled);
    const {items, disabled} = this._getListState(list);
    this.state = {
      list: list,
      menu: items,
      value: undefined,
      current: undefined,
      disabled: disabled,
    };
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.list !== undefined) {
      const list = nextProps.list.sortBy(v => !v.enabled);
      const {items, disabled} = this._getListState(list);
      this.setState({
        list: list,
        menu: items,
        disabled: disabled,
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
        bsStyle={this.props.bsStyle ? this.props.bsStyle : 'default'}
      >
        {this._wrapper()}
      </Panel>
    );
  }

  /**
   * Reset filter.
   * @return {void}
   */
  reset() {
    this.setState({
      value: undefined,
      current: undefined,
    });
  }

  /**
   * Filter item wrapper.
   * @return {ReactDOM}
   */
  _wrapper() {
    const { current } = this.state;
    const { menu, disabled } = this.state;
    if (_.isEmpty(current)) {
      return (<List
          items={menu}
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

  /**
   * Get filter items' state.
   * @return {Object} Include item name and item's enable or disable.
   */
  _getListState(list) {
    let items = [];
    let disabledIndex = [];
    let disabled = [];
    _.each(list.toObject(), (value, key) => {
      if (!value.enabled) {
        disabled.push(value.name);
      } else {
        items.push(value.name);
      }
    });
    disabledIndex = _.range(items.length, items.length + disabled.length);
    return {items: items.concat(disabled), disabled: disabledIndex};
  }

  /**
   * Handle reset filter
   * @return {void}
   */
  _handleReset() {
    this.reset();
    this.props.undo(this.props.filterKey);
  }

  /**
   * Handle list on change
   * @param  {integer} [select] The list selected index.
   * @return {void}
   */
  _onChange(select) {
    const { filterKey, filter } = this.props;
    const { menu, list } = this.state;
    // console.log(list);
    const current = list.find((v) => v.name === menu[select]);
    const value = list.findKey((v) => v.name === menu[select]);
    this.setState({
      value: value,
      current: current,
    });
    filter(filterKey, value);
  }
}