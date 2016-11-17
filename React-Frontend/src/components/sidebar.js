import React, { Component } from 'react';
import { Link } from 'react-router';
import CategoriesList from '../containers/categories_list';

export default class Sidebar extends Component {

  render() {
    return (
      <div className="sidebar">
        <CategoriesList />
      </div>
    )
  }
}
