import React, { Component } from 'react';
import GraphList from './graph_list';
import GraphLegend from './graph_legend'

export default class Graph extends Component {
  render() {
    return (
      <div className="graph-container">
        <GraphList scores={this.props.scores}/>
        <GraphLegend className="graph-legend" />
      </div>
    )
  }
}
