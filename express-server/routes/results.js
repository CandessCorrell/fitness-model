'use strict';
var clientJS = require('./helper-functions/client.js');
var client = clientJS.client;
// bodyParser enables post request body parsing
var bodyParser = require('body-parser');
var cors = require('cors');

var TAG = "\nRESULTS | ";

module.exports = {
  '/results': {
    methods: ['get', 'post'],
    middleware: [bodyParser.urlencoded({extended: true}), bodyParser.json(), cors()],

    fn: function(request, response){
      if (request.method === 'GET') {
        console.log(TAG, "Called /results(GET)");
    	  
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
        console.log(TAG, "Called /results(POST)");
        console.log(TAG, "typeof request.body.user_id: ", request.body.user_id);
        console.log(TAG, "request.body.assessment_id: ", request.body.assessment_id);
        if (request.body.user_id == null) {
          console.log(TAG, "Bad user_id")
          response.status(400).send("Bad user_id");
        } else if (request.body.assessment_id == null) {
          console.log(TAG, "Bad assessment_id")
          response.status(400).send("Bad assessment_id");
        } else {
          post_result(request.body.user_id, request.body.assessment_id, function (resp) {
            response.status(200).send(resp);
          }, function (err) {
            response.status(400).send(err);
          })
        }
      } else response.status(400).send("HTTP method not supported for route \"\/results\"");
  	}
  },

  '/results/:user_id': {
    methods: ['get'],
    fn: function(request, response) {
      var user_id = request.url.split("/");
      user_id = user_id[2];
      get_results_by_user_id(user_id,
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

function get_results(callBack, errBack) {
  var getAllResultsQuery = "SELECT * FROM results";
  console.log(TAG, getAllResultsQuery);
  client.query(getAllResultsQuery, function(err, result) {
    if (err || result.rows[0] === 'undefined' || typeof result.rows[0] === 'undefined') {
        console.log(TAG, getAllResultsQuery);
        return errBack(err);
      } else {
        return callBack(result);
      }
  })
}

function get_results_by_user_id(user_id, callBack, errBack) {
  var getUserResultsQuery = "SELECT * FROM results WHERE user_id={0}".format(user_id);
  console.log(TAG, getUserResultsQuery);
  client.query(getUserResultsQuery, function(err, result) {
    if (err || result.rows[0] === 'undefined' || typeof result.rows[0] === 'undefined') {
      console.log(TAG, getUserResultsQuery);
      return errBack(err);
    } else {
      return callBack(result);
    }
  }) 
}

function post_result(user_id, assessment_id, callBack, errBack) {
  var postResultQuery = "INSERT INTO results (user_id, assessment_id) \
  VALUES($${0}$$, $${1}$$)".format(user_id, assessment_id);
  client.query(postResultQuery, function (err, result) {
    if (err) {
      console.log(TAG, "post_result SQL Query not successful");
      return errBack(err)
    } else {
      console.log(TAG, "post_result SQL Query successful!");
      return callBack("Successfully inserted new response!");
    }
  })
}
