var http = require('https');
process.env['NODE_TLS_REJECT_UNAUTHORIZED'] = '0';

http.get("https://api.wheretheiss.at/v1/satellites/25544", function(res) {
  console.log("Got response: " + res.statusCode);
  	res.setEncoding('utf8');
  console.log("data :" + res.responseText);
  	console.log('STATUS: ' + res.StatusCode);
	console.log('HEADERS: ' + JSON.stringify(res.headers));
	res.on('data', function(chunk) {
		console.log(chunk)
	});

}).on('error', function(e) {
  console.log("Got error: " + e.message);
});