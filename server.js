var express = require("express"),
  logfmt = require("logfmt"),
  gzippo = require("gzippo"),
  restful = require("node-restful"),
  mongoose = restful.mongoose,
  app = express(),
  port = process.env.PORT || 5000;

app.use(logfmt.requestLogger());
app.use(gzippo.staticGzip("" + __dirname + "/app"));
app.use(express.bodyParser());
app.use(express.query());

mongoose.connect('mongodb://read:password@ds039507.mongolab.com:39507/commandcraft');

app.commands = restful.model('commands', mongoose.Schema({
  id: 'string'
}))
  .methods(['get'])
  .register(app, '/commands');

app.variables = restful.model('variables', mongoose.Schema({
  id: 'string',
  name: 'string'
}))
  .methods(['get'])
  .register(app, '/variables');
  
/*app.entities = restful.model('entities', mongoose.Schema({
  id: 'number',
  name: 'string'
}))
  .methods(['get'])
  .register(app, '/entities');*/
  
app.values = restful.model('values', mongoose.Schema({
  id: 'number',
  name: 'string',
  kind: 'string',
  label: 'string'
}))
  .methods(['get'])
  .register(app, '/values');
  
app.tags = restful.model('tags', mongoose.Schema({
  id: 'string',
  description: 'string',
  parent: 'array'
}))
  .methods(['get'])
  .register(app, '/tags');

app.listen(port, function() {
  console.log("Listening on " + port);
});