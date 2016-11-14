import React, { Component } from 'react';
import { Link } from 'react-router';

import { Button } from 'react-bootstrap';

const TAG = "Home | ";

export default class Home extends Component {

  render(){
    return (
      <div>
        <h2 style={styles.header}></h2>
        <div style={styles.container} width='800px'>
          <div className="row" style={styles.inner}>
            <div style={styles.inner.right} className="col-md-6">
              <img src='../../assets/final-logo.png' />
            </div>
            <div style={styles.inner.left} className="col-md-3">
              <Button style={styles.buttonStyle}>Setup a New Project Profile</Button> <br />
              <Button style={styles.buttonStyle}>Begin a New Project Assessment</Button> <br />
              <Link to={"/category/1"} style={styles.buttonStyle}>
                <button type="button" style={styles.buttonStyle}> Update a Current Project Assessment </button> <br />
              </Link>
              <Button style={styles.buttonStyle}>Results</Button> <br />
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
    shadowColor: '#efefef',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 1,
    marginLeft: 5,
    marginRight: 5,
    marginTop: 5
  },
  header: {
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
