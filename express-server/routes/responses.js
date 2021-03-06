'use strict';
var clientJS = require('./helper-functions/client.js');
var client = clientJS.client;
// bodyParser enables post request body parsing
var bodyParser = require('body-parser');
var cors = require('cors');

var TAG = "\nRESPONSES | ";

module.exports = {
  '/responses': {
    methods: ['get', 'post'],
    middleware: [bodyParser.urlencoded({extended: true}), bodyParser.json(), cors()],

    fn: function(request, response){
      if (request.method === 'GET') {
        console.log(TAG, "\nCalled /responses(GET)");

    	  get_responses(
    	  	function (resp) {
    	  	// This is the callback - we move into this if the function returns data as expected
    	  	console.log(TAG, 'moving into get_responses callback');
    	  	// console.log(TAG, 'resp: ' + JSON.stringify(resp));
    	  	return response.status(200).send(resp);
        }, function (err) {
    	  	// This is the errback - we move into this if get_responses returns an error
    	  	console.log(TAG, 'Returning from errBack in ' + TAG);
    	  	console.log(TAG, err);
    	  	return response.status(400).send(err);
    	  })
      } else if (request.method === 'POST') {
        console.log(TAG, "Called /responses(POST)");
        console.log(TAG, "request.body is: " + JSON.stringify(request.body));
        if (request.body.result_id == null) {
          console.log("Your assessment_id is | " + request.body.assessment_id + " | and this is invalid")
          response.status(400).send("Check your assessment_id")
        }
        if (request.body.question_id == null) {
          console.log("Your question_id is | " + request.body.question_id + " | and this is invalid")
          response.status(400).send("Check your question_id")
        }
        if (request.body.answer_id == null) {
          console.log("Your answer_id is | " + request.body.answer_id + " | and this is invalid")
          response.status(400).send("Check your answer_id")
        } else {
          post_response(request.body.assessment_id, request.body.question_id, request.body.answer_id,
            function (resp) {
              response.status(200).send(resp);
            }, function (err) {
              response.status(400).send(err);
            }
          )
        }
      } else response.status(400).send("HTTP method you supplied for route \"responses\" is not supported");
  	}
  },

  '/responses/:id': {
    methods: ['put'],
    middleware: [bodyParser.urlencoded({extended: true}), bodyParser.json(), cors()],

    fn: function(request, response) {
      if (request.method==='PUT') {
        var response_id = request.url.split("/");
        response_id = response_id[2]
        console.log(TAG, "response_id:", response_id);
        getAnswerId(response_id, request.body.responseJson, function (resp) {
          response.status(200).send(resp);
        }, function (err) {
          response.status(400).send(err);
        })
      }
      else {
        var verbErr = "HTTP VERB " + request.method + " not supported for route response/:id"
        response.status(400).send(verbErr);
      }
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

function getAnswerId (response_id, responseJson, callBack, errBack) {
  console.log('responseJson in getAnswerId', JSON.stringify(responseJson))

  var getAnswerQuery = "SELECT answer_id FROM answers as a INNER JOIN questions as q ON q.question_id = a.question_id \
  WHERE a.description =\'{0}\' AND q.question_id = \'{1}\'".format(responseJson.answer_description, responseJson.question_id);
  console.log(TAG, 'responseJson from put_response before getAnswerId_query:', JSON.stringify(responseJson))
  client.query(getAnswerQuery, function (err, result) {
    if (err) {
      console.log(TAG, "Unable to find question with acceptable answer of: ", responseJson.answer_description)
      return errBack(err)
    } else {
      console.log(TAG, 'Found new answer in DB to associate with question_id: ' + responseJson.question_id)
      console.log(TAG, "typeof answer_id =", typeof(result.rows[0].answer_id), "with value:", result.rows[0].answer_id)
      responseJson.answer_id = result.rows[0].answer_id
      return put_response(response_id, responseJson, callBack, errBack)
    }
  })
}

function put_response(response_id, responseJson, callBack, errBack) {
  console.log('responseJson inside put_response:', JSON.stringify(responseJson))
  var updateTable = "UPDATE responses ";
  var setInfo = "SET ";
  var chooser = " WHERE response_id={0}".format(response_id);

  for (var key in responseJson) {
    if (key == 'answer_description') {
    } else {
    setInfo = setInfo + key + "=" + responseJson[key] + ", ";
    }
  }
  setInfo = setInfo.slice(0, -2);
  console.log(TAG, setInfo)
  var putResponseQuery = updateTable + setInfo + chooser;
  console.log(TAG, "putResponseQuery:", putResponseQuery);
  client.query(putResponseQuery, function (err, result) {
    if (err) {
      console.log(TAG, "Error in SQL UPDATE in put_response");
      return errBack(err);
    } else {
      var putString = "Successfully updated responses/" + response_id
      return callBack(putString);
    }
  })
}

function post_response(assessment_id, question_id, answer_id, callBack, errBack) {
  var postResponseQuery = "INSERT INTO responses (assessment_id, question_id, answer_id) \
   VALUES ($${0}$$, $${1}$$, $${2}$$)".format(assessment_id, question_id, answer_id);
  client.query(postResponseQuery, function (err, result) {
    if (err) {
      console.log(TAG, "SQL insert failed.")
      return errBack(err)
    } else {
      console.log(TAG, "SQL insert succeeded!")
      return callBack("Successfully inserted new response!");
    }
  })
}
