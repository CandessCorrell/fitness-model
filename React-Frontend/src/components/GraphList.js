import React, { Component } from 'react';
import GraphListItem from './GraphListItem';

const TAG = 'GraphList | ';

export default class GraphList extends Component {
  constructor(props) {
    super(props);
    this.renderGraphListItems = this.renderGraphListItems.bind(this);
  }

  render() {
    console.log(this.props.scores);
    return (
      <ul className="graph-list">
        {this.renderGraphListItems()}
      </ul>
    )
  }

  renderGraphListItems() {
    return (
      this.props.scores.map((category) => {
        // this.calculateCategoryFitnessLevel(category.score, category.category_id);
        return <GraphListItem category={category.description} key={category.score} score={category.score} fl1={10} fl2={20} fl3={30} />
      })
    )
  }
  //
  // calculateCategoryFitnessLevel(totalScore, category) {
  //   // 25% is the max we can render on the screen at current (treat this as 100%) per Fitness Level.
  //   var fitnessLevel = 0;
  //   console.log(TAG, category, 'totalScore: ', totalScore);
  //   console.log(TAG, categoryFitnessLevelThresholds[category]);
  //   if (totalScore == categoryFitnessLevelThresholds.category[0]) {
  //     fitnessLevel++;
  //   }
  //   // if (totalScore > )
  //   // console.log(TAG, categoryFitnessLevelThresholds);
  //   // if (totalScore > categoryFitnessLevelThresholds.category)
  //
  // }
}
