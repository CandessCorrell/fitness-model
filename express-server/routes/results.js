'use strict';
var clientJS = require('./helper-functions/client.js');
var client = clientJS.client;
// bodyParser enables post request body parsing
var bodyParser = require('body-parser');
var cors = require('cors');

var TAG = "\nRESULTS | ";
var DEFAULT_RESPONSE = "Select"; // Make this configurable?

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

  '/result/:id': {
    methods: ['get'],
    middleware: [cors(), bodyParser.urlencoded({extended: true}), bodyParser.json()],
    fn: function(request, response) {
      if (request.method == 'GET') {
        var result_id = request.url.split("/");
        result_id = result_id[2];
        get_result_by_result_id(result_id,
        function(resp) {
          console.log(TAG, 'moving into get_result_by_result_id callback');
          return response.status(200).send(resp);
        }, function(err) {
          console.log(TAG, 'errBack of get_result_by_result_id');
          console.log(TAG, err);
          return response.status(400).send(err);
        })
      } else {
        var verbErr = "HTTP VERB " + request.method + " not supported for route results/:id"
        response.status(400).send(verbErr);
      }
    }
  },

  '/results/:id': {
    methods: ['get', 'put'],
    middleware: [cors(), bodyParser.urlencoded({extended: true}), bodyParser.json()],
    fn: function(request, response) {
      if (request.method == 'GET') {
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
      } else if (request.method === 'PUT') {
          var result_id = request.url.split("/");
          result_id = result_id[2]
          console.log(TAG, "result_id:", result_id);
          put_result(result_id, request.body.resultJson, function (resp) {
            response.status(200).send(resp);
          }, function (err) {
            response.status(400).send(err);
          })
      } else {
        var verbErr = "HTTP VERB " + request.method + " not supported for route results/:id"
        response.status(400).send(verbErr);
      }
    }
  }
}

function put_result(result_id, resultJson, callBack, errBack) {
  var updateTable = "UPDATE results ";
  var setInfo = "SET ";
  var chooser = " WHERE result_id={0}".format(result_id);
  for (var key in resultJson) {
    setInfo = setInfo + key + "=" + resultJson[key] + ", ";
  }
  setInfo = setInfo.slice(0, -2);
  console.log(TAG, setInfo)
  var putResultQuery = updateTable + setInfo + chooser;
  console.log(TAG, "putResultQuery:", putResultQuery);
  client.query(putResultQuery, function (err, result) {
    if (err) {
      console.log(TAG, "Error in SQL UPDATE in put_result");
      return errBack(err);
    } else {
      var putString = "Successfully updated results/" + result_id
      return callBack(putString);
    }
  })
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

function get_result_by_result_id(result_id, callBack, errBack) {
  var getResultQuery = "SELECT categories.description as category, questions.description as question, \
  score, recommendation FROM responses as resp INNER JOIN ANSWERS as a ON resp.answer_id = a.answer_id \
  INNER JOIN questions ON questions.question_id = a.question_id INNER JOIN categories ON \
  categories.category_id = questions.category_id WHERE result_id={0}".format(result_id);
  console.log(TAG, getResultQuery);
  client.query(getResultQuery, function(err, result) {
    if (err || result.rows[0] === 'undefined' || typeof result.rows[0] === 'undefined') {
      console.log(TAG, getResultQuery);
      return errBack(err);
    } else {
      return callBack(result);
    }
  })
}

function post_result(user_id, assessment_id, callBack, errBack) {
  var postResultQuery = "INSERT INTO results (user_id, assessment_id) \
  VALUES($${0}$$, $${1}$$) RETURNING result_id".format(user_id, assessment_id);
  client.query(postResultQuery, function (err, result) {
    if (err) {
      console.log(TAG, "post_result SQL Query not successful");
      return errBack(err)
    } else {
      console.log(TAG, "post_result SQL Query successful!");
      var result_id = result.rows[0].result_id;
      get_default_answers(result_id, callBack, errBack);
    }
  })
}

function get_default_answers(result_id, callBack, errBack) {
  // Gets a list of all the default answers from the answers table
  var defaultResponseQuery = "SELECT answer_id, question_id FROM answers WHERE description='{0}'".format(DEFAULT_RESPONSE);
  client.query(defaultResponseQuery, function (err, result) {
    if (err) {
      console.log(TAG, "get_default_answers SQL Query not successful!");
      return errBack(err);
    } else {
      console.log(TAG, "get_default_answers SQL Query successful!");
      var defaultAnswers = result.rows;
      initialize_responses(result_id, defaultAnswers, callBack, errBack);
    }
  })
}

function initialize_responses(result_id, defaultAnswers, callBack, errBack) {
  // Takes the list of the default answers, and inserts them into the responses table, using the result_id we just created
  var total = defaultAnswers.length;
  for (var row in defaultAnswers) {
    var question_id = defaultAnswers[row].question_id;    
    var answer_id = defaultAnswers[row].answer_id;    
    var insertDefaultResponseQuery = "INSERT INTO responses (result_id,question_id,answer_id) VALUES ($${0}$$,$${1}$$,$${2}$$)".format(result_id,question_id,answer_id);
    client.query(insertDefaultResponseQuery, function (err, result) {
      if (err) {
        console.log(TAG, "initialize_responses SQL Query not successful!");
        return errBack(err);
      } else {
        console.log(TAG, "initialize_responses SQL Query successful!");

        //Due to all this callback madness, this is how I'm figuring out when I'm done initializing the responses
        total--; 
        if (total < 1) {
          return callBack({result_id:result_id}); // Rather than return a string, I'm returning the result_id so the frontend will know where to navigate
        }
      }
    })
  }
}
