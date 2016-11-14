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
        <div>
          <Link to={"/category/" + title.category_id} className="category-link" key={title.category_id}>
            <button type="button" className="nav-button">{ title.description }</button>
          </Link>
        </div>
      );
    });
  }

  render() {
    const { titles } = this.props;

    if ( !titles ) {
      return <div>Loading...</div>;
    }

    return (
      <div className="categories-list">
        { this.renderCategoriesList() }
        <div>
          <Link to="/results">
            <button type="button" className="nav-button">Results</button>
          </Link>
        </div>

      </div>
    );
  }
}

function mapStateToProps(state) {
  return { titles: state.category.titles };
}

export default connect(mapStateToProps, { fetchCategories })(CategoriesList);
