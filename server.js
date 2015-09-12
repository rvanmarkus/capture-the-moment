'use strict';
/**
 * Module dependencies.
 */
var init = require('./config/init')(),
	config = require('./config/config'),
	mongoose = require('mongoose');

/**
 * Main application entry file.
 * Please note that the order of loading is important.
 */

// Bootstrap db connection
var db = mongoose.connect(config.db);

// Init the express application
var app = require('./config/express')(db);

// Bootstrap passport config
require('./config/passport')();

// Start the app by listening on <port>
app.listen(config.port);

// Expose app
exports = module.exports = app;

// Logging initialization
console.log('MEAN.JS application started on port ' + config.port);

//websocket server for streaming
var binaryServer = require('binaryjs').BinaryServer;
var wav = require('wav');

var server = binaryServer({port: 9001});
server.on('connection', function(client) {
  console.log('socket connection!');

  var childProccess = require('child_process');
  var matchProccess = childProccess.spawn("/Users/XebiaLeenlaptop/beatgrid/match", ['-d','/Users/XebiaLeenlaptop/beatgrid/serie.car','--match-first','-s','match.first.suppress_updates=false','-v'],{stdin:'pipe', stdout:'pipe', stderr:'pipe'})
  var writer = new wav.Writer();

  client.on('stream', function(stream, meta) {
    console.log('start streaming!');

    stream.pipe(writer);
    writer.pipe(matchProccess.stdin);

    matchProccess.stderr.on('data', function(e){
      console.log(e.toString("utf-8"));
    });
    matchProccess.stdout.on('data', function(e){
      console.log(e.toString("utf-8"));
    });

    stream.on('end', function() {
      //fileWriter.end();
    });
  });
});
