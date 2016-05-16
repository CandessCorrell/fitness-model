import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchCategory } from '../actions/index';
import QuestionsList from './questions_list';

// React router
import { Router, Route, Link } from 'react-router';

class Category extends Component {
	componentWillMount() {
		this.props.fetchCategory(this.props.params.id);
	}

	renderCategory() {
		if (this.props.params.oldid != this.props.params.id) {
			this.props.params.oldid = this.props.params.id;
			this.props.fetchCategory(this.props.params.id);
		}
	}

	renderFitnessLevel(level) {
		var hasLevel = false;

		this.props.questions.map((question) => {
			if (question.fitness_level == level) {
				hasLevel = true;
			}
		});

		if (hasLevel == true) {
			return(
				<QuestionsList id={ level } questions={ this.props.questions } />
			);
		}

		else {
			return "";
		}
	}

	render() {
		const { questions } = this.props;

		if ( !questions ) {
			this.props.params.oldid = this.props.params.id;
			return <div>Loading...</div>;
		}

		this.renderCategory();

		this.props.params.prevCategory = parseInt(this.props.params.id) - 1;

		this.props.params.nextCategory = parseInt(this.props.params.id) + 1;

		console.log(this.props.params.prevCategory)

		console.log(this.props.params.nextCategory)

		return (
			<div className="category-container">
				<h1 className="category-title">
					{ this.props.questions[0].category_description }
				</h1>
					
				{ this.renderFitnessLevel("1") }
				{ this.renderFitnessLevel("2") }
				{ this.renderFitnessLevel("3") }

				<div>
					<Link to={"/category/" + this.props.params.prevCategory} className="category-link">
						<button type="button" className="btn btn-primary prev-button">PREV</button>
					</Link>

					<Link to={"/category/" + this.props.params.nextCategory} className="category-link">
						<button type="button" className="btn btn-primary next-button">NEXT</button>
					</Link>
				</div>
			</div>
		);
	}
}

function mapStateToProps(state) {
	return { questions: state.category.questions };
}

export default connect(mapStateToProps, { fetchCategory })(Category);