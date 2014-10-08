var split = require('split');
var through = require('through');
var n = 0;

//var tr = through(write, end);

process.stdin
	.pipe(split())
	.pipe(through(write))
	.pipe(process.stdout);

function write(buf){
	str = buf.toString();
	if (n%2 == 1) {
		str = str.toUpperCase();
		}
	else {
		str = str.toLowerCase();
		}
	this.queue(str+'\n');
	n++;
}
