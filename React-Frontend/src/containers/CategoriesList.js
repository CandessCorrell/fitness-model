import _ from 'lodash';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { selectCategory } from '../actions/index';

// React router
import { Router, Route, Link } from 'react-router';

const TAG = "CategoriesList | ";

const DEFAULT_ANSWER = "Select";

class CategoriesList extends Component {

  setClassName(category_description) {
    if (this.props.activeCategory == category_description) {
      return "active-sidebar"
    }
    return "sidebar-item"
  }

  isComplete(category) {
    // Loop through each question and if any have a default answer, this category is incomplete
    let complete = true;
    category.forEach((question) => {
      if (question.answer_description === DEFAULT_ANSWER){
        complete = false;
      }
    });
    return complete;
  }

  renderCategoriesList() {
    const { titles } = this.props;

    if ( titles ) {
      var sortedTitles = _.sortBy(this.props.titles.categories, 'category_id');
    }
    var newArr = [];
    // Difference between let and var here????
    // Was using var initially and experienced some very confusing behavior.
    for (let i = 0; i < sortedTitles.length; i++) {
      let image = "../assets/nav-empty-circle.png";
      if (this.isComplete(sortedTitles[i])) {
        image = "../assets/nav-checked-circle.png";
      }
      newArr.push(
        <li key={i} className={this.setClassName(sortedTitles[i][0].category_description)}>
        <img className="nav-circle" src={image} />
        <Link
          to={"/assessment"}
          className="category-link"
          onClick={() => this.props.selectCategory(i)}
          key={sortedTitles[i][0].category_description}
        >
          {sortedTitles[i][0].category_description}
        </Link>
        <br />
      </li>
      );
    };
    return newArr;
  }



  render() {
    const { titles } = this.props;

    if ( !titles ) {
      return <div>Loading...</div>;
    }

    return (
      <ul className="categories-list">
        { this.renderCategoriesList() }
        {/*<li className={this.setClassName('Results')}>
          <img className="nav-circle" src="../assets/nav-empty-circle.png" />
          <Link
            to={"/results"}
            className="category-link"
            onClick={() => this.props.selectCategory('')}
            key={'ResultsSidebarLink'}
          >
            Results
          </Link>
          <br />
        </li>*/}
      </ul>
    );
  }
}

export default connect(null, { selectCategory })(CategoriesList);
