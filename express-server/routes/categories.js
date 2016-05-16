'use strict';
var clientJS = require('./helper-functions/client.js');
var client = clientJS.client;
// bodyParser enables post request body parsing
var bodyParser = require('body-parser');
var cors = require('cors');

var TAG = "\nCATEGORIES | ";

module.exports = {
  '/categories': {
    methods: ['get', 'post'],
    middleware: [bodyParser.urlencoded({extended: true}), bodyParser.json(), cors()],

    fn: function(request, response){  
      if (request.method === 'GET') {
        console.log(TAG, "Called /categories(GET)");
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
      } else if (request.method === 'POST') {
        console.log(TAG, "Called /categories(POST)");
        if (request.body.description == null) {
          console.log(TAG, "POST failed: Bad description")
          response.status(400).send("POST failed! Check your description!");
        } else {
          post_categories(request.body.description, function (resp) {
            response.status(200).send(resp);
          }, function (err) {
            response.status(400).send(err);
          })
        }
      }
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

function post_categories(description, callBack, errBack) {
  var postCategoryQuery = "INSERT INTO categories (description) VALUES($${0}$$)".format(description)
  client.query(postCategoryQuery, function(err, result) {
    if (err) {
      console.log(TAG, "Error running INSERT INTO categories with description: " + description);
      return errBack(err);
    } else {
      console.log(TAG, "Successfully inserted new category with description: " + description);
      return callBack("Successfully inserted your new category!");
    } 
  })
}
