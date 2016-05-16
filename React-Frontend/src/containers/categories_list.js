import React, { Component } from 'react';

// React router
import { Router, Route, Link } from 'react-router';

const TAG = "Categories_list | ";

export default class CategoriesList extends Component {

  render() {
    return (
    <div className="categories-list">
      <Link to="/category/1" className="category-link">
        <button type="button" className="btn btn-primary category-button">Portfolio Mgmt</button>
      </Link>
      <Link to="/category/2" className="category-link">
        <button type="button" className="btn btn-primary category-button">Requirements Mgmt</button>
      </Link>
      <Link to="/category/3" className="category-link">
        <button type="button" className="btn btn-primary category-button">Development</button>
      </Link>
      <Link to="/category/4" className="category-link">
        <button type="button" className="btn btn-primary category-button">Build</button>
      </Link>
      <Link to="/category/Environments and Deployment" className="category-link">
        <button type="button" className="btn btn-primary category-button">Environments & Deployment</button>
      </Link>
      <Link to="/category/Release Management" className="category-link">
        <button type="button" className="btn btn-primary category-button">Release Mgmt</button>
      </Link>
      <Link to="/category/Operations" className="category-link">
        <button type="button" className="btn btn-primary category-button">Operations</button>
      </Link>
      <Link to="/category/Configuration Management" className="category-link">
        <button type="button" className="btn btn-primary category-button">Configuration Mgmt</button>
      </Link>
      <Link to="/category/Data Management" className="category-link">
        <button type="button" className="btn btn-primary category-button">Data Mgmt</button>
      </Link>
      <Link to="/category/Testing" className="category-link">
        <button type="button" className="btn btn-primary category-button">Testing</button>
      </Link>
      <Link to="/category/Security" className="category-link">
        <button type="button" className="btn btn-primary category-button">Security</button>
      </Link>
      <Link to="/category/PM" className="category-link">
        <button type="button" className="btn btn-primary category-button">Project Mgmt</button>
      </Link>
      <Link to="/category/IT Admin" className="category-link">
        <button type="button" className="btn btn-primary category-button">IT Admin</button>
      </Link>
      <Link to="/category/Ranking" className="category-link">
        <button type="button" className="btn btn-primary category-button">Ranking</button>
      </Link>
      <Link to="/category/Results" className="category-link">
        <button type="button" className="btn btn-primary category-button">Results</button>
      </Link>
      
    </div>
    )
  }
}