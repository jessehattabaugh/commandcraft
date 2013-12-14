var express = require("express");
var logfmt = require("logfmt");
var gzippo = require("gzippo"),
var app = express();

app.use(logfmt.requestLogger());
app.use(gzippo.staticGzip("" + __dirname + "/app"));

var port = process.env.PORT || 5000;
app.listen(port, function() {
  console.log("Listening on " + port);
});