import React, { Component } from 'react';
import Header from '../containers/header';
import CategoriesList from '../containers/categories_list';

var TAG = "MainApp | "

export default class App extends Component {
  render(){
    return (
      <div>
        <Header />
        <CategoriesList />
        <div id="container">
          {this.props.children}
        </div>
      </div>
    )
  }
}
