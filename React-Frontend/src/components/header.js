import React, { Component } from 'react';
import { Navbar, Nav } from 'react-bootstrap';

// React router
import { Router, Route, Link } from 'react-router';

const TAG = "Header | ";

export default class Header extends Component {

  render() {

    return (
      <div className="navbar-header">
        <Navbar inverse>
          <Navbar.Header>
            <Navbar.Brand>
              <Link to="/"> DevOps Fitness Self Assessment </Link>
            </Navbar.Brand>
            <Navbar.Toggle />
          </Navbar.Header>
        </Navbar>
      </div>

    )
  }
}
