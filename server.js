'use strict';
/**
 * Module dependencies.
 */
//websocket server for streaming
var binaryServer = require('binaryjs').BinaryServer;
var wav = require('wav');

var server = binaryServer({port: 9001});

if(server){
  console.log('socket server started');
}

server.on('connection', function(client) {
  console.log('socket connection!');

  var childProccess = require('child_process');
  var matchProccess = childProccess.spawn("/Users/XebiaLeenlaptop/beatgrid/match", ['-d','/Users/XebiaLeenlaptop/beatgrid/testdata.car','--match-first','-s','match.first.suppress_updates=false','-v'],{stdin:'pipe', stdout:'pipe', stderr:'pipe'})
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


    stream.on('end', function() {
      //fileWriter.end();
    });

  });

  matchProccess.stderr.on('data', function(e){
    console.log(e.toString("utf-8"));
  });
  matchProccess.stdout.on('data', function(e){
    console.log(e.toString("utf-8"));
  });
});
