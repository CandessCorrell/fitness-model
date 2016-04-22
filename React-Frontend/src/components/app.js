import React, { Component } from 'react';
import Header from '../containers/header';

var TAG = "MainApp | "

export default class App extends Component {
  render(){
    return (
      <div>
        <Header />
        <div id="container">
          {this.props.children}
        </div>
      </div>
    )
  }
}
