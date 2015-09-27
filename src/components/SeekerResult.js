import React, { PropTypes } from 'react';
import { Table, Panel } from 'react-bootstrap'

export default class SeekerResult extends React.Component {

  static propTypes = {
    result: PropTypes.object.isRequired
  }

  constructor(props, context) {
    super(props, context);
  }

  render() {
    return (
      <Panel header="搜尋結果" eventKey="1">
        <Table striped condensed hover responsive>
          <thead>
            <tr>
              <th>Code</th>
              <th>名稱</th>
              <th>當事人(傷者)用路型態</th>
              <th>當事人(傷者)用路型態細分</th>
              <th>對方用路型態</th>
              <th>事故類型</th>
              <th>就醫情況</th>
            </tr>
          </thead>
          <tbody>
            {this._wrapper()}
          </tbody>
        </Table>
      </Panel>
    );
  }

  _wrapper() {
    const { result } = this.props;
    let tbody = [];
    tbody = result.map((value, key) => {
      return (
        <tr key={key}>
          <td>{value.code}</td>
          <td>{value.content}</td>
          <td>{value.pedestrian}</td>
          <td>{value.pedestrianDetail}</td>
          <td>{value.perpetrator}</td>
          <td>{value.accidentType}</td>
          <td>{value.medical}</td>
        </tr>
      );
    })
    return tbody;
  }
}
