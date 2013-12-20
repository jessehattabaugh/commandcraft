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
  id: 'string',
  tag: 'string' // if set this is the root tag of the tag argument for this command
}))
  .methods(['get'])
  .register(app, '/commands');

app.variables = restful.model('variables', mongoose.Schema({
  id: 'string',
  name: 'string'
}))
  .methods(['get'])
  .register(app, '/variables');
  
app.values = restful.model('values', mongoose.Schema({
  id: 'number',   // numeric id
  name: 'string', // short name for commands
  kind: 'string', // categoies of values for filtering
  label: 'string' // long name for UI
}))
  .methods(['get'])
  .register(app, '/values');
  
app.tags = restful.model('tags', mongoose.Schema({
  id: 'string', // string id used in compound tags
  description: 'string',
  parent: 'array',  // id of tags that this tag can be a child of
  kind: 'string',   // category of values to offer as options
  valueProperty: 'string' // property of the value item to use in commands, defaults to "id"
}))
  .methods(['get'])
  .register(app, '/tags');

app.listen(port, function() {
  console.log("Listening on " + port);
});