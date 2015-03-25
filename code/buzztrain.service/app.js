var http = require('http');
var app = require('express')();


app.set('port', process.env.PORT || 3000 );

app.get('/', function(req,res){
	res.write('Welcome to Buzzfeed. Please use the API.');
	res.end();
});

module.exports = app;

var server = http.createServer(app).listen(app.get('port'));

var io = require('socket.io')(server);

app.get('/api/sit', function (req, res) {
    io.emit('command', { type: 'sit'});
	res.writeHead(200, { 'Content-Type': 'text/plain' });
	res.write('sat');
	res.end();
});
app.get('/api/laydown', function (req, res) {
    io.emit('command', { type: 'laydown'});
	res.end();
});
app.get('/api/stay', function (req, res) {
    io.emit('command', { type: 'stay'});	
	res.end();
});

app.get('/api/lights', function (req, res) {
    io.emit('command', { type: 'lights'});	
	res.end();
});

io.on('connection', function (socket) {
    console.log('connection from a collar ' + socket.id);
});

console.log('running on port 3000');
