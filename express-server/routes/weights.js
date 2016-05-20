'use strict';
var clientJS = require('./helper-functions/client.js');
var client = clientJS.client;
var cors = require('cors');
var bodyParser = require('body-parser');

var TAG = "WEIGHTS | ";

module.exports = {
  '/weights/:id': {
    methods: ['get', 'put'],
    middleware: [cors(), bodyParser.urlencoded({extended: true}), bodyParser.json()],
    fn: function(request, response){
      if (request.method == "GET") {
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
      } else if (request.method == "PUT") {
        var weight_id = request.url.split("/");
        weight_id = weight_id[2];
        console.log(TAG, "You called PUT weights/" + weight_id);
        if (weight_id == null) {
          return response.status(400).send("Incorrect weight_id format");
        } else if (request.body.result_id == null) {
          return response.status(400).send("Check your result_id");
        } else if (request.body.value == null) {
          return response.status(400).send("Check your value");
        } else if (request.body.category_id == null) {
          return response.status(400).send("Check your category_id");
        } else {
          put_weight(weight_id, request.body.result_id, request.body.category_id, request.body.value, 
            function (resp) {
              return response.status(200).send(resp);
            }, function (err) {
              return response.status(400).send(err);
            })
          }
      } else {
        var respString = "HTTP Verb " + request.method + " is not implemented yet for this route!";
        response.status(400).send(respString);
      }
  	}
  },

  '/weights': {
    methods: ['post'],
    middleware: [bodyParser.urlencoded({extended: true}), bodyParser.json(), cors()],
    fn: function(request, response) {
      console.log(TAG, "Called weights(POST) route!");
      if (request.body.result_id == null) {
        return response.status(400).send("Check your result_id");
      } else if (request.body.value == null) {
        return response.status(400).send("Check your value");
      } else if (request.body.category_id == null) {
        return response.status(400).send("Check your category_id");
      } else {
        post_weight(request.body.result_id, request.body.category_id, request.body.value, 
          function (resp) {
            return response.status(200).send(resp);
          }, function (err) {
            return response.status(400).send(err);
          })
      }
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

function post_weight(result_id, category_id, value, callBack, errBack) {
  var postWeightQuery = "INSERT INTO weights (result_id, category_id, value) \
  VALUES({0}, {1}, {2})".format(result_id, category_id, value);
  console.log(TAG, "postWeightQuery:", postWeightQuery);
  client.query(postWeightQuery, function (err, result) {
    if (err) {
      return errBack(err);
    } else {
      return callBack("Successfully posted new weight!");
    }
  })
}

function put_weight(weight_id, result_id, category_id, value, callBack, errBack) {
  var putWeightQuery = "UPDATE weights SET result_id={1},category_id={2},value={3} \
  WHERE weight_id={0}".format(weight_id, result_id, category_id, value);
  console.log(TAG, "putWeightQuery:", putWeightQuery);
  client.query(putWeightQuery, function (err, result) {
    if (err) {
      return errBack(err);
    } else {
      var respString = "Successfully updated weights/" + weight_id + " with result_id: " + 
      result_id + ", category_id: " + category_id + ", value: " + value
      console.log(TAG, respString);
      return callBack(respString)
    }
  })
}