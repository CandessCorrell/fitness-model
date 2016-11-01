import React, { Component } from 'react';
import Header from '../components/header';
import CategoriesList from '../containers/categories_list';
import Sidebar from '../components/sidebar.js';

var TAG = "MainApp | "

export default class App extends Component {
  render(){
    return (
      <div>
        <Header />
        {/*<Sidebar />*/}
        <CategoriesList />
        <div id="container">
          {this.props.children}
        </div>
      </div>
    )
  }
}
