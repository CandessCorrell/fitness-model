'use strict';
var clientJS = require('./helper-functions/client.js');
var client = clientJS.client;
var cors = require('cors');

var TAG = "FITNESS_CARD | ";

module.exports = {
// Get questions for a particular category
  '/fitness_card/:category_id': {
    methods: ['get'],
    middleware: [cors()],
    fn: function(request, response){
      // We need a category description, and (eventually) an assessment ID
      // Don't need the assessment ID yet, because we only have 1 assessment ID...
      console.log(TAG, "\nCalled /fitness-card(GET)");
      var category_id = request.url.split("/");
      category_id = category_id[2];
      console.log(TAG, "Category_id is : " + category_id);
  	  
  	  get_fitness_card( category_id,
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

function get_fitness_card(category_id, callBack, errBack) {
  var getFitnessCardQuery = "SELECT q.description as question_description, \
  a.description as answer_description, c.description as category_description, \
  c.category_id as category_id, a.recommendation, q.fitness_level FROM questions as q \
  INNER JOIN categories as c ON q.category_id = c.category_id INNER JOIN answers as a \
  ON q.question_id = a.question_id WHERE c.category_id =\'{0}\'".format(category_id);
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
