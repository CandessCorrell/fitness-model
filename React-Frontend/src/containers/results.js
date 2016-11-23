import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';
import { fetchResults } from '../actions/index';
import RecommendationsListItem from '../components/recommendations_list_item';
import Header from '../components/header';
import Sidebar from '../components/sidebar';
import GraphLegend from '../components/graph_legend';

class Results extends Component {

	componentDidMount() {
		this.props.fetchResults(this.props.params.id);
	}

	renderPrevious() {
		return (
			<Link to={"/category/3"} className="prev-next-button">
				PREV
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
		// console.log("made it 1");
		var recommendation_category = "";
		// console.log("recommendation_category: ", recommendation_category);
		var recommendation_category_array = [];
		var recommendation_category_iterator = -1;
		this.props.results.map((result) => {
			// console.log(result);
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
				// console.log(recommendation_category_array);
			}
		});
		var recommendation_level = 0;
		return recommendation_category_array.map((recommendation) => {
			console.log(JSON.stringify(recommendation));
			// console.log(recommendation);
			recommendation_level++;
			return (
				<RecommendationsListItem
					fitness_level={recommendation_level}
					category={recommendation.category}
					recommendation={recommendation.recommendation}
				/>
			)
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
							<Sidebar activeCategory='Results'/>
						</div>
						<div className="col-md-8">
							<div className="result-container">
								<h1 className="category-title">
									Results
								</h1>
								<img className="graph" src="../assets/graph.png" />
								<GraphLegend className="graph-legend" />
								<div className="recommendations-list">
									{ this.renderRecommendations() }
								</div>

								{ console.log("passed it") }

							</div>
							<div className="footer-buttons">
								{this.renderPrevious()}
							</div>
						</div>
							<Link to="/" className="col-md-2 category-logo-container">
								<img src="../assets/final-logo-01.png" className="category-logo" />
							</Link>
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
