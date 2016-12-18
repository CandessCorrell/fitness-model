import React, { Component } from 'react';
import { connect } from 'react-redux';
import { login } from '../actions/index';

import { Router, Route, Link } from 'react-router';

const TAG = "Login | ";

class Login extends Component {

  	constructor(props) {
  		super(props);
  		this.state = {
  			user_id: null,
        team_name: null,
        loggedIn: false
  		};
      this.onLoginClick = this.onLoginClick.bind(this);
      this.toggleLogin = this.toggleLogin.bind(this);
  	}

  render() {
    console.log('Render called!');
    const { team_name, user_id } = this.props;
    return (
      <div className={this.toggleLogin()}>
        <div>Hello World!</div>
        <input type="text" placeholder="Username" />
        <input type="password" placeholder="Password" /> <br />
        <button onClick={this.onLoginClick} > Login! </button>
        <button onClick={this.onLoginClick} > Register! </button>
      </div>
    );
  }

  toggleLogin() {
    if (this.state.loggedIn) {
      return "not-logged-in-container"
    } else return "logged-in-container"
  }

  onLoginClick() {
    // console.log(TAG, 'this.props.team_name:', this.props.team_name);
    console.log(TAG, 'localStorage.loggedInLocalStorage before flip:', localStorage.getItem('loggedInLocalStorage'));
    localStorage.setItem('loggedInLocalStorage', 'true');
    console.log(TAG, 'localStorage.loggedInLocalStorage after flip:', localStorage.getItem('loggedInLocalStorage'));
    if (this.state.loggedIn) this.setState({loggedIn: false});
    else this.setState({loggedIn: true});
    return this.props.login('DIDIT', 'insanelysecurepassword');
  }
}

function mapStateToProps(state) {
  return { team_name: state.login.team_name, user_id: state.login.user_id, isLoggedIn: state.login.isLoggedIn };
}

export default connect(mapStateToProps, { login })(Login);
