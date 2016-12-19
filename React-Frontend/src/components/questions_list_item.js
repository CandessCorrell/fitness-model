import React, { Component } from 'react';
import { connect } from 'react-redux';
import axios from 'axios';
import { ROOT_URL } from '../actions/index.js';
const TAG = 'QuestionListItem | '

var renderCount = 0

export default class QuestionsListItem extends Component {

	constructor(props) {
    super(props);
    this.state = {selectValue: this.props.question.answer_description};
    this.putResponse = this.putResponse.bind(this);
		console.log(TAG, 'ROOT_URL', ROOT_URL);
  }

	renderQuestion() {
		return (
			<tr>
				<td>
					<span className="pull-xs-right">{ this.props.question.question_description }</span>
				</td>
				<td className="drop-down-cell">
					<form className="form-inline" role="form">
						<div className="form-group response-dropdown">
							{this.renderDropDown()}
						</div>
			        </form>
				</td>
			</tr>
		);
	}

	renderDropDown() {
		if (this.props.question.answer_description == "Yes"
		|| this.props.question.answer_description == "No"
		|| this.props.question.answer_description == "Planning to"
		|| this.props.question.answer_description == "Select") {
			console.log(TAG, "selectValue after render", renderCount, ":", this.state.selectValue)

			return (
				<select className="response-dropdown" defaultValue={this.state.selectValue} value={this.state.selectValue}
				onChange={this.putResponse}>
					<option>Select</option>
					<option>No</option>
					<option>Yes</option>
				</select>
			);
		}

		else {
			return (
				<select className="form-control" value={this.state.selectValue}
				onChange={this.putResponse}>
					<option>Select</option>
					<option>Monthly</option>
					<option>Weekly</option>
					<option>Daily</option>
				</select>
			);
		}
	}

	putResponse(event) {
		console.log(TAG, '\nresponse_id: ', this.props.question.response_id, '\nassessment_id: ', this.props.question.assessment_id, '\nquestion_id: ',
		 this.props.question.question_id, '\nanswer_id: ', this.props.question.answer_id, '\nUPDATE ANSWER TO:', event.target.value)
		axios.put(`${ROOT_URL}responses/${this.props.question.response_id}`, {
	    responseJson: {
				question_id: this.props.question.question_id,
	    	answer_id: this.props.question.answer_id,
				assessment_id: this.props.question.assessment_id,
				answer_description: event.target.value
			}
	  })
	  .then(function (response) {
	    console.log(response);
	  })
	  .catch(function (error) {
	    console.log(error);
	  });
		this.setState({selectValue: event.target.value})

	}

	render() {
		return (
			this.renderQuestion()
		);
	}
}
