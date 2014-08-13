![alt tag](https://raw.githubusercontent.com/flightstats/flex-flight-tracker/master/readme-image.png)

FlightStats Flex API Sample Flight Tracker
===================

BETA SOFTWARE!!!
Help us improve this project by opening issues for any bugs or feature requests OR fork it, fix it and open a pull request.

This project is intended to help developers easily add an animated flight tracker map to their applications. It's built using [Leaflet.js](www.leafletjs.com) and [D3.js](www.d3js.org) and compiled using [Grunt](www.gruntjs.com). This project does not attempt to cover all of the edge cases and complexity required for a polished user-facing product. We hope to participate in refining this library as it's used but many of the implementation details of an animated flight tracker require the identifcation of edge cases in data.

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
and make it look something like the following. You will need a FlightStats app id and key from [the FlightStats developer portal](https://developer.flightstats.com/getting-started/).

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
Source files include html files in the examples folder (which have app id and key injected and are then saved to the replace directory) and the javascript files in the src folder. These javascript files are concatenated and uglified to the dist folder, but the example html files point directly at the files in src to easy development. All you really need to know is to load the html files in /examples/replace and to modify the javascript files in /src - the rest should be grunt magic.

You should be ready to get started. Run this command in a new terminal window to start a simple web server on port 8080.
```
npm start
```

MAJOR GOTCHA: Update your browser! There is/was a significant SVG rendering bug that can affect this project. See [this](https://github.com/flightstats/flex-flight-tracker/issues/1) issue for details.

You should now be able to access an index of flights at:
[localhost:8080/examples/replace/index.html?airportId=PDX](http://localhost:8080/examples/replace/index.html?airportId=PDX)

```
repeat
	tell application "Google Chrome"
		tell the active tab of its first window
			reload
		end tell
	end tell
	delay 1800
end repeat
```
