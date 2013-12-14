var express = require("express"),
  logfmt = require("logfmt"),
  gzippo = require("gzippo")
  app = express(),
  port = process.env.PORT || 5000;

app.use(logfmt.requestLogger());
app.use(gzippo.staticGzip("" + __dirname + "/app"));
app.listen(port, function() {
  console.log("Listening on " + port);
});