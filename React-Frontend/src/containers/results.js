import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';
import { fetchResults } from '../actions/index';
import RecommendationsList from '../components/recommendations_list';
import Header from '../components/header';
import Sidebar from '../components/sidebar';

class Results extends Component {

	componentDidMount() {
		this.props.fetchResults(this.props.params.id);
	}

	renderPrevious() {
		return (
			<Link to={"/category/3"} className="category-link">
				<button type="button" className="btn btn-primary prev-button">PREV</button>
			</Link>
		);
	}

	renderScores() {
		if (this.props.params.oldid != this.props.params.id) {
			this.props.params.oldid = this.props.params.id;
			this.props.fetchResults(this.props.params.id);
		}
	}

	renderRecommendations() {
		console.log("made it 1");
		var recommendation_category = "";
		console.log("recommendation_category: ", recommendation_category);
		var recommendation_category_array = [];
		var recommendation_category_iterator = -1;
		this.props.results.map((result) => {
			console.log(result);
			if (result.category == recommendation_category) {
				if (result.recommendation != null) {
					recommendation_category_array[recommendation_category_iterator].recommendation = recommendation_category_array[recommendation_category_iterator].recommendation + " " + result.recommendation;
				}
			}
			else {
				if (result.recommendation != null) {
					recommendation_category_iterator++;
					recommendation_category = result.category;
					recommendation_category_array.push(result);
				}
				console.log(recommendation_category_array);
			}
		});

		recommendation_category_array.map((recommendation) => {
			console.log(recommendation);
			return ;
		});
	}

	render() {
		const { results } = this.props;

		console.log("started it");

		if ( !results ) {
			this.props.params.oldid = this.props.params.id;
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

								{ console.log("almost made it") }
								{ console.log(results) }
								{ console.log(results[0].category) }
								{ console.log(results[0].recommendation) }

								{ this.renderRecommendations() }

								{ console.log("passed it") }

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
	return { results: state.result.results };
}

export default connect(mapStateToProps, { fetchResults })(Results);
