import React, { Component } from 'react';
import { Link } from 'react-router';
import { connect } from 'react-redux';
import { Button } from 'react-bootstrap';
import Login from '../containers/login';
import { logout,ROOT_URL,postAssessment } from '../actions/index';
import axios from 'axios';


const TAG = "Home | ";

class Home extends Component {

  addAssessment() {
    console.log(this.props);
    axios.get(`${ROOT_URL}versions`)
    .then((response) => {
      let latest = 0.0;
      let latest_id = null;
      response.data.rows.map(function(data) {
        let current = parseFloat(data.version);
        if (current > latest) {
          latest = current;
          latest_id = data.version_id;
        }
      })
      this.props.postAssessment(this.props.user_id, latest_id);
	  })
	  .catch((error) => {
		  console.log(error);
	  });

  }

  checkLoggedIn() {
    console.log()
    if (this.props.isLoggedIn == 'true') {
      return (
        <div className="col-md-3 home-screen-button-container">
          {/*<Link to={"/category/1"} className="home-screen-button">Setup a New Project Profile</Link> <br />*/}
          <Link to={"/category/1"} className="home-screen-button" onClick={() => this.addAssessment()}>Begin a New Project Assessment</Link> <br />
          {/*<Link to={"/category/1"} className="home-screen-button">Update a Current Project Assessment</Link> <br />*/}
          {/*<Link to={"/results/1"} className="home-screen-button">Results</Link> <br /> <br />*/}
          <Link to={"/assessments"} className="home-screen-button">View Past Assessments</Link> <br />
          <button onClick={this.props.logout}> Logout! </button>
        </div>
      )
    }
    else {
      return (

      <div className="col-md-3 home-screen-button-container">
        <Login />
      </div>
      )
    }
  }

  render(){
    return (
      <div>
        <div className="home-container">
          <div className="row">
            <div className="col-md-6 home-logo-container">
              <img className="home-logo" src='../../assets/final-logo.png' />
            </div>
            {/*<div className="col-md-3 home-screen-button-container">
              <Link to={"/category/1"} className="home-screen-button">Setup a New Project Profile</Link> <br />
              <Link to={"/category/1"} className="home-screen-button">Begin a New Project Assessment</Link> <br />
              <Link to={"/category/1"} className="home-screen-button">Update a Current Project Assessment</Link> <br />
              <Link to={"/results/1"} className="home-screen-button">Results</Link> <br /> <br />
              <Link to={"/category/1"} className="home-screen-link">View Past Assessments</Link> <br />
            </div>*/}
            {this.checkLoggedIn()}
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

function mapStateToProps(state) {
  return { isLoggedIn: state.login.isLoggedIn, user_id: state.login.user_id, selected: state.assessments.selected };
}

export default connect(mapStateToProps, { logout,postAssessment })(Home);
