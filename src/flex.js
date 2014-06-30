// https://api.flightstats.com/flex/flightstatus/rest/v2/jsonp/flight/track/349804685?appId=[id]&appKey=[key]&includeFlightPlan=true&maxPositions=50&extendedOptions=includeNewFields&sourceType=derived

var Flex = function(config) {
  if (config == null) {
  	throw new Error('flex config required');
  }
  if (config.appId == null || config.appKey == null) {
  	throw new Error("flex appId and appKey required");
  }

  this.appId = config.appId;
  this.appKey = config.appKey;
  this.fsBasePath = 'https://api.flightstats.com/flex/';
};

Flex.prototype.fetchAirportByCode = function(fsAirportCode, options, done) {
	/* 
	Options:
	  - extendedOptions
	See https://developer.flightstats.com/api-docs/airports/v1
	*/

	var airportPath = [
	  this.fsBasePath,
	  'airports/rest/v1/jsonp/',
	  fsAirportCode,
	  '/today',
	  '?appId=',
	  this.appId,
	  '&appKey=',
	  this.appKey
	];

	for (var option in options) {
		airportPath.push('&');
		airportPath.push(option);
		airportPath.push('=');
		airportPath.push(options[option]);
	}

	airportPath = airportPath.join('');

	jsonpRequest(airportPath, "callback", function(err, response) {
		done(err, response);
	});
};

Flex.prototype.fetchActiveOutgoingFlightsForAirport = function(fsAirportCode, options, done) {
	/* 
	Options:
	  - carrier
	  - includeFlightPlan
	  - maxPositions
	  - maxPositionAgeMinutes
	  - codeType
	  - maxFlights
	  - extendedOptions
	See https://developer.flightstats.com/api-docs/flightstatus/v2/airport for documentation
	*/

	var airportPath = [
	  this.fsBasePath,
	  'flightstatus/rest/v2/jsonp/airport/tracks/',
	  fsAirportCode,
	  '/dep?appId=',
	  this.appId,
	  '&appKey=',
	  this.appKey
	];

	for (var option in options) {
		airportPath.push('&');
		airportPath.push(option);
		airportPath.push('=');
		airportPath.push(options[option]);
	}

	airportPath = airportPath.join('');

	jsonpRequest(airportPath, "callback", function(err, response) {
		done(err, response);
	});
};

Flex.prototype.fetchActiveIncomingFlightsForAirport = function(fsAirportCode, options, done) {
	/* 
	Options:
	  - carrier
	  - includeFlightPlan
	  - maxPositions
	  - maxPositionAgeMinutes
	  - codeType
	  - maxFlights
	  - extendedOptions
	See https://developer.flightstats.com/api-docs/flightstatus/v2/airport for documentation
	*/

	var airportPath = [
	  this.fsBasePath,
	  'flightstatus/rest/v2/jsonp/airport/tracks/',
	  fsAirportCode,
	  '/arr?appId=',
	  this.appId,
	  '&appKey=',
	  this.appKey
	];

	for (var option in options) {
		airportPath.push('&');
		airportPath.push(option);
		airportPath.push('=');
		airportPath.push(options[option]);
	}

	airportPath = airportPath.join('');

	jsonpRequest(airportPath, "callback", function(err, response) {
		done(err, response);
	});
};

Flex.prototype.fetchFlightTracksForFlight = function(flightId, options, done) {
	/* 
	Options:
	  - includeFlightPlan
	  - maxPositions
	  - maxPositionAgeMinutes
	  - extendedOptions
	See https://developer.flightstats.com/api-docs/flightstatus/v2/flight for documentation
	*/

	var flightPath = [
	  this.fsBasePath,
	  'flightstatus/rest/v2/jsonp/flight/track/',
	  flightId,
	  '?appId=',
	  this.appId,
	  '&appKey=',
	  this.appKey
	];

	for (var option in options) {
		flightPath.push('&');
		flightPath.push(option);
		flightPath.push('=');
		flightPath.push(options[option]);
	}
	  	
	flightPath = flightPath.join('');

	jsonpRequest(flightPath, "callback", function(err, response) {
		console.log(err, response);
		done(err, response);
	});
};

Flex.prototype.fetchFlightsWithinBounds = function(bounds, options, done) {
	if (bounds.topLat == null || bounds.leftLon == null || bounds.bottomLat == null || bounds.rightLon == null) {
		throw new Error("required bounds property missing");
	}
	/* 
	Options:
	  - maxFlights
	  - extendedOptions
	See https://developer.flightstats.com/api-docs/flightstatus/v2/flightsNear for documentation
	*/

	var flightPath = [
	  this.fsBasePath,
	  'flightstatus/rest/v2/jsonp/flightsNear/',
	  bounds.topLat,
	  '/',
	  bounds.leftLon,
	  '/',
	  bounds.bottomLat,
	  '/',
	  bounds.rightLon,
	  '?appId=',
	  this.appId,
	  '&appKey=',
	  this.appKey
	];

	for (var option in options) {
		flightPath.push('&');
		flightPath.push(option);
		flightPath.push('=');
		flightPath.push(options[option]);
	}
	  	
	flightPath = flightPath.join('');

	jsonpRequest(flightPath, "callback", function(err, response) {
		done(err, response);
	});
};
function jsonpRequest(url, callback, done) {
	$.ajax({
    url: url,
    jsonp: callback,
    dataType: "jsonp",
    success: function(response) {
      done(response.error, response);
    },
    error: function(xhr, ajaxOptions, err) {
    	done(err);
    }
	});
}