import React, { Component } from 'react';

export default class GraphListItem extends Component {
  render() {
    return (
      <li className="graph-list-item">
        <h3 className="graph-list-item-header"> Category {this.props.category} </h3>
        <div className="graph-list-item-span">
          <span className="graph-list-item-fitness-level-1" />
          <span className="graph-list-item-fitness-level-2" />
          <span className="graph-list-item-fitness-level-3" />
        </div>
      </li>
    )
  }
}
