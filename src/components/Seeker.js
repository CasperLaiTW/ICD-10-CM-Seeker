import React, { PropTypes } from 'react';
import ReactDOM from 'react-dom';
import { Grid, Row, Col, Button, Panel } from 'react-bootstrap';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import _ from 'lodash';

import SeekerMenu from './SeekerMenu';
import SeekerResult from './SeekerResult';

import * as ICDActions from '../actions/ICDActions';

class Seeker extends React.Component {

  static propTypes = {
    menus: PropTypes.object.isRequired,
    ICD: PropTypes.object.isRequired,
  }

  constructor(props, context) {
    super(props, context);
    this._menus = [];
    this.state = {
      root: undefined
    };
  }

  _onRootChange(e) {
    const { value } = e.target;
    this.setState({
      root: value,
    });
    this.props.dispatch(ICDActions.loadRepo(value));
  }

  render() {
    return (
      <Grid>
        <Row>
          <Col lg={4}>
            <Row>
              <Panel
                header="選擇傷害分類"
              >
                <select value={this.state.root} onChange={this._onRootChange.bind(this)}>
                  <option value="">請選擇</option>
                  {_.map(this.props.root, ((value, key) => <option key={key} value={key}>{key}</option>))}
                </select>
              </Panel>
            </Row>
            <Row style={this._getStyles().resetContainer}>
              <Button onClick={this._resetAll.bind(this)}>
                重設全部項目
              </Button>
            </Row>
            <Row style={this._getStyles().menuContainer}>
              {this._wrapperMenu()}
            </Row>
          </Col>
          <Col lg={8}>
            {this._wrapperResult()}
          </Col>
        </Row>
      </Grid>
    );
  }

  /**
   * Get component styles.
   * @return {Object}
   */
  _getStyles() {
    return {
      menuContainer: {
        height: 'calc(100vh - 250px)',
        overflow: 'auto',
      },
      resetContainer: {
        marginBottom: '1em',
      },
    }
  }

  /**
   * Reset all filter.
   * @return {void}
   */
  _resetAll() {
    _.each(_.filter(this._menus, (menu) => menu !== null), (menu) => {
      menu.reset();
    });
    this.props.dispatch(ICDActions.reset());
  }

  /**
   * Callback of ref menu.
   * @param  {ReactDOM} [menu] Menu component.
   * @return {ReactDOM}
   */
  _refMenu(menu) {
    if (!_.includes(this._menus, menu)) {
      this._menus.push(menu);
    }
    return menu;
  }

  _wrapperResult() {
    const { menus, dispatch, menuLists } = this.props;
    if (_.isEmpty(menuLists) || this.props.ICD.size === 0) {
      return null;
    }

    return (
      <SeekerResult
        result={this.props.ICD}
        menuLists={menuLists}
      />
    );
  }

  /**
   * Menu wrapper.
   * @return {array} Array of menus component.
   */
  _wrapperMenu() {
    const { menus, dispatch, menuLists } = this.props;
    const actionCreators = bindActionCreators(ICDActions, dispatch);
    if (menus.isEmpty()) {
      return null;
    }
    const colors = [
      'primary',
      'success',
      'info',
      'warning',
      'danger',
    ];
    let index = -1;
    const items = _.map(menuLists, (value, key) => {
      index++;
      return {
        key: key,
        label: value,
        bsStyle: colors[index % 5]
      };
    }).reverse();
    const wrapper = _.map(items, (item, key) => {
      return (
        <Col key={key}>
          <SeekerMenu
            ref={this._refMenu.bind(this)}
            key={item.key}
            filterKey={item.key}
            label={item.label}
            list={menus.get(item.key)}
            bsStyle={item.bsStyle}
            {...actionCreators}
          />
        </Col>
      );
    });
    return wrapper;
  }
}

export default connect((state) => ({menus: state.menus, ICD:state.ICD, root: state.root, menuLists: state.menuLists}))(Seeker);