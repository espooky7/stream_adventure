var through = require('through');
var trumpet = require('trumpet');
tr = trumpet();
thr = through(write);

process.stdin.pipe(tr);

tr.selectAll('.loud', function(span){
	var stream = span.createStream();
	stream.pipe(thr).pipe(stream);
})

function write(buf){
	buf = buf.toString().toUpperCase();
	this.queue(buf);
}

tr.pipe(process.stdout);

//thr.pipe(process.stdout);

//thr.pipe(process.stdout);


