import React, { Component } from 'react';
import { Link } from 'react-router';
import CategoriesList from '../containers/CategoriesList';

export default class Sidebar extends Component {

  render() {
    return (
      <div className="sidebar">
        <CategoriesList
          titles={this.props.titles}
          activeCategory={this.props.activeCategory}
        />
      </div>
    )
  }
}
