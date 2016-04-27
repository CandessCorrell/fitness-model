'use strict';
var clientJS = require('./helper-functions/client.js');
var client = clientJS.client;

var TAG = "USERS | ";

module.exports = {
  '/users': {
    methods: ['get'],
    fn: function(request, response){  
      console.log(TAG, "\nCalled /users(GET)");
      console.log(TAG, "query is : " + JSON.stringify(request.query));
  	  
  	  get_users( 
  	  	function(resp) {
  	  	// This is the callback - we move into this if the function returns data as expected
  	  	console.log(TAG, 'moving into get_users callback');
  	  	// console.log(TAG, 'resp: ' + JSON.stringify(resp));
  	  	return response.status(200).send(resp);
      }, function(err) {
  	  	// This is the errback - we move into this if get_users returns an error
  	  	console.log(TAG, 'Something went wrong in ' + TAG);
  	  	console.log(TAG, err);
  	  	return response.status(400).send(err);
  	  })
  	}
  }
}

function get_users(callBack, errBack) {
  var getUsersQuery = "SELECT * FROM users";
  console.log(TAG, getUsersQuery);
  client.query(getUsersQuery, function(err, result) {
    if (err || result.rows[0] === 'undefined' || typeof result.rows[0] === 'undefined') {
        return errBack(err);
      } else {
        // for (var i = 0; i < result.rows.length; i++) {
        //  console.log(TAG, funcTAG, "row[" + i + "]: " + JSON.stringify(result.rows[i]));
        // }
        return callBack(result);
    }
  })
}
