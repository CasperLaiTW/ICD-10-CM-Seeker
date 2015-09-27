import React, { PropTypes } from 'react';
import { Grid, Row, Col } from 'react-bootstrap';
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
  }

  _wrapperMenu() {
    const { menus, dispatch } = this.props;
    const filter = bindActionCreators(ICDActions.filter, dispatch);
    const items = [
      {
        key: 'medical',
        label: '就醫情況',
      },
      {
        key: 'pedestrian',
        label: '當事人（傷者）用路型態',
      },
      {
        key: 'pedestrianDetail',
        label: '當事人（傷者）用路型態細分',
      },
      {
        key: 'perpetrator',
        label: '對方用路型態',
      },
      {
        key: 'accidentType',
        label: '事故類型',
      }
    ];
    const wrapper = _.map(items, (item, key) => {
      return (
        <Col key={key}>
          <SeekerMenu
            key={item.key}
            filterKey={item.key}
            label={item.label}
            list={menus.get(item.key)}
            filter={filter}
          />
        </Col>
      );
    });
    return wrapper;
  }

  render() {
    const { menus } = this.props;
    return (
      <Grid>
        <Row>
          <Col lg={4} style={this._getStyles().menuContainer}>
            {this._wrapperMenu()}
          </Col>
          <Col lg={8} style={this._getStyles().resultContainer}>
            <SeekerResult
              result={this.props.ICD}
            />
          </Col>
        </Row>
      </Grid>
    );
  }

  _getStyles() {
    return {
      menuContainer: {
        height: 'calc(100vh - 75px)',
        overflow: 'auto',
      },
      resultContainer: {
        height: 'calc(100vh - 75px)',
        overflow: 'auto',
      }
    }
  }
}

export default connect((state) => ({menus: state.menus, ICD:state.ICD}))(Seeker);