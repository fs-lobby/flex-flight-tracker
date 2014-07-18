FlightStats Flex API Sample Flight Tracker
===================

This project is intended to help developers easily add an animated flight tracker map to their applications. It's built using [Leaflet.js](www.leafletjs.com) and [D3.js](www.d3js.org) and compiled using [Grunt](www.gruntjs.com).

To get started install node.js and npm from [nodejs.org](http://nodejs.org/).
You can now use npm to install the other dependencies:
```
npm install -g grunt-cli
npm install
```
Now create a file at the project root called fs.json:
```
touch fs.json
```
and make it look something like the following. You will need a FlightStats app id and key from [the FlightStats devevloper portal](https://developer.flightstats.com/getting-started/).

```
{
	"appId": "YOUR_APP_ID",
	"appKey": "YOUR_APP_KEY"
}
```

Run this command to generate your tracker HTML with your app id and key.
```
grunt
```

Run this command to watch for changes to source files.
```
grunt watch
```

You should be ready to get started. Run this command in a new terminal window to start a simple web server on port 8080.
```
npm start
```

You should now be able to access an index of flights at:
[localhost:8080/examples/replace/index.html?airportId=PDX](http://localhost:8080/examples/replace/index.html?airportId=PDX)
