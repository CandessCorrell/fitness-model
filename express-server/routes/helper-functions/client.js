'use strict';
var pg = require("pg");

// Connect to Postgres Database

var conString = process.env.PostgresConnectString

// var conString = "postgres://postgres:crasufrice_jfdi16@ec2-52-91-6-140.compute-1.amazonaws.com:5432/assessment";

var client = new pg.Client(conString);
client.connect();

exports.client = client

if (!String.prototype.format) {
String.prototype.format = function() {
  var args = arguments;
  return this.replace(/{(\d+)}/g, function(match, number) {
    return typeof args[number] != 'undefined'
    ? args[number]
    : match
    ;
  });
};
}
