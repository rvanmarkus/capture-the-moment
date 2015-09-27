'use strict';
/**
 * Module dependencies.
 */
//websocket server for streaming
var binaryServer = require('binaryjs').BinaryServer;
var childProccess = require('child_process');
var wav = require('wav');
var WaveRecorder = require('wave-recorder')

var server = binaryServer({port: 9001});

if(server){
  console.log('socket server started');
}

server.on('connection', function(client) {
  console.log('socket connection!');

  //var childProccess = require('child_process');

  // var matchProccess = childProccess.spawn("/Users/XebiaLeenlaptop/beatgrid/match", ['-d','/Users/XebiaLeenlaptop/beatgrid/test.car','--match-first','-v'],{stdin:'pipe', stdout:'pipe', stderr:'pipe'});
  //var matchProccess = childProccess.spawn("/Users/XebiaLeenlaptop/beatgrid/match", ['-d','/Users/XebiaLeenlaptop/beatgrid/db.car','--match-first','-s','match.first.suppress_updates=false','-v'],{stdin:'pipe', stdout:'pipe', stderr:'pipe'});
  var matchProccess = childProccess.spawn("./match", ['-d','./db.car','--match-first','-s','match.first.suppress_updates=false','-v'],{stdin:'pipe', stdout:'pipe', stderr:'pipe'});
  //../match -d ../test.car --match-top-n -v
  //var matchProccess = childProccess.spawn("/Users/XebiaLeenlaptop/beatgrid/match", ['-d','/Users/XebiaLeenlaptop/beatgrid/bla.car','--match-top-n','-v'],{stdin:'pipe', stdout:'pipe', stderr:'pipe'});
  //var matchProccess = childProccess.spawn("/Users/XebiaLeenlaptop/beatgrid/match", ['-d','/Users/XebiaLeenlaptop/beatgrid/bla.car','--match-first','-v']);

  var writer = new wav.Writer({
    channels: 1,
    sampleRate: 44100,
    bitDepth: 16
});
  var fileWriter = new wav.FileWriter('output.wav', {
    channels: 1,
    sampleRate: 44100,
    bitDepth: 16
  });

  client.on('stream', function(stream, meta) {
    console.log('start streaming!');
    stream.pipe(writer);
    writer.pipe(matchProccess.stdin);
    writer.pipe(fileWriter);
    console.log('piped data');

    stream.on('end', function() {
      //fileWriter.end();
      console.log('stream ended');
    });

    matchProccess.stderr.on('data', function(e){
      client.send(e.toString("utf-8"));
      console.log(e.toString("utf-8"));

    });
    matchProccess.stdout.on('data', function(e){
      client.send(e.toString("utf-8"));
      console.log(e.toString("utf-8"));
    });

  });
});
