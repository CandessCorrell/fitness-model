import React, { Component } from 'react';
import Header from '../containers/header';
import Home from './home';
// Bootstrap buttons
// import { ButtonToolbar } from 'react-bootstrap';
// import { Button } from 'react-bootstrap';

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
