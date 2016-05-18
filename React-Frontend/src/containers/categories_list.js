import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchCategories } from '../actions/index';

// React router
import { Router, Route, Link } from 'react-router';

const TAG = "Categories_list | ";

class CategoriesList extends Component {
  componentWillMount() {
    this.props.fetchCategories();
  }

  renderCategoriesList(){
    return this.props.titles.map((title) => {
      console.log(title.category_id)
      console.log(title.description)
      return (
        <Link to={"/category/" + title.category_id} className="category-link" key={title.category_id}>
          <button type="button" className="btn btn-primary category-button">{ title.description }</button>
        </Link>
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

        <Link to="/category/ranking" className="category-link">
          <button type="button" className="btn btn-primary category-button">Ranking</button>
        </Link>
        <Link to="/category/results" className="category-link">
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