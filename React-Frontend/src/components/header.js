import React, { Component } from 'react';
import { Navbar, Nav } from 'react-bootstrap';

// React router
import { Router, Route, Link } from 'react-router';

const TAG = "Header | ";

export default class Header extends Component {

  render() {

    return (
      <div className="container gray-band">
        <div className="row">
          <Link to="/" className="col-md-2 gray-band-link">
            <h3 className="gray-band-header"> Home | Team A </h3>
          </Link>
        </div>
      </div>
    )
  }
}
