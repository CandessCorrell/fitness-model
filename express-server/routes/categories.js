'use strict';
var clientJS = require('./helper-functions/client.js');
var client = clientJS.client;

var TAG = "CATEGORIES | ";

module.exports = {
  '/categories': {
    methods: ['get'],
    fn: function(request, response){  
      console.log(TAG, "\nCalled /categories(GET)");
       
  	  get_categories(
  	  	function(resp) {
  	  	// This is the callback - we move into this if the function returns data as expected
  	  	console.log(TAG, 'moving into get_categories callback');
  	  	// console.log(TAG, 'resp: ' + JSON.stringify(resp));
  	  	return response.status(200).send(resp);
      }, function(err) {
  	  	// This is the errback - we move into this if get_categories returns an error
  	  	console.log(TAG, 'Something went wrong in ' + TAG);
  	  	console.log(TAG, err);
  	  	return response.status(400).send(err);
  	  })
  	}
  }
}

function get_categories(callBack, errBack) {
  var getCategoriesQuery = "SELECT * FROM categories";
  console.log(TAG, getCategoriesQuery);
  client.query(getCategoriesQuery, function(err, result) {
    if (err || result.rows[0] === 'undefined' || typeof result.rows[0] === 'undefined') {
        console.log(TAG, getCategoriesQuery);
        return errBack(err);
      } else {
        // for (var i = 0; i < result.rows.length; i++) {
        //  console.log(TAG, funcTAG, "row[" + i + "]: " + JSON.stringify(result.rows[i]));
        // }
        return callBack(result);
    }
  })
}
