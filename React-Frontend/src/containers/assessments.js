import React, { Component } from 'react'
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux'
import { fetchAssessments } from '../actions/index';

class Assessments extends Component {

    componentWillMount() {
        //TODO: Wire this up to login stuff
		this.props.fetchAssessments("2"); 
	}

    render () {
        console.log(this.props);
        return (
            <div>
                <div className="home-container">
                    <div className="row">
                        <div className="col-md-6 home-logo-container">
                            <img className="home-logo" src='../../assets/final-logo.png' />
                        </div>
                        <div className="col-md-3 home-screen-button-container">
                            <p>Assessments for Username (TODO: We storing username of some kind?  Do Assessments have names?)</p>
                            <ul>
                                <li><a href="#">Assessment 1</a></li> 
                                <li><a href="#">Assessment 2</a></li>
                                <li><a href="#">Assessment 3</a></li>                            
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

function mapStateToProps(state) {
	return { assessments: state.assessments };
}

export default connect(mapStateToProps, { fetchAssessments })(Assessments);

