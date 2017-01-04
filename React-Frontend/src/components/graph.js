import React, { Component } from 'react';
import GraphList from './GraphList';
import GraphLegend from './GraphList'

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
