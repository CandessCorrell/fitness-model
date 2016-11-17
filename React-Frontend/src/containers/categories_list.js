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
      if (title.category_id==1) {
        return (
          <li className="sidebar-item">
            <table>
              <tbody>
                <tr>
                  <td>
                    <img className="nav-circle" src="../assets/nav-checked-circle.png" />
                  </td>
                  <td>
                    <Link to={"/category/" + title.category_id} className="category-link" key={title.category_id}>
                      {title.description}
                    </Link>
                  </td>
                </tr>
              </tbody>
            </table>
          </li>
        );
      }
      else {
        return (
          <li className="sidebar-item">
            <table>
              <tbody>
                <tr>
                  <td>
                    <img className="nav-circle" src="../assets/nav-empty-circle.png" />
                  </td>
                  <td>
                    <Link to={"/category/" + title.category_id} className="category-link" key={title.category_id}>
                      {title.description}
                    </Link>
                  </td>
                </tr>
              </tbody>
            </table>
          </li>
        );
      }
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
        <li className="sidebar-item">
          <table>
            <tbody>
              <tr>
                <td>
                  <img className="nav-circle" src="../assets/nav-empty-circle.png" />
                </td>
                <td>
                  <Link to={"/results/1"} className="category-link" key={"Results"}>
                    Results
                  </Link>
                </td>
              </tr>
            </tbody>
          </table>
        </li>

      </ul>
    );
  }
}

function mapStateToProps(state) {
  return { titles: state.category.titles };
}

export default connect(mapStateToProps, { fetchCategories })(CategoriesList);
