import React, { Component } from 'react';
import ReactDOM from 'react-dom';

var TAG = "MainApp | ";

export default class App extends Component {

  render(){
    return (
      <div>
        {this.props.children}
      </div>
    );
  }
}
