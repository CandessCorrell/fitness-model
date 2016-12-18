'use strict';
var clientJS = require('./helper-functions/client.js');
var client = clientJS.client;
var cors = require('cors');

var TAG = "FITNESS_CARD | ";

module.exports = {
// Get questions for a particular category
  '/assessments/:assessment_id/category/:category_id': {
    methods: ['get'],
    middleware: [cors()],
    fn: function(request, response){
      // We need a category description, and (eventually) an assessment ID
      // Don't need the assessment ID yet, because we only have 1 assessment ID...
      console.log(TAG, "\nCalled /fitness-card(GET)");
      console.log(request.url.split("/"));
      var request_string = request.url.split("/");
      var assessment_id = request_string[2];
      var category_id = request_string[4];
      console.log(TAG, "Category_id is : " + category_id);

  	  get_fitness_card( assessment_id, category_id,
  	  	function(resp) {
  	  	// This is the callback - we move into this if the function returns data as expected
  	  	console.log(TAG, 'moving into get_fitness_card callback');
  	  	// console.log(TAG, 'resp: ' + JSON.stringify(resp));
  	  	return response.status(200).send(resp);
      }, function(err) {
  	  	// This is the errback - we move into this if get_fitness_card returns an error
  	  	console.log(TAG, 'Something went wrong in ' + TAG);
  	  	console.log(TAG, err);
  	  	return response.status(400).send(err);
  	  })
  	}
  }
}

function get_fitness_card(assessment_id, category_id, callBack, errBack) {
  var getFitnessCardQuery = "SELECT q.question_id, a.answer_id, r.response_id as response_id, \
  r.assessment_id, a.description as answer_description, q.description \
  as question_description, c.category_id as category_id, a.recommendation, q.fitness_level, \
  c.description as category_description FROM \
  questions as q INNER JOIN categories as c ON q.category_id = c.category_id  \
  INNER JOIN answers as a ON q.question_id = a.question_id INNER JOIN responses \
  as r ON r.answer_id = a.answer_id WHERE r.assessment_id =\'{0}\' AND c.category_id \
  = \'{1}\'".format(assessment_id, category_id);
  console.log(TAG, getFitnessCardQuery);
  client.query(getFitnessCardQuery, function(err, result) {
    if (err || result.rows[0] === 'undefined' || typeof result.rows[0] === 'undefined') {
        console.log(TAG, getFitnessCardQuery);
        return errBack(err);
      } else {
        // for (var i = 0; i < result.rows.length; i++) {
        //  console.log(TAG, funcTAG, "row[" + i + "]: " + JSON.stringify(result.rows[i]));
        // }
        return callBack(result);
    }
  })
}
