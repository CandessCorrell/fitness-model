import React, { Component } from 'react';
import { connect } from 'react-redux';
import RecommendationsListItem from './recommendations_list_item';

export default class RecommendationsList extends Component {

	renderRecommendations() {
		return this.props.recommendations.map((recommendation) => {
			return (
					<RecommendationsListItem recommendation={ recommendation } />
			);
		});
	}


	render() {
		const { recommendations } = this.props;

		if ( !recommendations ) {
			this.props.params.oldid = this.props.params.id;
			return <div>None</div>;
		}

		return (
			<div className="recommendations-container">
				<h3 className="recommendations-title">
					Recommendations
				</h3>
				<table className="fitness-table">
					<tbody>
						{ this.renderRecommendations() }
					</tbody>
				</table>
			</div>
		);
	}
}