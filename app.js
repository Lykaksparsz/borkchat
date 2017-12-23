var express = require('express');
var app = express();
var http = require('http').Server(app);
var io = require('socket.io')(http);

var SOCKET_LIST = [];

function getRandomInt(min, max) {
 min = Math.ceil(min);
 max = Math.floor(max);
 return Math.floor(Math.random() * (max - min)) + min; //The maximum is exclusive and the minimum is inclusive
}

app.get('/', function(req, res){
  res.sendFile(__dirname + '/client/index.html');
});

app.use('/client',express.static(__dirname + '/client'));
app.use('/client/socket.io',express.static(__dirname + '/client/socket.io'));

io.on('connection', function(socket){
  socket.id = getRandomInt(1000, 9999);
  SOCKET_LIST[socket.id] = socket;
  console.log("A BORK CONNECTED. (ID:"+socket.id+")");
  socket.on('disconnect', function(){
    console.log('A BORK DISCONNECTED.');
  });
  socket.on('bork', function(){
    var data = [];
    data[0] = "bork"+socket.id;
    data[1] = "bork";
    data[2] = data[0]+": "+data[1];
    io.emit('bork', data);
    console.log("BORK"+socket.id+" BORKED");
  });
});

http.listen(8080, function(){
  console.log('BORKCHAT IS READY!');
});
