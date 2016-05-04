'use strict';
var clientJS = require('./helper-functions/client.js');
var client = clientJS.client;

var TAG = "FITNESS_CARD | ";

module.exports = {
// Get questions for a particular category
  '/fitness_card': {
    methods: ['get'],
    fn: function(request, response){
      // We need a category description, and (eventually) an assessment ID
      // Don't need the assessment ID yet, because we only have 1 assessment ID...
      console.log(TAG, "\nCalled /fitness-card(GET)");
      console.log(TAG, "Category Description is : " + JSON.stringify(request.query.categoryDescription));
  	  
  	  get_fitness_card( request.query.categoryDescription,
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

function get_fitness_card(categoryDescription, callBack, errBack) {
  var getFitnessCardQuery = "SELECT q.description as question_description, \
  a.description as answer_description, c.description category_description, \
  a.recommendation, q.fitness_level FROM questions as q INNER JOIN categories as c \
  ON q.category_id = c.category_id INNER JOIN answers as a ON \
  q.question_id = a.question_id WHERE c.description =\'{0}\'".format(categoryDescription);
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
