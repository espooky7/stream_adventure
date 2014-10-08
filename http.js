var http = require('http');
var through = require('through');

var tr = through(write, end);

function write(buf){
	str = buf.toString().toUpperCase();
	this.queue(str);
}

function end(){
	this.queue(null);
}

var server = http.createServer(function (req, res) {
    if (req.method === 'POST'){
    	req.pipe(tr).pipe(process.stdout)
    }
    res.end('All done');
});

server.listen(process.argv[2]);