'use strict';
var clientJS = require('./helper-functions/client.js');
var client = clientJS.client;
// bodyParser enables post request body parsing
var bodyParser = require('body-parser');
var cors = require('cors');

var TAG = "\nSCORES | ";

module.exports = {
	'/scores/:result_id': {
  	methods: ['get'],
  	middleware: [bodyParser.urlencoded({extended: true}), bodyParser.json(), cors()],
  	fn: function(request, response) {
  		console.log(TAG, "Called the /scores (GET) route");
			var result_id = request.url.split("/");
      result_id = result_id[2];
      console.log(TAG, "result_id:", result_id);
			get_scores(result_id, function (resp) {
        return response.status(200).send(resp)
      }, function (err) {
        return response.status(400).send(err)
      })
		}
	}
}

function get_scores(result_id, callBack, errBack) {
  var getScoresQuery = "SELECT q.category_id, SUM(ans.score) as score FROM ((questions as q \
  INNER JOIN answers as ans ON q.question_id=ans.question_id) INNER JOIN responses as r \
  ON r.question_id=q.question_id) WHERE r.result_id={0} GROUP BY q.category_id".format(result_id);
  console.log(TAG, "getScoresQuery:", getScoresQuery)
  client.query(getScoresQuery, function (err, result) {
    if (err || result.rows[0] === 'undefined' || typeof result.rows[0] === 'undefined') {
      return errBack(err)
    } else {
      return callBack(result)
    }
  })
}