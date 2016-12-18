'use strict';
var clientJS = require('./helper-functions/client.js');
var client = clientJS.client;
var cors = require('cors');

var TAG = "\nVERSIONS | ";

module.exports = {
  '/versions': {
    methods: ['get'],
    middleware: [cors()],
    fn: function(request, response){
      console.log(TAG, "Called /versions(GET)");

  	  get_versions(
  	  	function(resp) {
  	  	// This is the callback - we move into this if the function returns data as expected
  	  	console.log(TAG, 'moving into get_versions callback');
  	  	// console.log(TAG, 'resp: ' + JSON.stringify(resp));
  	  	return response.status(200).send(resp);
      }, function(err) {
  	  	// This is the errback - we move into this if get_versions returns an error
  	  	console.log(TAG, 'Something went wrong in ' + TAG);
  	  	console.log(TAG, err);
  	  	return response.status(400).send(err);
  	  })
  	}
  }
}

function get_versions(callBack, errBack) {
  var getVersionsQuery = "SELECT * FROM versions";
  console.log(TAG, getVersionsQuery);
  client.query(getVersionsQuery, function(err, result) {
    if (err || result.rows[0] === 'undefined' || typeof result.rows[0] === 'undefined') {
        console.log(TAG, getVersionsQuery);
        return errBack(err);
      } else {
        // for (var i = 0; i < result.rows.length; i++) {
        //  console.log(TAG, funcTAG, "row[" + i + "]: " + JSON.stringify(result.rows[i]));
        // }
        return callBack(result);
    }
  })
}
