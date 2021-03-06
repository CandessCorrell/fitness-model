'use strict';
var clientJS = require('./helper-functions/client.js');
var client = clientJS.client;
var cors = require('cors');

var TAG = "QUESTIONS | ";

module.exports = {
// Get questions for a particular category
  '/questions/:category_id': {
    methods: ['get'],
    middleware: [cors()],
    fn: function(request, response){  
      console.log(TAG, "\nCalled /users(GET)");
  	  var category_id = request.url.split("/");
      category_id = category_id[2];
      console.log(TAG, "Category ID is : " + category_id);
  	  get_questions( category_id,
  	  	function(resp) {
  	  	// This is the callback - we move into this if the function returns data as expected
  	  	console.log(TAG, 'moving into get_questions callback');
  	  	// console.log(TAG, 'resp: ' + JSON.stringify(resp));
  	  	return response.status(200).send(resp);
      }, function(err) {
  	  	// This is the errback - we move into this if get_questions returns an error
  	  	console.log(TAG, 'Something went wrong in ' + TAG);
  	  	console.log(TAG, err);
  	  	return response.status(400).send(err);
  	  })
  	}
  }
}

function get_questions(categoryDescription, callBack, errBack) {
  var getQuestionsQuery = "SELECT * FROM questions INNER JOIN categories \
   ON questions.category_id = categories.category_id WHERE \
    categories.category_id = \'{0}\'".format(categoryDescription);
  console.log(TAG, getQuestionsQuery);
  client.query(getQuestionsQuery, function(err, result) {
    if (err || result.rows[0] === 'undefined' || typeof result.rows[0] === 'undefined') {
        console.log(TAG, getQuestionsQuery);
        return errBack(err);
      } else {
        // for (var i = 0; i < result.rows.length; i++) {
        //  console.log(TAG, funcTAG, "row[" + i + "]: " + JSON.stringify(result.rows[i]));
        // }
        return callBack(result);
    }
  })
}
