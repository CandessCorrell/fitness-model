'use strict';
var clientJS = require('./helper-functions/client.js');
var client = clientJS.client;
// bodyParser enables post request body parsing
var bodyParser = require('body-parser');
var cors = require('cors');

var TAG = "\nSCORES | ";

module.exports = {
	'/scores/:assessment_id': {
  	methods: ['get'],
  	middleware: [bodyParser.urlencoded({extended: true}), bodyParser.json(), cors()],
  	fn: function(request, response) {
  		console.log(TAG, "Called the /scores (GET) route");
			var assessment_id = request.url.split("/");
      assessment_id = assessment_id[2];
      console.log(TAG, "assessment_id:", assessment_id);
			get_scores(assessment_id, function (resp) {
        return response.status(200).send(resp)
      }, function (err) {
        return response.status(400).send(err)
      })
		}
	}
}

function get_scores(assessment_id, callBack, errBack) {
  var getScoresQuery = "SELECT c.description, SUM(ans.score) as score FROM ((questions as q \
  INNER JOIN answers as ans ON q.question_id=ans.question_id) INNER JOIN responses as r \
  ON r.question_id=q.question_id INNER JOIN categories as c ON c.category_id=q.category_id) \
	WHERE r.assessment_id={0} GROUP BY c.description".format(assessment_id);
  console.log(TAG, "getScoresQuery:", getScoresQuery)
  client.query(getScoresQuery, function (err, result) {
    if (err || result.rows[0] === 'undefined' || typeof result.rows[0] === 'undefined') {
      return errBack(err)
    } else {
      return callBack(result)
    }
  })
}
