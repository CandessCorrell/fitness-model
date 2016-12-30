import React, { Component } from 'react'
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux'
import { fetchAssessments, selectAssessment, postAssessment, ROOT_URL } from '../actions/index';
import { Link } from 'react-router';
import axios from 'axios';

class Assessments extends Component {

  componentWillMount() {
		this.props.fetchAssessments(this.props.login.user_id);
  }

  addAssessment() {
    axios.get(`${ROOT_URL}versions`)
    .then((response) => {
      let latest = 0.0;
      let latest_id = null;
      response.data.rows.map((data) => {
        let current = parseFloat(data.version);
        if (current > latest) {
          latest = current;
          latest_id = data.version_id;
        }
      })
      this.props.postAssessment(this.props.login.user_id, latest_id);
	  })
	  .catch((error) => {
		  console.log(error);
	  });
  }

  renderNewAssessment(assessments) {
      let inProgress = false;
      for (var i in assessments) {
        if (assessments[i].end_time == null) {
            inProgress = true;
        }
      }
      if (!inProgress) { // Hide the Add new Assessment Link if there is one in progress
          return (
            <Link to={"/category/1"} className="home-screen-button" onClick={() => this.addAssessment()}>Begin a New Project Assessment</Link>
          )
      }
  }

  renderAssessment(data) {
      let text,css,loc = '';
      if (data.end_time != null) {
          text = "See Assessment Results";
          css = "complete";
          loc = `/results/${data.assessment_id}`;
      } else {
          text = "Continue Assessment";
          css = "incomplete"
          loc = "/category/1"
      }
      return (
          <div key={data.assessment_id}>
              <Link to={loc} className={`home-screen-button ${css}`} onClick={() => this.props.selectAssessment(data.assessment_id)}>Assessment #{data.assessment_id}, Version #{data.version_id}<br/>{text}</Link>
          </div>
      )
    }

    render () {
        let assessments = [];
        if (this.props.assessments.assessments) {
            assessments = this.props.assessments.assessments;
        }
        return (
            <div>
                <div className="home-container">
                    <div className="row">
                        <div className="col-md-6 home-logo-container">
                            <img className="home-logo" src='../../assets/final-logo.png' />
                        </div>
                        <div className="col-md-3 home-screen-button-container">
                            <p>Assessments for { this.props.login.team_name }</p>
                            { assessments.map(this.renderAssessment, this) }
                            { this.renderNewAssessment(assessments) }
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

function mapStateToProps(state) {
	return { assessments: state.assessments, login: state.login };
}

export default connect(mapStateToProps, { fetchAssessments,selectAssessment,postAssessment })(Assessments);
