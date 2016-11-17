import React, { Component } from 'react';
import { connect } from 'react-redux';
import axios from 'axios';
const TAG = 'RecommendationListItem | '

const ROOT_URL = 'http://54.175.219.183:3000/'
var renderCount = 0

export default class RecommendationsListItem extends Component {

	constructor(props) {
    super(props);
    this.state = {selectValue: this.props.question.answer_description};
    this.putResponse = this.putResponse.bind(this);
  }

	renderRecommendation() {
		return (
			<div>
				Build
			</div>
		);
	}

	render() {
		return (
			this.renderRecommendation()
		);
	}
}
