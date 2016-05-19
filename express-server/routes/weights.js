'use strict';
var clientJS = require('./helper-functions/client.js');
var client = clientJS.client;
var cors = require('cors');

var TAG = "WEIGHTS | ";

module.exports = {
  '/weights/:weight_id': {
    methods: ['get'],
    middleware: [cors()],
    fn: function(request, response){
      var result_id = request.url.split("/");
      result_id = result_id[2];
      console.log(TAG, "\nCalled /weights(GET)");
      console.log(TAG, "query is : " + JSON.stringify(request.query));
  	  
  	  get_weights(result_id,
  	  	function(resp) {
  	  	// This is the callback - we move into this if the function returns data as expected
  	  	console.log(TAG, 'moving into get_weights callback');
  	  	// console.log(TAG, 'resp: ' + JSON.stringify(resp));
  	  	return response.status(200).send(resp);
      }, function(err) {
  	  	// This is the errback - we move into this if get_weights returns an error
  	  	console.log(TAG, 'Something went wrong in ' + TAG);
  	  	console.log(TAG, err);
  	  	return response.status(400).send(err);
  	  })
  	}
  }
}

function get_weights(result_id, callBack, errBack) {
  var getWeightsQuery = "SELECT * FROM weights WHERE result_id={0}".format(result_id);
  console.log(TAG, getWeightsQuery);
  client.query(getWeightsQuery, function(err, result) {
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
