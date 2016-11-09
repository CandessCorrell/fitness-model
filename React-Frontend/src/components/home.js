import React, { Component } from 'react';

import { Button } from 'react-bootstrap';

const TAG = "Home | ";

export default class Home extends Component {

  render(){
    return (
      <div>
        <h2 style={styles.header}>Fitness Model Home Page</h2>
        <div style={styles.container} width='800px'>
          <div className="row" style={styles.inner}>
            <div style={styles.inner.right} className="col-md-6">
              <img src='../../assets/final-logo.png' />
            </div>
            <div style={styles.inner.left} className="col-md-3">
              <Button style={styles.buttonStyle}>Create a New Assessment</Button> <br />
              <Button style={styles.buttonStyle}>Update an Existing Assessment</Button> <br />
              <Button style={styles.buttonStyle}>View Archived Assessments</Button> <br />
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
    borderColor: '#000',
    shadowColor: '#000',
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
    width: 250
  },
  inner: {
    left: {
      marginLeft: 20,
      marginTop: 170,
      marginBottom: 100,
      textAlign: 'left'
    },
    right: {
      marginTop: 100,
      marginBottom: 100,
      textAlign: 'right'
    }
  }
}
