const http = require('http');
const url = require('url');
const fs = require('fs');

// Tiny static server for development
var server = http.createServer(function(request, response){
  var pathname = url.parse(request.url).pathname;
  console.log(pathname);
  if (pathname === '/build/bundle.js') {
    return response.end(fs.readFileSync('build/bundle.js'));
  }

  return response.end(fs.readFileSync('index.html'));
});

server.listen(process.env.PORT || 8080, function(){
  console.log("Cool server listening on port %s", PORT);
});