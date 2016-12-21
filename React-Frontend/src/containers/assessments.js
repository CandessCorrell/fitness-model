import React, { Component } from 'react'
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux'
import { fetchAssessments, selectAssessment } from '../actions/index';
import { Link } from 'react-router';


class Assessments extends Component {

  componentWillMount() {
		this.props.fetchAssessments(this.props.login.user_id);
  }

  renderAssessment(data) {
      return (
          <div key={data.assessment_id}>
              <Link to={"/results/" + data.assessment_id} className="home-screen-button" onClick={() => this.props.selectAssessment(data.assessment_id)}>Assessment #{data.assessment_id}, Version #{data.version_id}</Link>
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

export default connect(mapStateToProps, { fetchAssessments,selectAssessment })(Assessments);
