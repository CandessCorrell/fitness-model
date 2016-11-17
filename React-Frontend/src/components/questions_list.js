import React, { Component } from 'react';
import { connect } from 'react-redux';
import QuestionsListItem from './questions_list_item';

export default class QuestionsList extends Component {

	renderQuestions() {
		return this.props.questions.map((question) => {
			if (question.fitness_level == this.props.id && (question.answer_description == "Yes" || question.answer_description == "Daily"
		|| question.answer_description == "No" || question.answer_description == "Weekly" || question.answer_description == "Monthly"
	|| question.answer_description == "Planning to")) {
				return (
					<QuestionsListItem question={ question } key={question.question_description} questions={ this.props.questions } />
				);
			}
		});
	}


	render() {
		const { questions } = this.props;

		if ( !questions ) {
			this.props.params.oldid = this.props.params.id;
			return <div>None</div>;
		}

		return (
			<div className="fitness-container">
				<h3 className="fitness-title">
					Fitness Level { this.props.id }
				</h3>
				<table className="fitness-table">
					<tbody>
						{ this.renderQuestions() }
					</tbody>
				</table>
			</div>
		);
	}
}