import axios from 'axios';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import _ from 'lodash';
import { newFetchCategories, selectCategory, ROOT_URL } from '../actions/';
import QuestionsList from '../components/QuestionsList';
import Sidebar from '../components/Sidebar';
import Header from '../components/Header';

const TAG = 'CATEGORY | ';

// React router
import { Router, Route, Link } from 'react-router';

class Category extends Component {

	constructor(props) {
		super(props);
		this.state = {
			isActive: false
		};
	}

	componentWillMount() {
		if (this.props.assessments.selected) {
			this.props.newFetchCategories(this.props.assessments.selected);
		}
	}

	componentWillUpdate(nextProps) {
		if (nextProps.assessments.selected != this.props.assessments.selected) {
			this.props.newFetchCategories(nextProps.assessments.selected);
		}
	}

	submitAssessment() {
		let endTime = new Date().toISOString();
		axios.put(`${ROOT_URL}assessments/${this.props.assessments.selected}`,{
			resultJson:{
				end_time:endTime
			}
		}).then(function (response) {
			console.log("submitAssessment",response);
  		})
		.catch(function (error) {
			console.log(error);
		});
	}

	// TODO: Potentially remove this call entirely... seems like an awful place to make an API call.
	// Also just seems unnecessary, since we are already making the call in componentWillMount.
	// renderCategory() {
	// 	if (this.props.params.oldid != this.props.params.id) {
	// 		this.props.params.oldid = this.props.params.id;
	// 		this.props.newFetchCategories(this.props.assessments.selected);
	// 	}
	// }

	renderFitnessLevel(level) {
		var hasLevel = false;
		let current_category = this.props.categories.categories[this.props.categories.selected]
		let sortedCategory = _.sortBy(current_category, 'question_id');
		current_category.map((question) => {
			if (question.fitness_level == level) {
				hasLevel = true;
			}
		});

		if (hasLevel == true) {
			return (
				<QuestionsList id={ level } questions={ sortedCategory } />
			);
		}

		else {
			return ;
		}
	}

	renderPrevious(prevCat) {
		if (prevCat == -1) {
			return ;
		}
		return (
			// TODO: Convert this to <button> and make a call to SELECT_CATEGORY action creator.
			<button className="prev-next-button" onClick={() => this.props.selectCategory(prevCat)}>
				PREV
			</button>
		);
	}

	renderNext(nextCat) {
		if (this.props.categories.selected == -1) {
			return;
		}
		if (nextCat > this.props.categories.categories.length-1) {
			return (
				// TODO: Convert this to <button> and make a call to SELECT_CATEGORY action creator.
				<Link to="/results/" onClick={() => this.submitAssessment()} className="prev-next-button">
					SUBMIT
				</Link>
			);
		} else {
			return (
				// TODO: Convert this to <button> and make a call to SELECT_CATEGORY action creator.
				<button className="prev-next-button" onClick={() => this.props.selectCategory(nextCat)}>
					NEXT
				</button>
			);
		}
	}

	render() {
		const { categories, login } = this.props;
		let current_category = categories.categories[categories.selected];

		// Check for current_category, if current_category evaluates to truthy,
		// we successfully made our API call to fetch all categories,
		// selected a category, and have content to render.
		if ( !current_category ) {
			return <div>Loading...</div>;
		}
		// this.renderCategory();

		var prevCategory = parseInt(categories.selected) - 1;

		var nextCategory = parseInt(categories.selected) + 1;

		return (
			<div>
				<div className= "gray-band-container">
					<Header className="gray-band" team_name={login.team_name}/>
				</div>
				<div className="container">
					<div className="row">
						<div className="col-md-2" style={{height: 500, width: 200}}>
							<Sidebar
								titles={categories}
								activeCategory={current_category[0].category_description}
							/>
						</div>
						<div className="col-md-8">
							<h1 className="category-title">
								{current_category[0].category_description}
							</h1>
							<div className="category-container">
								{ this.renderFitnessLevel("1") }
								{ this.renderFitnessLevel("2") }
								{ this.renderFitnessLevel("3") }
								<div className="footer-buttons">
									{this.renderPrevious(prevCategory)}
									{this.renderNext(nextCategory)}
								</div>
							</div>
						</div>
							<Link to="/" className="col-md-2 category-logo-container">
								<img src="../assets/final-logo.png" className="category-logo" />
							</Link>
					</div>
				</div>
			</div>
		);
	}
}

function mapStateToProps(state) {
	return {
		assessments: state.assessments,
		login: state.login,
		categories: state.categories
	};
}

export default connect(mapStateToProps, { newFetchCategories, selectCategory })(Category);
