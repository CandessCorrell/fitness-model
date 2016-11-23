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

  setClassName(category_description) {
    if (this.props.activeCategory == category_description) {
      return "active-sidebar"
    }
    return "sidebar-item"
  }

  renderCategoriesList() {
    const { titles } = this.props;

    if ( titles ) {
      var sortedTitles = _.sortBy(this.props.titles, 'category_id');
    }

    return sortedTitles.map((title) => {
      // REMOVE THIS IF STATEMENT AFTER DEMO
      // Convert to use Redux state to track check vs. empty to render appropriate image.
      return (
        <li className={this.setClassName(title.description)}>
          <img className="nav-circle" src="../assets/nav-checked-circle.png" />
          <Link
            to={"/category/" + title.category_id}
            className="category-link"
            key={title.description}
          >
            {title.description}
          </Link>
          <br />
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
        <li className={this.setClassName('Results')}>
          <img className="nav-circle" src="../assets/nav-empty-circle.png" />
          <Link
            to={"/results/1"}
            className="category-link"
            key={12}
          >
            Results
          </Link>
          <br />
        </li>

      </ul>
    );
  }
}

function mapStateToProps(state) {
  return { titles: state.category.titles };
}

export default connect(mapStateToProps, { fetchCategories })(CategoriesList);
