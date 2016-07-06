import React, { Component } from 'react';
import { connect } from 'react-redux';

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
		if (this.props.question.answer_description == "Yes") {
			return (
				<select className="form-control">
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