const http = require('http');
const url = require('url');
const fs = require('fs');
const PORT = 8080;

// Tiny static server for development
var server = http.createServer(function(request, response){
  var pathname = url.parse(request.url).pathname;
  console.log(pathname);
  if (pathname === '/build/bundle.js') {
    return response.end(fs.readFileSync('build/bundle.js'));
  }

  return response.end(fs.readFileSync('index.html'));
});

server.listen(PORT, function(){
  console.log("Server listening on port %s", PORT);
});