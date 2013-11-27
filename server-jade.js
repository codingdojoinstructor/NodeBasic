var server = require('http');
var fs = require('fs');
var jade = require('jade');

server.createServer(function(req, res){

	var fourOfour = function(){
		res.writeHead(404, {"Content-type":"text/plain"});
		res.end("Sorry, page not found");
	}

	var parseUrl = function(){
		var url = {};
		var urlParts = req.url.split("/");

		if(!urlParts[2])
		{
			url.action = 'index';
			url.resource = urlParts[1];
		}
		else
		{
			url.resource = urlParts[1];
			url.action = urlParts[2]; 	
		}

		return url;
	}

	var url = parseUrl();
	var filename = './views/' + url.resource + '/' + url.action + '.jade'
	var options = {};

	var html = jade.renderFile(filename, options, function (err, html) {
  			if (err) {
  				console.log(err);
  				fourOfour();
  			} else {
  				res.writeHead(200, {"Content-type": "text/html"});
				res.end(html);
  			}
		});
	
}).listen(7077);
console.log("Connected to Localhost:7077");