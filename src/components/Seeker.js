import React, { PropTypes } from 'react';
import ReactDOM from 'react-dom';
import { Grid, Row, Col, Button } from 'react-bootstrap';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import _ from 'lodash';

import SeekerMenu from './SeekerMenu';
import SeekerResult from './SeekerResult';

import * as ICDActions from '../actions/ICDActions';

class Seeker extends React.Component {

  static propTypes = {
    menus: PropTypes.object.isRequired,
    ICD: PropTypes.object.isRequired
  }

  constructor(props, context) {
    super(props, context);
    this._menus = [];
  }

  render() {
    const { menus } = this.props;
    return (
      <Grid>
        <Row>
          <Col lg={4}>
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
            <SeekerResult
              result={this.props.ICD}
            />
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
        height: 'calc(100vh - 150px)',
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

  /**
   * Menu wrapper.
   * @return {array} Array of menus component.
   */
  _wrapperMenu() {
    const { menus, dispatch } = this.props;
    const actionCreators = bindActionCreators(ICDActions, dispatch);
    const items = [
      {
        key: 'medical',
        label: '就醫情況',
        bsStyle: 'primary',
      },
      {
        key: 'pedestrian',
        label: '當事人（傷者）用路型態',
        bsStyle: 'success',
      },
      {
        key: 'pedestrianDetail',
        label: '當事人（傷者）用路型態細分',
        bsStyle: 'info',
      },
      {
        key: 'perpetrator',
        label: '對方用路型態',
        bsStyle: 'warning',
      },
      {
        key: 'accidentType',
        label: '事故類型',
        bsStyle: 'danger',
      }
    ];
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

export default connect((state) => ({menus: state.menus, ICD:state.ICD}))(Seeker);