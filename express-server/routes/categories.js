'use strict';
var clientJS = require('./helper-functions/client.js');
var client = clientJS.client;
// bodyParser enables post request body parsing
var bodyParser = require('body-parser');
var cors = require('cors');

var TAG = "\nCATEGORIES | ";

module.exports = {
  '/categories': {
    methods: ['get', 'post'],
    middleware: [bodyParser.urlencoded({extended: true}), bodyParser.json(), cors()],

    fn: function(request, response){
      if (request.method === 'GET') {
        console.log(TAG, "Called /categories(GET)");
    	  get_categories(0,
    	  	function(resp) {
    	  	// This is the callback - we move into this if the function returns data as expected
    	  	console.log(TAG, 'moving into get_categories callback');
    	  	// console.log(TAG, 'resp: ' + JSON.stringify(resp));
    	  	return response.status(200).send(resp);
        }, function(err) {
    	  	// This is the errback - we move into this if get_categories returns an error
    	  	console.log(TAG, 'Something went wrong in ' + TAG);
    	  	console.log(TAG, err);
    	  	return response.status(400).send(err);
    	  })
      } else if (request.method === 'POST') {
        console.log(TAG, "Called /categories(POST)");
        if (request.body.description == null) {
          console.log(TAG, "POST failed: Bad description")
          response.status(400).send("POST failed! Check your description!");
        } else {
          post_categories(request.body.description, function (resp) {
            response.status(200).send(resp);
          }, function (err) {
            response.status(400).send(err);
          })
        }
      }
  	}
  },
  '/categories/:assessment_id': {
    methods: ['get'],
    middleware: [bodyParser.urlencoded({extended: true}), bodyParser.json(), cors()],

    fn: function(request, response){
      if (request.method === 'GET') {
        var assessment_id = request.url.split("/");
        assessment_id = assessment_id[2];
        console.log(assessment_id);
        get_categories(assessment_id,
          function(resp) {
          // This is the callback - we move into this if the function returns data as expected
          console.log(TAG, 'moving into get_categories callback');
          // console.log(TAG, 'resp: ' + JSON.stringify(resp));
          return response.status(200).send(resp);
        }, function(err) {
          // This is the errback - we move into this if get_categories returns an error
          console.log(TAG, 'Something went wrong in ' + TAG);
          console.log(TAG, err);
          return response.status(400).send(err);
        })
      }
      else {

      }
    }
  }

}

function get_categories_by_assessment_id(assessment_id, category, categories, index, numTimes, callBack, errBack) {
  var getCategoriesByAssessmentIdQuery = "SELECT q.question_id, a.answer_id, r.response_id as response_id, \
  r.assessment_id, a.description as answer_description, q.description \
  as question_description, c.category_id as category_id, a.recommendation, q.fitness_level, \
  c.description as category_description FROM \
  questions as q INNER JOIN categories as c ON q.category_id = c.category_id  \
  INNER JOIN answers as a ON q.question_id = a.question_id INNER JOIN responses \
  as r ON r.answer_id = a.answer_id WHERE r.assessment_id =\'{0}\' AND c.category_id \
  = \'{1}\'".format(assessment_id, category.category_id);
  client.query(getCategoriesByAssessmentIdQuery, function(err, result) {
    if (err || result.rows[0] == 'undefined' || typeof result.rows[0] === 'undefined') {
      return errBack(err);
    }
    else {
      // condition is number of categories, decrement some counter every time before we return from this function
      console.log('index', index);
      console.log('numTimes', numTimes);
      // console.log('BEFORE ADD ROWS:', categories);
      categories[category.description] = result.rows;
      // console.log('AFTER ADD ROWS:', categories);
      if (index === numTimes-1) {
        return callBack(categories);
      }
    }
  })
}

/* /categories retrieves list of categories.
 * /assessments/assessment_id/category/category_id retrieves list of
 * Get all categories
 * For each category get question, answer, response, recommendation, score,
 *
 */


function get_categories(assessment_id, callBack, errBack) {
  var getCategoriesQuery = "SELECT * FROM categories";
  console.log(TAG, getCategoriesQuery);
  client.query(getCategoriesQuery, function(err, result) {
    if (err || result.rows[0] === 'undefined' || typeof result.rows[0] === 'undefined') {
        console.log(TAG, getCategoriesQuery);
        return errBack(err);
      } else {
        // for (var i = 0; i < result.rows.length; i++) {
        //  console.log(TAG, funcTAG, "row[" + i + "]: " + JSON.stringify(result.rows[i]));
        // }
        // console.log('assessment_id', assessment_id);
        if (assessment_id === 0) {
          return callBack(result);
        }
        else {
          var categories = {};
          for (var i = 0; i < result.rows.length; i++) {
            get_categories_by_assessment_id(assessment_id, result.rows[i], categories, i, result.rows.length, callBack, errBack);
          }
        }
    }
  })
}

function post_categories(description, callBack, errBack) {
  var postCategoryQuery = "INSERT INTO categories (description) VALUES($${0}$$)".format(description)
  client.query(postCategoryQuery, function(err, result) {
    if (err) {
      console.log(TAG, "Error running INSERT INTO categories with description: " + description);
      return errBack(err);
    } else {
      console.log(TAG, "Successfully inserted new category with description: " + description);
      return callBack("Successfully inserted your new category!");
    }
  })
}
