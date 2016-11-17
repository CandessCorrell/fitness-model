import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';
import { fetchScores } from '../actions/index';
import RecommendationsList from '../components/recommendations_list';
import Header from '../components/header';
import Sidebar from '../components/sidebar';
import GraphLegend from '../components/graph_legend';

class Results extends Component {
	renderPrevious() {
		return (
			<Link to={"/category/3"} className="prev-next-button">
				PREV
			</Link>
		);
	}
	componentDidMount() {
		this.props.fetchScores(this.props.params.id);
	}

	renderScores() {
		this.props.fetchScores(this.props.params.id);
	}

	render() {
		const { scores } = this.props;

		if ( !scores ) {
			return <div>Loading...</div>;
		}

		this.renderScores();

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
							<div className="result-container">
								<h1 className="category-title">
									Results
								</h1>
								<img className="graph" src="../assets/graph.png" />
								<GraphLegend className="graph-legend" />

								{ this.renderRecommendations }
							</div>
							<div className="footer-buttons">
								{this.renderPrevious()}
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

function mapStateToProps(state) {
	return { scores: state.result.scores };
}

export default connect(mapStateToProps, { fetchScores })(Results);
