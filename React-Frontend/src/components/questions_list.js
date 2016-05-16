import React, { Component } from 'react';
import { connect } from 'react-redux';

export default class QuestionsList extends Component {
	renderQuestions() {
		return this.props.questions.map((question) => {
			if (question.fitness_level == this.props.id && question.answer_description == "Yes") {
				return (
					<tr>
						<td className="inputBox">
							<input type="text" />
						</td>
						<td>
							<span className="pull-xs-right">{ question.question_description }</span>
						</td>
						<td className="inputBox">
							<input type="text" />
						</td>
						<td>
							<span className="pull-xs-right">Sample recommendation</span>
						</td>
					</tr>
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
					<thead>
						<tr>
							<th className="fitness-table-header">
								Score
							</th>
							<th className="fitness-table-header">
								Question
							</th>
							<th className="fitness-table-header">
								Response
							</th>
							<th className="fitness-table-header">
								Recommendation
							</th>
						</tr>
					</thead>
					<tbody>
						{ this.renderQuestions() }
					</tbody>
				</table>
			</div>
		);
	}
}