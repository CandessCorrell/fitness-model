'use strict';
var clientJS = require('./helper-functions/client.js');
var client = clientJS.client;
// bodyParser enables post request body parsing
var bodyParser = require('body-parser');

var TAG = "RESULTS | ";

module.exports = {
  '/results': {
    methods: ['get', 'post'],
    middleware: [bodyParser.urlencoded({extended: true}), bodyParser.json()],

    fn: function(request, response){
      if (request.method === 'GET') {
        console.log(TAG, "\nCalled /results(GET)");
    	  
    	  get_results(
    	  	function(resp) {
    	  	// This is the callback - we move into this if the function returns data as expected
    	  	console.log(TAG, 'moving into get_results callback');
    	  	// console.log(TAG, 'resp: ' + JSON.stringify(resp));
    	  	return response.status(200).send(resp);
          
          }, function(err) {
    	  	// This is the errback - we move into this if get_results returns an error
    	  	console.log(TAG, 'Something went wrong in ' + TAG);
    	  	console.log(TAG, err);
    	  	return response.status(400).send(err);
  	    })
      } else if (request.method === 'POST') {
        response.status(200).send("Good job buddy!");
      } else response.status(400).send("HTTP method not supported for route \"\/results\"");
  	}
  },

  '/user_results': {
    methods: ['get'],
    fn: function(request, response) {
      console.log(TAG, "\nCalled /results/" + request.query.user_id);

      get_results_by_user_id(request.query.user_id,
        function(resp) {
        console.log(TAG, 'moving into get_results_by_user_id callback');
        return response.status(200).send(resp);
        }, function(err) {
        console.log(TAG, 'errBack of get_results_by_user_id');
        console.log(TAG, err);
        return response.status(400).send(err);
      })
    }
  }
}

function get_results(categoryDescription, callBack, errBack) {
  var getResultsQuery = "SELECT * FROM results";
  console.log(TAG, getResultsQuery);
  client.query(getResultsQuery, function(err, result) {
    if (err || result.rows[0] === 'undefined' || typeof result.rows[0] === 'undefined') {
        console.log(TAG, getResultsQuery);
        return errBack(err);
      } else {
        // for (var i = 0; i < result.rows.length; i++) {
        //  console.log(TAG, funcTAG, "row[" + i + "]: " + JSON.stringify(result.rows[i]));
        // }
        return callBack(result);
    }
  })
}

function get_results_by_user_id(userId, callBack, errBack) {
  var getResultsQuery = "SELECT * FROM results WHERE user_id={0}".format(userId);
  console.log(TAG, getResultsQuery);
  client.query(getResultsQuery, function(err, result) {
    if (err || result.rows[0] === 'undefined' || typeof result.rows[0] === 'undefined') {
      console.log(TAG, getResultsQuery);
      return errBack(err);
    } else {
      return callBack(result);
    }
  }) 
}
