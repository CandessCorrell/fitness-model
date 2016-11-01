import React, { Component } from 'react';
import { Navbar, Nav } from 'react-bootstrap';
import Sidebar from 'react-sidebar';

// React router
import { Router, Route, Link } from 'react-router';

const TAG = "Header | ";

export default class Header extends Component {

    constructor(props) {
      super(props);
      this.state = {sidebarOpen: false, sidebarDocked: false};
      this.onSetSidebarOpen = this.onSetSidebarOpen.bind(this);
      this.componentWillMount = this.componentWillMount.bind(this);
    }

    componentWillMount() {
        var mql = window.matchMedia(`(min-width: 800px)`);
        mql.addListener(this.mediaQueryChanged);
        this.setState({mql: mql, sidebarDocked: mql.matches});
      }

      componentWillUnmount() {
        this.state.mql.removeListener(this.mediaQueryChanged);
      }

      mediaQueryChanged() {
        this.setState({sidebarDocked: this.state.mql.matches});
      }

    onSetSidebarOpen(open) {
      this.setState({sidebarOpen: open});
    }

  render() {

    var sidebarContent = <b>Sidebar content</b>;
    return (
      <div>
        <Sidebar sidebar={sidebarContent}
                 open={this.state.sidebarOpen}
                 children={<div> </div>}
                 onSetOpen={this.onSetSidebarOpen}
                 docked={this.state.sidebarDocked}>
        </Sidebar>
      </div>

    )
  }
}
