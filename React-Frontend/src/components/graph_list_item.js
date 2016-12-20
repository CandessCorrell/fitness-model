import React, { Component } from 'react';

export default class GraphListItem extends Component {
  render() {
    return (
      <li className="graph-list-item"> Category {this.props.category} </li>
    )
  }
}
