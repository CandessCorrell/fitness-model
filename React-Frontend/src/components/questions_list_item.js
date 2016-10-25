import React, { Component } from 'react';
import { connect } from 'react-redux';
import { putResponse } from '../actions/index';

export default class QuestionsListItem extends Component {

	renderQuestion() {
		return (
			<tr>
				<td>
					<span className="pull-xs-right">{ this.props.question.question_description }</span>
				</td>
				<td className="drop-down-cell">
					<form className="form-inline" role="form">
						<div className="form-group">
							{this.renderDropDown()}
						</div>
			        </form>
				</td>
			</tr>
		);
	}

	renderDropDown() {
		if (this.props.question.answer_description == null
		|| this.props.question.answer_description == "Yes"
		|| this.props.question.answer_description == "No"
		|| this.props.question.answer_description == "Planning to") {
			return (
				<select className="form-control"
				onInput={putResponse(this.props.question.response_id, 1, this.props.question.question_id, this.props.question.answer_id)}>
					<option>Select</option>
					<option>No</option>
					<option>Planning To</option>
					<option>Yes</option>
				</select>
			);
		}

		else {
			return (
				<select className="form-control">
					<option>Select</option>
					<option>Monthly</option>
					<option>Weekly</option>
					<option>Daily</option>
				</select>
			);
		}
	}

	render() {
		return (
			this.renderQuestion()
		);
	}
}
