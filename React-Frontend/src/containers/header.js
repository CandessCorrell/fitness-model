import React, { Component } from 'react';
import { MenuItem, NavDropdown, NavItem, Navbar, Nav } from 'react-bootstrap';

// React router
import { Router, Route, Link } from 'react-router';

const TAG = "Header | ";

export default class Header extends Component {

  // <NavDropdown eventKey={3} title="Dropdown" id="basic-nav-dropdown">
  //   <MenuItem eventKey={3.1}>Action</MenuItem>
  //   <MenuItem eventKey={3.2}>Another action</MenuItem>
  //   <MenuItem eventKey={3.3}>Something else here</MenuItem>
  //   <MenuItem divider />
  //   <MenuItem eventKey={3.3}>Separated link</MenuItem>
  // </NavDropdown>


  render() {
    console.log("Rendering Header");
    return (
    <div>
      <Navbar inverse>
        <Navbar.Header>
          <Navbar.Brand>
            <Link to="/"> Home </Link>
          </Navbar.Brand>
          <Navbar.Toggle />
        </Navbar.Header>
        <Navbar.Collapse>
          {this.renderNavBar()}
        </Navbar.Collapse>
      </Navbar>
    </div>
    )
  }

  renderNavBar() {
    return (
      <Nav>
        <li><Link to="/">A Link</Link></li>
        <NavDropdown eventKey={3} title="Dropdown" id="basic-nav-dropdown">
          <MenuItem eventKey={3.1}>Action</MenuItem>
          <MenuItem eventKey={3.2}>Another action</MenuItem>
          <MenuItem eventKey={3.3}>Something else here</MenuItem>
          <MenuItem divider />
          <MenuItem eventKey={3.3}>Separated link</MenuItem>
        </NavDropdown>
      </Nav>
    )
  }
}
