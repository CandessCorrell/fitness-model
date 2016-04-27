'use strict';
var clientJS = require('./helper-functions/client.js');
var client = clientJS.client;

var TAG = "ASSESSMENTS | ";

module.exports = {
  '/assessments': {
    methods: ['get'],
    fn: function(request, response){  
      console.log(TAG, "\nCalled /assessments(GET)");
  	  
  	  get_assessments(
  	  	function(resp) {
  	  	// This is the callback - we move into this if the function returns data as expected
  	  	console.log(TAG, 'moving into get_assessments callback');
  	  	// console.log(TAG, 'resp: ' + JSON.stringify(resp));
  	  	return response.status(200).send(resp);
      }, function(err) {
  	  	// This is the errback - we move into this if get_assessments returns an error
  	  	console.log(TAG, 'Something went wrong in ' + TAG);
  	  	console.log(TAG, err);
  	  	return response.status(400).send(err);
  	  })
  	}
  }
}

function get_assessments(callBack, errBack) {
  var getAssessmentsQuery = "SELECT * FROM assessments";
  console.log(TAG, getAssessmentsQuery);
  client.query(getAssessmentsQuery, function(err, result) {
    if (err || result.rows[0] === 'undefined' || typeof result.rows[0] === 'undefined') {
        console.log(TAG, getAssessmentsQuery);
        return errBack(err);
      } else {
        // for (var i = 0; i < result.rows.length; i++) {
        //  console.log(TAG, funcTAG, "row[" + i + "]: " + JSON.stringify(result.rows[i]));
        // }
        return callBack(result);
    }
  })
}
