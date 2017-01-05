import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';
import { fetchRecommendations, fetchScores, newFetchCategories } from '../actions/index';
import RecommendationsList from '../components/RecommendationsList';
import Header from '../components/Header';
import Sidebar from '../components/Sidebar';
import GraphLegend from '../components/GraphLegend';
import Graph from '../components/Graph';

const TAG = 'Results | ';

class Results extends Component {

	constructor(props) {
		super(props)
	}

	componentDidMount() {
		this.props.newFetchCategories(this.props.selected);
		// this.props.fetchRecommendations(this.props.selected);
		this.props.fetchScores(this.props.selected);
	}

	renderRecommendations() {
		return this.props.categories.categories.map((category) => {
			return (
				<div>
					<RecommendationsList key={'Recommendation'+category[0].category_description} recommendations={category} />
				</div>
			);
		})
	}

	render() {
		const { recommendations, scores } = this.props;

		if ( !this.props.categories.categories ) {
			this.props.params.oldid = this.props.params.id;
			return <div>Loading...</div>;
		}

		return (

			<div>
				<div className= "gray-band-container">
					<Header className="gray-band" />
				</div>
				<div className="not-container">
					<div className="row">
						{/*<div className="col-md-2" style={{height: 500, width: 200}}>
							<Sidebar activeCategory='Results'/>
						</div>*/}
						<div className="col-md-8">
							<div className="result-container">
								<h1 className="results-title">
									Results
								</h1>

								{/*<Graph scores={this.props.scores}/>*/}
								<div className="graph-container">
									<img className="graph" src="../assets/graph.png" />
									<GraphLegend className="graph-legend" />
								</div>

								<div className="recommendations-list">
									<h2 className="results-subtitle"> Recommendations </h2>
									{ this.renderRecommendations() }
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

function mapStateToProps({ assessments, categories }) {
	return {
		selected: assessments.selected,
		scores: assessments.scores,
		categories: categories
	};
}

export default connect(mapStateToProps, { newFetchCategories, fetchScores })(Results);
