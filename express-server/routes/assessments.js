'use strict';
var clientJS = require('./helper-functions/client.js');
var client = clientJS.client;
// bodyParser enables post request body parsing
var bodyParser = require('body-parser');
var cors = require('cors');

var TAG = "\nASSESSMENTS | ";
var DEFAULT_RESPONSE = "Select"; // Make this configurable?

module.exports = {
  '/assessments': {
    methods: ['get', 'post'],
    middleware: [bodyParser.urlencoded({extended: true}), bodyParser.json(), cors()],

    fn: function(request, response){
      if (request.method === 'GET') {
        console.log(TAG, "Called /assessments(GET)");

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
      } else if (request.method === 'POST') {
        console.log(TAG, "Called /assessments(POST)");
        console.log(TAG, "typeof request.body.user_id: ", request.body.user_id);
        console.log(TAG, "request.body.version_id: ", request.body.version_id);
        if (request.body.user_id == null) {
          console.log(TAG, "Bad user_id")
          response.status(400).send("Bad user_id");
        } else if (request.body.version_id == null) {
          console.log(TAG, "Bad version_id")
          response.status(400).send("Bad version_id");
        } else {
          post_result(request.body.user_id, request.body.version_id, function (resp) {
            response.status(200).send(resp);
          }, function (err) {
            response.status(400).send(err);
          })
        }
      } else response.status(400).send("HTTP method not supported for route \"\/assessments\"");
  	}
  },

  '/assessment/:id': {
    methods: ['get'],
    middleware: [cors(), bodyParser.urlencoded({extended: true}), bodyParser.json()],
    fn: function(request, response) {
      if (request.method == 'GET') {
        var assessment_id = request.url.split("/");
        assessment_id = assessment_id[2];
        get_assessment_by_assessment_id(assessment_id,
        function(resp) {
          console.log(TAG, 'moving into get_assessment_by_assessment_id callback');
          return response.status(200).send(resp);
        }, function(err) {
          console.log(TAG, 'errBack of get_assessment_by_assessment_id');
          console.log(TAG, err);
          return response.status(400).send(err);
        })
      } else {
        var verbErr = "HTTP VERB " + request.method + " not supported for route assessment/:id"
        response.status(400).send(verbErr);
      }
    }
  },

  '/assessments/:id': {
    methods: ['get', 'put'],
    middleware: [cors(), bodyParser.urlencoded({extended: true}), bodyParser.json()],
    fn: function(request, response) {
      if (request.method == 'GET') {
        var user_id = request.url.split("/");
        user_id = user_id[2];
        get_assessments_by_user_id(user_id,
          function(resp) {
          console.log(TAG, 'moving into get_assessments_by_user_id callback');
          return response.status(200).send(resp);
          }, function(err) {
          console.log(TAG, 'errBack of get_assessments_by_user_id');
          console.log(TAG, err);
          return response.status(400).send(err);
        })
      } else if (request.method === 'PUT') {
          var assessment_id = request.url.split("/");
          assessment_id = assessment_id[2]
          console.log(TAG, "assessment_id:", assessment_id);
          put_result(assessment_id, request.body.resultJson, function (resp) {
            response.status(200).send(resp);
          }, function (err) {
            response.status(400).send(err);
          })
      } else {
        var verbErr = "HTTP VERB " + request.method + " not supported for route assessments/:id"
        response.status(400).send(verbErr);
      }
    }
  }
}

function put_assessment(assessment_id, assessmentJson, callBack, errBack) {
  var updateTable = "UPDATE results ";
  var setInfo = "SET ";
  var chooser = " WHERE assessment_id={0}".format(assessment_id);
  for (var key in resultJson) {
    setInfo = setInfo + key + "=" + resultJson[key] + ", ";
  }
  setInfo = setInfo.slice(0, -2);
  console.log(TAG, setInfo)
  var putAssessmentQuery = updateTable + setInfo + chooser;
  console.log(TAG, "putAssessmentQuery:", putAssessmentQuery);
  client.query(putAssessmentQuery, function (err, result) {
    if (err) {
      console.log(TAG, "Error in SQL UPDATE in put_assessment");
      return errBack(err);
    } else {
      var putString = "Successfully updated assessments/" + assessment_id
      return callBack(putString);
    }
  })
}

function get_assessments(callBack, errBack) {
  var getAllAssessmentsQuery = "SELECT * FROM assessments";
  console.log(TAG, getAllAssessmentsQuery);
  client.query(getAllAssessmentsQuery, function(err, result) {
    if (err || result.rows[0] === 'undefined' || typeof result.rows[0] === 'undefined') {
        console.log(TAG, getAllAssessmentsQuery);
        return errBack(err);
      } else {
        return callBack(result);
      }
  })
}

function get_assessments_by_user_id(user_id, callBack, errBack) {
  var getUserAssessmentsQuery = "SELECT * FROM assessments WHERE user_id={0}".format(user_id);
  console.log(TAG, getUserAssessmentsQuery);
  client.query(getUserAssessmentsQuery, function(err, result) {
    if (err || result.rows[0] === 'undefined' || typeof result.rows[0] === 'undefined') {
      console.log(TAG, getUserAssessmentsQuery);
      return errBack(err);
    } else {
      return callBack(result);
    }
  })
}

function get_assessment_by_assessment_id(assessment_id, callBack, errBack) {
  var getAssessmentQuery = "SELECT categories.description as category, questions.description as question, \
  score, recommendation FROM responses as resp INNER JOIN ANSWERS as a ON resp.answer_id = a.answer_id \
  INNER JOIN questions ON questions.question_id = a.question_id INNER JOIN categories ON \
  categories.category_id = questions.category_id WHERE assessment_id={0}".format(assessment_id);
  console.log(TAG, getAssessmentQuery);
  client.query(getAssessmentQuery, function(err, result) {
    if (err || result.rows[0] === 'undefined' || typeof result.rows[0] === 'undefined') {
      console.log(TAG, getAssessmentQuery);
      return errBack(err);
    } else {
      return callBack(result);
    }
  })
}

function post_assessment(user_id, version_id, callBack, errBack) {
  var postAssessmentQuery = "INSERT INTO assessments (user_id, version_id) \
  VALUES($${0}$$, $${1}$$) RETURNING assessment_id".format(user_id, version_id);
  client.query(postAssessmentQuery, function (err, result) {
    if (err) {
      console.log(TAG, "post_assessment SQL Query not successful");
      return errBack(err)
    } else {
      console.log(TAG, "post_assessment SQL Query successful!");
      var assessment_id = result.rows[0].assessment_id;
      get_default_answers(assessment_id, callBack, errBack);
    }
  })
}

function get_default_answers(assessment_id, callBack, errBack) {
  // Gets a list of all the default answers from the answers table
  var defaultResponseQuery = "SELECT answer_id, question_id FROM answers WHERE description='{0}'".format(DEFAULT_RESPONSE);
  client.query(defaultResponseQuery, function (err, result) {
    if (err) {
      console.log(TAG, "get_default_answers SQL Query not successful!");
      return errBack(err);
    } else {
      console.log(TAG, "get_default_answers SQL Query successful!");
      var defaultAnswers = result.rows;
      initialize_responses(assessment_id, defaultAnswers, callBack, errBack);
    }
  })
}

function initialize_responses(assessment_id, defaultAnswers, callBack, errBack) {
  // Takes the list of the default answers, and inserts them into the responses table, using the assessment_id we just created
  var total = defaultAnswers.length;
  for (var row in defaultAnswers) {
    var question_id = defaultAnswers[row].question_id;
    var answer_id = defaultAnswers[row].answer_id;
    var insertDefaultResponseQuery = "INSERT INTO responses (assessment_id,question_id,answer_id) VALUES ($${0}$$,$${1}$$,$${2}$$)".format(assessment_id,question_id,answer_id);
    client.query(insertDefaultResponseQuery, function (err, result) {
      if (err) {
        console.log(TAG, "initialize_responses SQL Query not successful!");
        return errBack(err);
      } else {
        console.log(TAG, "initialize_responses SQL Query successful!");

        //Due to all this callback madness, this is how I'm figuring out when I'm done initializing the responses
        total--;
        if (total < 1) {
          return callBack({assessment_id:assessment_id}); // Rather than return a string, I'm returning the result_id so the frontend will know where to navigate
        }
      }
    })
  }
}
