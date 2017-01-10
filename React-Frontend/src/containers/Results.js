import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';
import { fetchRecommendations, fetchScores, newFetchCategories } from '../actions/index';
import RecommendationsList from '../components/RecommendationsList';
import Header from '../components/Header';
import Sidebar from '../components/Sidebar';
import GraphLegend from '../components/GraphLegend';
import Graph from '../components/Graph';
import { BarChart, XAxis, YAxis, CartesianGrid, Tooltip, Legend, Bar } from 'recharts';

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

	transformResults(categories) {
		// Formats data for graph
		let data = [];
		categories.map((category) => {
			let current = {Level1:0,Level2:0,Level3:0};
			category.map((question) => {
				current.name = question.category_description;
				switch(question.fitness_level) {
					case 1:
						current.Level1 += question.score;
						break;
					case 2:
						current.Level2 += question.score;
						break;
					case 3:
						current.Level3 += question.score;
						break;
					default:
						console.log("Invalid level");
				}
			});
			data.push(current);
		});
		return data;
	}

	render() {
		const { recommendations, scores } = this.props;

		if ( !this.props.categories.categories ) {
			this.props.params.oldid = this.props.params.id;
			return <div>Loading...</div>;
		}

		let data = this.transformResults(this.props.categories.categories);

		// Example of how data is formatted for graph
		// const data = [
		// 	{name: 'Build', Level1: 12, Level2: 4, Level3: 2},
		// 	{name: 'Testing', Level1: 12, Level2: 18, Level3: 20},
		// 	{name: 'Deployments', Level1: 12, Level2: 18, Level3: 20}
		// ];

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

									{ /*
										<img className="graph" src="../assets/graph.png" />
										<GraphLegend className="graph-legend" />
										Rather than using our own built Graph components, we're just using the recharts components imported
									*/}

									<BarChart layout="vertical" width={800} height={300} data={data}
											margin={{top: 20, right: 30, left: 40, bottom: 5}}>
										<XAxis type="number" />
										<YAxis type="category" dataKey="name"/>
										<CartesianGrid strokeDasharray="3 3"/>
										<Tooltip/>
										<Legend />
										<Bar name="Fitness Level 1" dataKey="Level1" stackId="a" fill="#FBB040" />
										<Bar name="Fitness Level 2" dataKey="Level2" stackId="a" fill="#0D79A7" />
										<Bar name="Fitness Level 3" dataKey="Level3" stackId="a" fill="#589241" />
									</BarChart>

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
