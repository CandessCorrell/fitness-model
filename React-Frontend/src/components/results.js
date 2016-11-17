import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';

import Header from './header';
import Sidebar from './sidebar';

class Results extends Component {
	renderPrevious() {
		return (
			<Link to={"/category/3"} className="category-link">
				<button type="button" className="btn btn-primary prev-button">PREV</button>
			</Link>
		);
	}

	render() {
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
						<div className="col-md-8">
							<div className="category-container">
								<h1 className="category-title">
									Results
								</h1>
								<img src="../assets/graph.png" />
								<div className="footer-buttons">
									{this.renderPrevious()}
								</div>
							</div>
						</div>
							<Link to="/" className="col-md-2 category-logo-container">
								<img src="../assets/final-logo-01.png" className="category-logo" />
							</Link>
					</div>
				</div>
			</div>
		);
	}
}

export default Results;
