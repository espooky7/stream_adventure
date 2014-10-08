var through = require('through');
var tr = through(write, end);

process.stdin.pipe(tr).pipe(process.stdout);
//tr.write(process.stdin);
//tr.end();

function write (buf) { 
	str = buf.toString()
	ustr = str.toUpperCase()
	this.queue(ustr)
}

function end () {
	this.queue(null)
}