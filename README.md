# ReactHelloWorld
A test app using the React UI library

## Running locally

#### OSX and Windows
Before running for the first time, use npm in the root directory of the project to retrieve all the dependencies:
```
$ npm install
```

Then you can use python to start an HTTP server:
```
$ python -m SimpleHTTPServer
```

Finally, point your browser to http://localhost:8000/ and navigate to the file.


## Building the files

#### All Developer Platforms
After making changes to the informationcards.jsx file, you will need to build it using browserify.

Do this in the root directory of the project to build:
```
$ npm run build
```

Make sure that when committing, node_modules is not accidentally staged. 