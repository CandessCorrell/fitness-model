import React, { Component } from 'react';
const TAG = 'RecommendationListItem | '

export default class RecommendationsListItem extends Component {

	renderRecommendation() {
		console.log(TAG);
		return (
			<div className="recommendation-list-item">
				<h3 className="results-subtitle">
					{this.props.category}
				</h3>
				<img className="results-category-fitness-level" src={"../assets/level-"+this.props.fitness_level+".png"} />
				<p className="results-recommendations-body">
					{this.props.recommendation}
				</p>
			</div>
		);
	}

	render() {
		console.log(TAG, "Hello from render")
		return (
			<div>
				{this.renderRecommendation()}
			</div>
		);
	}
}
