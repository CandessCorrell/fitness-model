import React, { Component } from 'react';
import Sidebar from './sidebar';
import ReactDOM from 'react-dom';

var TAG = "MainApp | "

export default class App extends Component {

  render(){
    return (
      <div>
        {this.props.children}
      </div>
    )
  }
}

const bgColors = { "Default": "#81b71a",
                    "Blue": "#00B1E1",
                    "Cyan": "#37BC9B",
                    "Green": "#8CC152",
                    "Red": "#E9573F",
                    "Yellow": "#F6BB42",
                    "Orange": "#E29C6E"
};
