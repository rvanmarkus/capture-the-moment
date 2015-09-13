
//websocket server for streaming
var binaryServer = require('binaryjs').BinaryServer;
var wav = require('wav');

var server = binaryServer({port: 9002});
server.on('connection', function(client) {
	console.log('socket connection!');

	var childProccess = require('child_process');
	var matchProccess = childProccess.spawn("/Users/XebiaLeenlaptop/beatgrid/match", ['-d','/Users/XebiaLeenlaptop/beatgrid/serie.car','--match-first','-s','match.first.suppress_updates=false','-v'],{stdin:'pipe', stdout:'pipe', stderr:'pipe'})
	var writer = new wav.Writer();

	client.on('stream', function(stream, meta) {
		console.log('start streaming!');

		stream.pipe(writer);
		writer.pipe(matchProccess.stdin);

		stream.on('end', function() {
			matchProccess.kill();
			console.log('matching proccess stopped');
		});
	});

	matchProccess.stderr.on('data', function(e){
		console.log(e.toString("utf-8"));
	});
	matchProccess.stdout.on('data', function(e){

		console.log(e.toString("utf-8"));
	});
});
