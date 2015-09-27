import React, { PropTypes } from 'react';
import { Grid, Row, Col } from 'react-bootstrap';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import _ from 'lodash';

import SeekerMenu from './SeekerMenu';

import * as ICDActions from '../actions/ICDActions';

class Seeker extends React.Component {

  static propTypes = {
    menus: PropTypes.object.isRequired,
    ICD: PropTypes.object.isRequired
  }

  constructor(props, context) {
    super(props, context);
  }

  wrapperMenu() {
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
        <Col xs={12} md={6} lg={2} key={key}>
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
          {this.wrapperMenu()}
        </Row>
      </Grid>
    );
  }
}

export default connect((state) => ({menus: state.menus, ICD:state.ICD}))(Seeker);