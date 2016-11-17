import _ from 'lodash';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchCategories } from '../actions/index';

// React router
import { Router, Route, Link } from 'react-router';

const TAG = "Categories List | ";

class CategoriesList extends Component {
  componentWillMount() {
    this.props.fetchCategories();
  }

  renderCategoriesList(){
    const { titles } = this.props;

    if ( titles ) {
      var sortedTitles = _.sortBy(this.props.titles, 'category_id');
    }

    return sortedTitles.map((title) => {
      return (
        <li>
          <Link to={"/category/" + title.category_id} className="category-link" key={title.category_id}>
            {title.description}
          </Link>
        </li>
      );
    });
  }

  render() {
    const { titles } = this.props;

    if ( !titles ) {
      return <div>Loading...</div>;
    }

    return (
      <ul className="categories-list">
        { this.renderCategoriesList() }
        <li>
          <Link to="/results" className="category-link" key={"Results"}>
            Results
          </Link>
        </li>

      </ul>
    );
  }
}

function mapStateToProps(state) {
  return { titles: state.category.titles };
}

export default connect(mapStateToProps, { fetchCategories })(CategoriesList);
