'use strict';
var clientJS = require('./helper-functions/client.js');
var client = clientJS.client;
// bodyParser enables post request body parsing
var bodyParser = require('body-parser');
var cors = require('cors');

var TAG = "\nLOGIN | ";

module.exports = {
  '/login': {
    methods: [ 'post'],
    middleware: [bodyParser.urlencoded({extended: true}), bodyParser.json(), cors()],
    fn: function(request, response) {
      if (request.method === 'POST') {
        console.log(TAG, "Called /login(POST)");
        console.log(TAG, 'request.body.loginJson', JSON.stringify(request.body.loginJson));
    	  login(request.body.loginJson,
    	  	function(resp) {
    	  	// This is the callback - we move into this if the function returns data as expected
    	  	console.log(TAG, 'moving into login callback');
    	  	return response.status(200).send(resp);
        }, function(err) {
    	  	// This is the errback - we move into this if login returns an error
    	  	console.log(TAG, 'Something went wrong in ' + TAG);
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

function login(loginJson, callBack, errBack) {
  var team_name = loginJson.team_name;
  var password = loginJson.password;
  var loginQuery = "SELECT user_id, team_name FROM users WHERE team_name=\'{0}\' AND \
  password=\'{1}\'".format(team_name, password);
  console.log(TAG, loginQuery);
  client.query(loginQuery, function (err, result) {
    if (err || result.rows[0] === 'undefined' || typeof result.rows[0] === 'undefined') {
        console.log(TAG, "loginQuery: ", loginQuery);
        return errBack(err);
      } else {
        // for (var i = 0; i < result.rows.length; i++) {
        //  console.log(TAG, funcTAG, "row[" + i + "]: " + JSON.stringify(result.rows[i]));
        // }
        return callBack(result);
    }
  })
}
