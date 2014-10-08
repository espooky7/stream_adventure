var spawn = require('child_process').spawn;
var duplex = require('duplexer');

module.exports = function(cmd,args){
	//spawn the process and return a single stream
	//joining together the stdin and strout here
	var something = spawn(cmd, args);

	var dup = duplex(something.stdin, something.stdout);

	return(dup);
}