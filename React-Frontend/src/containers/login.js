import React, { Component } from 'react';
import { connect } from 'react-redux';
import { login, register } from '../actions/index';

import { Router, Route, Link } from 'react-router';

const TAG = "Login | ";

class Login extends Component {

  	constructor(props) {
  		super(props);
  		this.state = {
  			team_name: null,
        password: null
  		};
      this.handleLoginClick = this.handleLoginClick.bind(this);
      this.handleTeamName = this.handleTeamName.bind(this);
      this.handlePassword = this.handlePassword.bind(this);
      this.handleRegisterClick = this.handleRegisterClick.bind(this);
  	}

  render() {
    console.log('Render called!');
    const { team_name, user_id } = this.props;
    return (
      <div className="logged-in-container">
        {/*<form onSubmit={this.handleLoginClick}>*/}
          <input type="text" onChange={this.handleTeamName} placeholder="Username" value={this.state.team_name}/> <br />
          <input type="password" onChange={this.handlePassword} placeholder="Password" value={this.state.password}/> <br />
          <button onClick={this.handleLoginClick}> Login! </button>
          <button onClick={this.handleRegisterClick} > Register! </button>
        {/*</form>*/}
      </div>
    );
  }

  handleRegisterClick() {
    return this.props.register(this.state.team_name, this.state.password);
  }

  handleTeamName(event) {
    this.setState({ team_name:event.target.value })
  }

  handlePassword(event) {
    this.setState({ password:event.target.value })
  }

  handleLoginClick() {
    return this.props.login(this.state.team_name, this.state.password);
  }
}

function mapStateToProps(state) {
  return { team_name: state.login.team_name, user_id: state.login.user_id, isLoggedIn: state.login.isLoggedIn };
}

export default connect(mapStateToProps, { login, register })(Login);
