import React, { Component } from 'react';
import { connect } from 'react-redux';
import axios from 'axios';
import { ROOT_URL } from '../actions/index.js';
const TAG = 'QuestionListItem | '

var renderCount = 0

export default class QuestionsListItem extends Component {

	constructor(props) {
    super(props);
		this.state = {selectValue: this.props.question.answer_description, message: ""};
  	this.putResponse = this.putResponse.bind(this);
  }
  componentWillUpdate(nextProps) {
	  if (nextProps.question.answer_description != this.props.question.answer_description) {
		  this.setState({selectValue:nextProps.question.answer_description});
	  }
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
						<div className="message">{this.state.message}</div>
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
			return (
				<select className="response-dropdown" value={this.state.selectValue}
				onChange={this.putResponse}>
					<option value="Select">Select</option>
					<option value="No">No</option>
					<option value="Yes">Yes</option>
				</select>
			);
		}

		else {
			return (
				<select className="form-control" value={this.state.selectValue}
				onChange={this.putResponse}>
					<option value="Select">Select</option>
					<option value="Monthly">Monthly</option>
					<option value="Weekly">Weekly</option>
					<option value="Daily">Daily</option>
				</select>
			);
		}
	}

	putResponse(event) {
		this.setState({selectValue: event.target.value, message: "Saving..."});
		axios.put(`${ROOT_URL}responses/${this.props.question.response_id}`, {
	    responseJson: {
				question_id: this.props.question.question_id,
    		answer_id: this.props.question.answer_id,
				assessment_id: this.props.question.assessment_id,
				answer_description: event.target.value
		}
	  })
	  .then((response) => {
	    this.setState({message: "Saved."});
		setTimeout(() => { this.clearMessage() }, 3000);
	  })
	  .catch(function (error) {
	    this.setState({message: "An Error occurred while saving, please try again."});
		setTimeout(() => { this.clearMessage() }, 3000);
	  });

	}

	clearMessage() {
		this.setState({message: ""});
	}

	render() {
		return (
			this.renderQuestion()
		);
	}
}
