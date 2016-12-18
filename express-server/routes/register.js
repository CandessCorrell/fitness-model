'use strict';
var clientJS = require('./helper-functions/client.js');
var client = clientJS.client;
// bodyParser enables post request body parsing
var bodyParser = require('body-parser');
var cors = require('cors');

var TAG = "\nREGISTER | ";

module.exports = {
  '/register': {
    methods: [ 'post'],
    middleware: [bodyParser.urlencoded({extended: true}), bodyParser.json(), cors()],
    fn: function(request, response) {
      if (request.method === 'POST') {
        console.log(TAG, "Called /register(POST)");
        console.log(TAG, 'request.body.registerJson', JSON.stringify(request.body.registerJson));
    	  checkExistingUsers(request.body.registerJson,
    	  	function(resp) {
    	  	// This is the callback - we move into this if the function returns data as expected
    	  	console.log(TAG, 'moving into register callback');
    	  	return response.status(200).send(resp);
        }, function(err) {
    	  	// This is the errback - we move into this if register returns an error
    	  	console.log(TAG, 'Something went wrong in /register');
    	  	console.log(TAG, err);
    	  	return response.status(400).send(err);
    	  })
      } else {
        console.log(TAG, "Invalid HTTP HEADER");
        return response.status(400);
      }
  	}
  }
}

function checkExistingUsers(registerJson, callBack, errBack) {
  var checkExistingTeamQuery = "SELECT team_name FROM users WHERE \
  team_name=\'{0}\' RETURNING team_name, user_id;".format(registerJson.team_name);
  client.query(checkExistingTeamQuery, function (err, result) {
    if (err) {
      return errBack(err);
    }
    else {
      if (result.rows.length === 1) {
        return errBack('User already exists');
      } else return register(registerJson, callBack, errBack);
    }
  })
}

function register(registerJson, callBack, errBack) {
  var team_name = registerJson.team_name;
  var password = registerJson.password;
  var registerQuery = "INSERT INTO users (team_name, password) \
  VALUES (\'{0}\', \'{1}\')".format(team_name, password);
  console.log(TAG, registerQuery);
  client.query(registerQuery, function (err, result) {
    if (err) {
        console.log(TAG, "registerQuery: ", registerQuery);
        return errBack(err);
      } else {
        // for (var i = 0; i < result.rows.length; i++) {
        //  console.log(TAG, funcTAG, "row[" + i + "]: " + JSON.stringify(result.rows[i]));
        // }
        console.log(TAG, "SQL insert succeeded!");
        return callBack(result);
    }
  })
}
