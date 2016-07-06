import React, { Component } from 'react';
import { connect } from 'react-redux';

// React router
import { Router, Route, Link } from 'react-router';

class Rankings extends Component {
	renderPrevious() {
		return (
			<Link to={"/category/13"} className="category-link">
				<button type="button" className="btn btn-primary prev-button">PREV</button>
			</Link>
		);
	}

	renderNext() {
		return (
			<Link to={"/results"} className="category-link">
				<button type="button" className="btn btn-primary next-button">NEXT</button>
			</Link>
		);
	}

	render() {
		return (
			<div className="category-container">
				<h1 className="category-title">
					Rankings
				</h1>

				<div>
					{this.renderPrevious()}
					{this.renderNext()}
				</div>
			</div>
		);
	}
}

function mapStateToProps(state) {
	return { questions: state.category.questions };
}