'use strict';
var clientJS = require('./helper-functions/client.js');
var client = clientJS.client;
// bodyParser enables post request body parsing
var bodyParser = require('body-parser');

var TAG = "\nANSWERS | ";

module.exports = {
  '/answers': {
    methods: ['get', 'post'],
    middleware: [bodyParser.urlencoded({extended: true}), bodyParser.json()],
    fn: function(request, response) {
      if (request.method === 'GET') {
        console.log(TAG, "Called /answers(GET)");
    	  get_answers(
    	  	function(resp) {
    	  	// This is the callback - we move into this if the function returns data as expected
    	  	console.log(TAG, 'moving into get_answers callback');
    	  	// console.log(TAG, 'resp: ' + JSON.stringify(resp));
    	  	return response.status(200).send(resp);
        }, function(err) {
    	  	// This is the errback - we move into this if get_answers returns an error
    	  	console.log(TAG, 'Something went wrong in ' + TAG);
    	  	console.log(TAG, err);
    	  	return response.status(400).send(err);
    	  })
      } else if (request.method === 'POST') {
        console.log(TAG, "Called /answers(POST)");
        console.log(TAG, "JSON.stringify(request): ", JSON.stringify(request.body));
        if (request.body.description == null) response.status(400).send("Whoops! Check your request.body.description")
        else if (request.body.score == null) response.status(400).send("Whoops! Check your request.body.score")
        else if (request.body.question_id == null) response.status(400).send("Whoops! Check your request.body.question_id")
        else if (request.body.recommendation == null) response.status(400).send("Whoops! Check your request.body.recommendation")
        else post_answer(request.body.question_id, request.body.description, request.body.score, request.body.recommendation,
          function (resp) {
            console.log(TAG, 'moving into post_answer callback');
            return response.status(200).send(resp);
          }, function (err) {
            console.log(TAG, 'moving into post_answer errback');
            return response.status(400).send(err);
          })
      }
  	}
  }
}

function get_answers(callBack, errBack) {
  var getAnswersQuery = "SELECT * FROM answers";
  console.log(TAG, getAnswersQuery);
  client.query(getAnswersQuery, function(err, result) {
    if (err || result.rows[0] === 'undefined' || typeof result.rows[0] === 'undefined') {
        console.log(TAG, "getAnswersQuery: ", getAnswersQuery);
        return errBack(err);
      } else {
        // for (var i = 0; i < result.rows.length; i++) {
        //  console.log(TAG, funcTAG, "row[" + i + "]: " + JSON.stringify(result.rows[i]));
        // }
        return callBack(result);
    }
  })
}

function post_answer(question_id, description, score, recommendation, callBack, errBack) {
  var postAnswerQuery = "INSERT INTO answers (question_id, description, score, recommendation) \
  VALUES ($${0}$$, $${1}$$, $${2}$$, $${3}$$)".format(question_id, description, score, recommendation)
  console.log(TAG, "postAnswerQuery: ", postAnswerQuery);
  client.query(postAnswerQuery, function(err, result) {
    if (err) {
      console.error("Error running insert into answers");
      return errBack(err)
    } else {
      console.info(TAG, "Success!");
      return callBack("Successfully inserted new answer into the database!");
    }
  })

}
