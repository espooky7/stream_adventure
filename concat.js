var concat = require('concat-stream');

var ct = concat(function(buf){
	str = buf.toString();
	rev = str.split('').reverse().join('') + '\n';
	process.stdout.write(rev);
});

process.stdin.pipe(ct);	