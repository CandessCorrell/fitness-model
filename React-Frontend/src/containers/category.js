import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchCategory } from '../actions/index';
import QuestionsList from '../components/questions_list';
import Sidebar from '../components/sidebar';
import Header from '../components/header';

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
		this.props.fetchCategory(this.props.assessments.selected,this.props.params.id);
	}

	componentWillUpdate(nextProps) {
		if ((nextProps.assessments.selected != this.props.assessments.selected) || (nextProps.params.id != this.props.params.id)) {
			this.props.fetchCategory(nextProps.assessments.selected,nextProps.params.id);
		}
	}

	renderCategory() {
		if (this.props.params.oldid != this.props.params.id) {
			this.props.params.oldid = this.props.params.id;
			this.props.fetchCategory(this.props.assessments.selected,this.props.params.id);
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
			return (
				<QuestionsList id={ level } questions={ this.props.questions } />
			);
		}

		else {
			return ;
		}
	}

	renderPrevious(prevCat) {
		if (prevCat == 0) {
			return ;
		}
		return (
			<Link to={"/category/" + prevCat} className="prev-next-button">
				PREV
			</Link>
		);
	}

	renderNext(nextCat) {
		if (this.props.titles == null) {
			return;
		}
		if (nextCat > this.props.titles.length) {
			return (
				<Link to={"/results/" + this.props.assessments.selected} className="prev-next-button">
					SUBMIT
				</Link>
			);
		} else {
			return (
				<Link to={"/category/" + nextCat} className="prev-next-button">
					NEXT
				</Link>
			);
		}
	}

	render() {
		const { questions } = this.props;

		if ( !questions ) {
			this.props.params.oldid = this.props.params.id;
			return <div>Loading...</div>;
		}
		this.renderCategory();

		var prevCategory = parseInt(this.props.params.id) - 1;

		var nextCategory = parseInt(this.props.params.id) + 1;

		return (
			<div>
				<div className= "gray-band-container">
					<Header className="gray-band" team_name={this.props.login.team_name}/>
				</div>
				<div className="container">
					<div className="row">
						<div className="col-md-2" style={{height: 500, width: 200}}>
							<Sidebar activeCategory={this.props.questions[0].category_description}/>
						</div>
						<div className="col-md-8">
							<h1 className="category-title">
								{this.props.questions[0].category_description}
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
		questions: state.category.questions,
		titles: state.category.titles,
		assessments: state.assessments,
		login: state.login
	};
}

export default connect(mapStateToProps, { fetchCategory })(Category);
