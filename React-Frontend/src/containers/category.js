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
		this.props.fetchCategory(this.props.params.id);
		this.props.fetchCategory(this.props.params.id);
		console.log(TAG, JSON.stringify(this.props.questions));
		console.log(TAG, "window.location.href:", window.location.href.split('/')[4])
	}

	renderCategory() {
		if (this.props.params.oldid != this.props.params.id) {
			this.props.params.oldid = this.props.params.id;
			this.props.fetchCategory(this.props.params.id);
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
			<Link to={"/category/" + prevCat} className="category-link">
				<button type="button" className="btn btn-primary prev-button">PREV</button>
			</Link>
		);
	}

	renderNext(nextCat) {
		return (
			<Link to={"/category/" + nextCat} className="category-link">
				<button type="button" className="btn btn-primary next-button">NEXT</button>
			</Link>
		);
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
					<Header className="gray-band" />
				</div>
				<div className="container">
					<div className="row">
						<div className="col-md-2" style={{height: 500, width: 200}}>
							<Sidebar />
						</div>
						<div className="col-md-6">
							<div className="category-container">
								<h1 className="category-title">
									Category Description
								</h1>

								{ this.renderFitnessLevel("1") }
								{ this.renderFitnessLevel("2") }
								{ this.renderFitnessLevel("3") }

								<div className="footer-buttons">
									{this.renderPrevious(prevCategory)}
									{this.renderNext(nextCategory)}
								</div>
							</div>
						</div>
							<Link to="/" className="col-md-3 category-logo-container">
								<img src="../assets/final-logo-01.png" className="category-logo" />
							</Link>
					</div>
				</div>
			</div>
		);
	}
}

function mapStateToProps(state) {
	return { questions: state.category.questions };
}

export default connect(mapStateToProps, { fetchCategory })(Category);
