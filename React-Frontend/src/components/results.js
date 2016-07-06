import React, { Component } from 'react';
import { connect } from 'react-redux';

// React router
import { Router, Route, Link } from 'react-router';

class Results extends Component {
	renderPrevious() {
		return (
			<Link to={"/rankings"} className="category-link">
				<button type="button" className="btn btn-primary prev-button">PREV</button>
			</Link>
		);
	}

	render() {
		return (
			<div className="category-container">
				<h1 className="category-title">
					Results
				</h1>

				<div>
					{this.renderPrevious()}
				</div>
			</div>
		);
	}
}