import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchScores } from '../actions/index';
import RecommendationsList from '../components/recommendations_list';
import Sidebar from '../components/sidebar'

// React router
import { Router, Route, Link } from 'react-router';

class Results extends Component {

	componentDidMount() {
		this.props.fetchScores(this.props.params.id);
	}

	renderScores() {
		this.props.fetchScores(this.props.params.id);
	}

	render() {
		const { scores } = this.props;

		if ( !scores ) {
			return <div>Loading...</div>;
		}

		this.renderScores();

		return (
			<div className="container">
				<div className="row">
					<div className="col-md-3">
						<Sidebar style={{height: 500, width: 200}}/>
					</div>
					<div className="col-md-9">
						<div className="results-container">
							<h1 className="results-title">
								Results - Maturity Level Assessment
							</h1>

							{ this.renderGraph }

							{ this.renderRecommendations }

						</div>
					</div>
				</div>
			</div>
		);
	}
}

function mapStateToProps(state) {
	return { scores: state.result.scores };
}

export default connect(mapStateToProps, { fetchScores })(Results);