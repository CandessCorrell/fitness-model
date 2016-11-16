import React, { Component } from 'react';
import { Link } from 'react-router';

const TAG = "Home | ";

export default class Home extends Component {

  render(){
    return (
      <div>
        <div className="home-container" width='800px'>
          <div className="row">
            <div className="col-md-6">
              <img src='../../assets/final-logo.png' />
            </div>
            <div className="col-md-3">
              <Link to={"/category/1"} className="home-screen-button">Setup a New Project Profile</Link> <br />
              <Link to={"/category/1"} className="home-screen-button">Begin a New Project Assessment</Link> <br />
              <Link to={"/category/1"} className="home-screen-button">
                Update a Current Project Assessment
              </Link> <br />
              <Link to={"/category/1"} className="home-screen-button">Results</Link> <br />
            </div>
          </div>
        </div>
      </div>
    )
  }
}
