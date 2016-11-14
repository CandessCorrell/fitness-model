import React, { Component } from 'react';
import Sidebar from 'react-side-bar';
import ReactDOM from 'react-dom';

var TAG = "MainApp | "

export default class App extends Component {

  render(){
    return (
      <div>
        <div>
          <Sidebar {... sidebarProps} style={{backgroundColor: bgColors.Green, height: 500, width: 200}}/>
        </div>
        <div id="container">
          {this.props.children}
        </div>
      </div>
    )
  }
}

const sidebarProps = {
    bar: (<div>Amazing Sidebar</div>),
    opened: true,
    onClose: () => {
        setState({ opened: false })
    },
    onOpen: () => {
        setState({ opened: true })
    },
    size: 200
};

const bgColors = { "Default": "#81b71a",
                    "Blue": "#00B1E1",
                    "Cyan": "#37BC9B",
                    "Green": "#8CC152",
                    "Red": "#E9573F",
                    "Yellow": "#F6BB42",
};
