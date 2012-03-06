var app = require('http').createServer(handler)
  , io = require('socket.io').listen(app)
  , fs = require('fs')

app.listen(8080);

function handler (req, res) {
  fs.readFile(__dirname + '/canvas.html',
  function (err, data) {
    if (err) {
      res.writeHead(500);
      return res.end('Error loading index.html');
    }

    res.writeHead(200);
    res.end(data);
  });
}

io.sockets.on('connection', function (socket) {

	socket.on('initDraw', function (data) {
		socket.broadcast.emit('initDraw', data);
	});

	socket.on('draw', function (data) {
		socket.broadcast.emit('draw', data);
	});

	socket.on('endDraw', function (data) {
		socket.broadcast.emit('endDraw');
	});
});