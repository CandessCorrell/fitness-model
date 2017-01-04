import React, { Component } from 'react';

class GraphLegend extends Component {
  render() {
    return (
      <table>
        <tbody>
          <tr>
            <td className="legend-level-1">
              Level 1
            </td>
            <td className="legend-level-2">
              Level 2
            </td>
            <td className="legend-level-3">
              Level 3
            </td>
          </tr>
          <tr>
            <td className="legend-level-1">
              <img  src="../assets/level-1.png"/>
            </td>
            <td className="legend-level-2">
              <img  src="../assets/level-2.png"/>
            </td>
            <td className="legend-level-3">
              <img  src="../assets/level-3.png"/>
            </td>
          </tr>
        </tbody>
      </table>
    )
  }
}
 export default GraphLegend;
