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
var SoxCommand = require('sox-audio');

var server = binaryServer({port: 9001});
server.on('connection', function(client) {
  console.log('socket connection!');

  var childProccess = require('child_process');
  var matchProccess = childProccess.spawn("/Users/XebiaLeenlaptop/beatgrid/match", ['-d','/Users/XebiaLeenlaptop/beatgrid/serie.car','--match-first','-s','match.first.suppress_updates=false','-v'],{stdin:'pipe', stdout:'pipe', stderr:'pipe'})
  var writer = new wav.Writer();

  client.on('stream', function(stream, meta) {
    console.log('start streaming!');

   // require( "child_process" ).spawnSync( "sh", [ "-c", "npm adduser" ], { stdio: "inherit", stdin: "inherit" } );
   // var fileWriter = new wav.FileWriter('output.wav', {
   //   channels: 1,
   //   sampleRate: 48000,
   //   bitDepth: 16
   // });


    stream.pipe(writer);
    writer.pipe(matchProccess.stdin);

    matchProccess.stderr.on('data', function(e){
      console.log(e.toString("utf-8"));
    });
    matchProccess.stdout.on('data', function(e){
      console.log(e.toString("utf-8"));
    });

    //var command = new SoxCommand()
    //  .input(stream)
    //  .inputFileType('raw')
    //  .inputSampleRate(44100)
    //  .inputEncoding('signed')
    //  .inputBits(16)
    //  .inputChannels(1)
    //  .output('-p');

    //command.inputSubCommand(command)
    //  .outputFileType('wav')
    //  .outputSampleRate('16k')
    //  .output("");


    //command.on('prepare', function(args) {
    //  console.log('Preparing sox command with args ' + args.join(' '));
    //});
    //
    //command.on('start', function(commandLine) {
    //  console.log('Spawned sox with command ' + commandLine);
    //});
    //
    //command.on('progress', function(progress) {
    //  console.log('Processing progress: ', progress);
    //});
    //
    //command.on('error', function(err, stdout, stderr) {
    //  console.log('Cannot process audio: ' + err.message);
    //  console.log('Sox Command Stdout: ', stdout);
    //  console.log('Sox Command Stderr: ', stderr)
    //});
    //
    //command.on('end', function() {
    //  console.log('Sox command succeeded!');
    //});
    //
    //command.run();

    stream.on('end', function() {
      //fileWriter.end();
    });
  });
});
