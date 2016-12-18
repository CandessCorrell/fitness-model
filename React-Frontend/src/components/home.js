import React, { Component } from 'react';
import { Link } from 'react-router';
import Login from '../containers/login';

import { Button } from 'react-bootstrap';

const TAG = "Home | ";

export default class Home extends Component {

  render(){
    return (
      <div>
        <div className="home-container">
          <div className="row">
            <div className="col-md-6 home-logo-container">
              <img className="home-logo" src='../../assets/final-logo.png' />
            </div>
            <div className="col-md-3 home-screen-button-container">
              <Login />
            </div>
          </div>
        </div>
      </div>
    )
  }
}

const styles = {
  container: {
    textAlign: 'center',
    borderWidth:1,
    borderRadius: 2,
    borderStyle: 'solid',
    borderOpacity: .1,
    borderColor: '#e0e0e0',
    borderRadius: '10',
    elevation: 1,
    marginLeft: 5,
    marginRight: 5,
    marginTop: 5
  },
  subHeader: {
    textAlign: 'center',
    fontSize: '16',
    borderColor: '#fff',
    borderBottom: 5
  },
  buttonStyle: {
    marginTop: 5,
    marginBottom: 5,
    width: 300,
    height: 70,
    fontFamily: 'ITC Franklin Gothic STD',
    fontSize: 12,
    fontStyle: 'book',
    color: '#707070',
    backgroundColor: '#f2f2f2',
    borderRadius: '10',
    transition: '.04'
  },
  inner: {
    left: {
      textAlign: 'center',
      marginLeft: 20,
      marginTop: 130,
      marginBottom: 100
    },
    right: {
      marginTop: 100,
      marginBottom: 100,
      textAlign: 'right'
    },
    hometext: {
      marginTop: 800,
      marginBottom: 100,
      fontFamily: 'ITC Franklin Gothic STD',
      fontSize: 12,
      color: '#707070',
      fontStyle: 'book',
      textAlign: 'center'
    }
  }
}
