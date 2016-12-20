import React, { Component } from 'react';
import GraphList from './graph_list';

export default class Graph extends Component {
  render() {
    return (
      <div className="graph-container">
        <GraphList />
      </div>
    )
  }
}
