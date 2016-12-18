import React, { Component } from 'react';
import { connect } from 'react-redux';
import { login } from '../actions/index';

import { Router, Route, Link } from 'react-router';

const TAG = "Login | ";

class Login extends Component {

  	constructor(props) {
  		super(props);
  		this.state = {
  			team_name: null,
        password: null
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
        <input type="text" onChange={handleTeamName} placeholder="Username" value={this.state.team_name}/>
        <input type="password" placeholder="Password" value={this.state.password}/> <br />
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

  handleTeamName() {
    this.setState({ team_name:event.target.value })
  }

  handlePassword() {
    this.setState({ password:event.target.value })
  }

  onLoginClick() {
    return this.props.login(this.state.team_name, this.state.password);
  }
}

function mapStateToProps(state) {
  return { team_name: state.login.team_name, user_id: state.login.user_id };
}

export default connect(mapStateToProps, { login })(Login);
