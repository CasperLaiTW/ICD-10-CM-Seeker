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
        <div style={this._getStyles().resultContainer}>
          <Table striped condensed hover responsive>
            <thead>
              <tr>
                <th>Code</th>
                <th>名稱</th>
                {_.map(this.props.menuLists, (value, key) => <th key={key}>{value}</th>)}
              </tr>
            </thead>
            <tbody>
              {this._wrapper()}
            </tbody>
          </Table>
        </div>
      </Panel>
    );
  }

  /**
   * Table content wrapper.
   * @return {array} ReactDOM of table content.
   */
  _wrapper() {
    const { result, menuLists } = this.props;
    let tbody = [];
    tbody = result.map((value, key) => {
      const _concat = _.map(menuLists, (m, k) => <td key={k}>{value[k]}</td>)
      return (
        <tr key={key}>
          <td>{value.code}</td>
          <td>{value.content}</td>
          {_concat}
        </tr>
      );
    })
    return tbody;
  }

  _getStyles() {
    return {
      resultContainer: {
        height: 'calc(100vh - 170px)',
        overflow: 'auto',
      }
    };
  }
}
