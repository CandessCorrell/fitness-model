import React, { Component } from 'react';
import { connect } from 'react-redux';
import RecommendationsListItem from './RecommendationsListItem';

const TAG = 'RecommendationsList | ';

export default class RecommendationsList extends Component {

	renderRecommendations() {
		return this.props.recommendations.map((recommendation) => {
			if (recommendation.answer_description == 'No') {
				return (
					<RecommendationsListItem
						recommendation={recommendation}
						key={recommendation.recommendation + 'abcdef'}
					/>
				);
			}
			return ;
		});
	}


	render() {
		const { recommendations } = this.props;
		let content = false;
		recommendations.map((question) => {
			if (question.recommendation) {
				content = true;
			}
		});
		if ( !content ) {
			return null;
		}

		return (
			<div className="recommendation-list-item">
				<h3 className="results-subtitle">
					{this.props.recommendations[0].category_description}
				</h3>
				<img className="results-category-fitness-level" src={"../assets/level-"+this.props.recommendations[4].fitness_level+".png"} />
				<ul className="recommendations-list">
						{ this.renderRecommendations() }
				</ul>
			</div>
		);
	}
}
