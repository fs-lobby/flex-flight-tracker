Flight Stats Flex API Sample Flight Tracker
===================

This project is intended to help developers easily add an animated flight tracker map to their applications. It's built using [Leaflet.js](www.leafletjs.com) and [D3.js](www.d3js.org) and compiled using [Grunt](www.gruntjs.com).

To get started install node.js and npm from [nodejs.org](http://nodejs.org/).
You can now use npm to install the other dependencies:
```
npm install -g grunt-cli
npm install
```
Now create a file at the project root called js.json:
```
touch js.json
```
and make it look something like this:
```
{
	"appId": "YOUR_APP_ID",
	"appKey": "YOUR_APP_KEY"
}
```
If you need a Flight Stats app id and key go to [the Flight Stats devevloper portal](https://developer.flightstats.com/getting-started/).

You should be ready to get started. Run these two commands:
```
npm start
grunt watch
```
