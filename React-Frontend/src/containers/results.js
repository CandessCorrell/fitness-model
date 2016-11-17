import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';
import { fetchScores } from '../actions/index';
import RecommendationsList from '../components/recommendations_list';
import Header from '../components/header';
import Sidebar from '../components/sidebar';

class Results extends Component {
	renderPrevious() {
		return (
			<Link to={"/category/3"} className="category-link">
				<button type="button" className="btn btn-primary prev-button">PREV</button>
			</Link>
		);
	}
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

			<div>
				<div className= "gray-band-container">
					<Header className="gray-band" />
				</div>
				<div className="container">
					<div className="row">
						<div className="col-md-2" style={{height: 500, width: 200}}>
							<Sidebar />
						</div>
						<div className="col-md-8">
							<div className="results-container">
								<h1 className="results-title">
									Results - Maturity Level Assessment
								</h1>
								<img src="../assets/graph.png" />

								{ this.renderRecommendations }
							</div>
							<div className="footer-buttons">
								{this.renderPrevious()}
							</div>
						</div>
						<div className="col-md-2">
							<Link to="/" className="col-md-2 category-logo-container">
								<img src="../assets/final-logo-01.png" className="category-logo" />
							</Link>
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
