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
            <button type="button" className="btn btn-primary category-button">{ title.description }</button>
          </Link> <br />
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
        <Link to="/results" className="category-link">
          <button type="button" className="btn btn-primary category-button">Results</button>
        </Link>

      </div>
    );
  }
}

function mapStateToProps(state) {
  return { titles: state.category.titles };
}

export default connect(mapStateToProps, { fetchCategories })(CategoriesList);
