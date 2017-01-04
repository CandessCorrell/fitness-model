import React, { Component } from 'react';
const TAG = 'RecommendationListItem | '

export default class RecommendationsListItem extends Component {

	renderRecommendation() {
		const { recommendation } = this.props;
		console.log(TAG);
		return (
				<div>
					<li className="results-recommendations-body">
						{recommendation.recommendation}
					</li>
				</div>
		);
	}

	render() {
		return (
			<div>
				{this.renderRecommendation()}
			</div>
		);
	}
}
