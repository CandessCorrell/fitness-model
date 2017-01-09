import React, { Component } from 'react';

// React router
import { Router, Route, Link } from 'react-router';

const TAG = "Header | ";

export default class Header extends Component {

  render() {

    return (
      <div className="gray-band">
        <span>
          <Link to="/" className="gray-band-link">
            <h3 className="gray-band-header"> Home </h3>
          </Link>
        </span>
        <span>
          <h3 className="gray-band-header"> | </h3>
        </span>
        <span>
          <Link to="/assessments" className="gray-band-link">
            <h3 className="gray-band-header"> Assessments </h3>
          </Link>
        </span>
      </div>
    )
  }
}
