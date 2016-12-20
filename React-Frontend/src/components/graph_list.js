import React, { Component } from 'react';
import GraphListItem from './graph_list_item';

export default class GraphList extends Component {

  constructor(props) {
    super(props);
    this.renderGraphListItems = this.renderGraphListItems.bind(this);
  }

  render() {
    return (
      this.renderGraphListItems()
    )
  }

  renderGraphListItems() {
    return (
      <ul className="graph-list">
        <GraphListItem category={1} score={10} fl1={10} fl2={20} fl3={30} />
        <GraphListItem category={2} score={20} fl1={10} fl2={20} fl3={30} />
        <GraphListItem category={3} score={30} fl1={10} fl2={20} fl3={30} />
      </ul>
    )
  }
}
