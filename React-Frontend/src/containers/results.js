import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';
import { fetchRecommendations, fetchScores } from '../actions/index';
import RecommendationsListItem from '../components/RecommendationsListItem';
import Header from '../components/Header';
import Sidebar from '../components/Sidebar';
import GraphLegend from '../components/GraphLegend';
import Graph from '../components/Graph';

const TAG = 'RESULTS | ';

class Results extends Component {

	constructor(props) {
		super(props)
	}

	componentDidMount() {
		this.props.fetchRecommendations(this.props.selected);
		this.props.fetchScores(this.props.selected);
		console.log(TAG, 'componentDidMount & fetchRecommendations called.');
	}

	renderPrevious() {
		return (
			<Link to={"/category/3"} className="prev-next-button">
				PREV
			</Link>
		);
	}

	renderScores() {
		if (this.props.selected != this.props.selected) {
			this.props.fetchRecommendations(this.props.selected);
		}
	}

	renderRecommendations() {
		// console.log("made it 1");
		var recommendation_category = "";
		// console.log("recommendation_category: ", recommendation_category);
		var recommendation_category_array = [];
		var recommendation_category_iterator = -1;
		this.props.recommendations.map((result) => {
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
		if (recommendation_category_array[0] == null &&
		recommendation_category_array[1] == null &&
		recommendation_category_array[2] == null){
			return (<div> We have no more recommendations. The student has become the master. </div>)
		}
		else {
			return recommendation_category_array.map((recommendation) => {
			// console.log(JSON.stringify(recommendation));
			// console.log(recommendation);
			recommendation_level++;
			return (
				<RecommendationsListItem
					fitness_level={recommendation_level}
					category={recommendation.category}
					recommendation={recommendation.recommendation}
				/>
			)});
		}
	}

	render() {
		const { recommendations, scores } = this.props;

		// console.log("started it");
		// console.log(JSON.stringify(this.props));

		if ( !recommendations || !scores ) {
			this.props.params.oldid = this.props.params.id;
			return <div>Loading...</div>;
		}

		this.renderScores();

		return (

			<div>
				<div className= "gray-band-container">
					<Header className="gray-band" />
				</div>
				<div className="not-container">
					<div className="row">
						{/*<div className="col-md-2" style={{height: 500, width: 200}}>
							<Sidebar activeCategory='Results'/>
						</div>*/}
						<div className="col-md-8">
							<div className="result-container">
								<h1 className="results-title">
									Results
								</h1>
								<Graph scores={this.props.scores}/>
								{/*<img className="graph" src="../assets/graph.png" />*/}
								<div className="recommendations-list">
									<h2 className="results-subtitle"> Recommendations </h2>
									{ this.renderRecommendations() }
								</div>

								{/*{ console.log("passed it") }*/}

							</div>
							{/*<div className="footer-buttons">
								{this.renderPrevious()}
							</div>*/}
						</div>
						<Link to="/" className="col-md-2 category-logo-container">
							<img src="../assets/final-logo.png" className="category-logo" />
						</Link>
					</div>
				</div>
			</div>
		);
	}
}

function mapStateToProps(state) {
	return { recommendations: state.assessments.recommendations, selected: state.assessments.selected, scores: state.assessments.scores};
}

export default connect(mapStateToProps, { fetchRecommendations, fetchScores })(Results);
