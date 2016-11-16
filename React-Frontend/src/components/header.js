import React, { Component } from 'react';
import { Navbar, Nav } from 'react-bootstrap';

// React router
import { Router, Route, Link } from 'react-router';

const TAG = "Header | ";

export default class Header extends Component {

  render() {

    return (
      <div className="gray-band">
        <h3 className="gray-band"> Team A </h3>
      </div>

    )
  }
}
