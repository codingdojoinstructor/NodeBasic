var server = require('http');
var fs = require('fs');

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
	fs.readFile('./views/' + url.resource + '/' + url.action + '.html', 'utf8', function(err, data){
		if(err){
			fourOfour();
		}
		else
		{
			res.writeHead(200, {"Content-type":"text/html"});
			res.end(data);
		}
	})
}).listen(7077);
console.log("Connected to Localhost:7077");