'use strict';
var clientJS = require('./helper-functions/client.js');
var client = clientJS.client;

var TAG = "RESPONSES | ";

module.exports = {
  '/responses': {
    methods: ['get'],
    fn: function(request, response){  
      console.log(TAG, "\nCalled /responses(GET)");
  	  
  	  get_responses(
  	  	function(resp) {
  	  	// This is the callback - we move into this if the function returns data as expected
  	  	console.log(TAG, 'moving into get_responses callback');
  	  	// console.log(TAG, 'resp: ' + JSON.stringify(resp));
  	  	return response.status(200).send(resp);
      }, function(err) {
  	  	// This is the errback - we move into this if get_responses returns an error
  	  	console.log(TAG, 'Returning from errBack in ' + TAG);
  	  	console.log(TAG, err);
  	  	return response.status(400).send(err);
  	  })
  	}
  }
}

function get_responses(callBack, errBack) {
  var getResponsesQuery = "SELECT * FROM responses";
  console.log(TAG, getResponsesQuery);
  client.query(getResponsesQuery, function(err, result) {
    if (err || result.rows[0] === 'undefined' || typeof result.rows[0] === 'undefined') {
        console.log(TAG, getResponsesQuery);
        return errBack(err);
      } else {
        // for (var i = 0; i < result.rows.length; i++) {
        //  console.log(TAG, funcTAG, "row[" + i + "]: " + JSON.stringify(result.rows[i]));
        // }
        return callBack(result);
    }
  })
}
