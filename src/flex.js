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
	// console.log("fetchFlightTracksForFlight");
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

	// var res = {"request":{"flightId":{"requested":"397615388","interpreted":397615388},"includeFlightPlan":{"requested":"true","interpreted":true},"maxPositions":{},"maxPositionAgeMinutes":{},"extendedOptions":{},"url":"https://api.flightstats.com/flex/flightstatus/rest/v2/jsonp/flight/track/397615388"},"appendix":{"airlines":[{"fs":"DL","iata":"DL","icao":"DAL","name":"Delta Air Lines","phoneNumber":"1-800-221-1212","active":true}],"airports":[{"fs":"PDX","iata":"PDX","icao":"KPDX","faa":"PDX","name":"Portland International Airport","street1":"7000 NE Airport Way","city":"Portland","cityCode":"PDX","stateCode":"OR","postalCode":"97218","countryCode":"US","countryName":"United States","regionName":"North America","timeZoneRegionName":"America/Los_Angeles","weatherZone":"ORZ006","localTime":"2014-06-30T12:38:17.031","utcOffsetHours":-7.0,"latitude":45.588995,"longitude":-122.592901,"elevationFeet":30,"classification":1,"active":true,"delayIndexUrl":"https://api.flightstats.com/flex/delayindex/rest/v1/json/airports/PDX?codeType=fs","weatherUrl":"https://api.flightstats.com/flex/weather/rest/v1/json/all/PDX?codeType=fs"},{"fs":"MSP","iata":"MSP","icao":"KMSP","faa":"MSP","name":"Minneapolis-St. Paul International Airport","street1":"6040 28th Avenue South","city":"Minneapolis","cityCode":"MSP","stateCode":"MN","postalCode":"55450","countryCode":"US","countryName":"United States","regionName":"North America","timeZoneRegionName":"America/Chicago","weatherZone":"MNZ060","localTime":"2014-06-30T14:38:17.031","utcOffsetHours":-5.0,"latitude":44.883016,"longitude":-93.210922,"elevationFeet":841,"classification":1,"active":true,"delayIndexUrl":"https://api.flightstats.com/flex/delayindex/rest/v1/json/airports/MSP?codeType=fs","weatherUrl":"https://api.flightstats.com/flex/weather/rest/v1/json/all/MSP?codeType=fs"}]},"flightTrack":{"flightId":397615388,"carrierFsCode":"DL","flightNumber":"2200","departureAirportFsCode":"PDX","arrivalAirportFsCode":"MSP","departureDate":{"dateLocal":"2014-06-30T11:28:00.000","dateUtc":"2014-06-30T18:28:00.000Z"},"equipment":"A320","bearing":86.98494740469317,"heading":89.59386132012935,"positions":[{"lon":-112.8783,"lat":45.8631,"speedMph":573,"altitudeFt":33100,"source":"ASDI","date":"2014-06-30T19:27:14.000Z"},{"lon":-113.0803,"lat":45.8622,"speedMph":578,"altitudeFt":34800,"source":"ASDI","date":"2014-06-30T19:26:12.000Z"},{"lon":-113.2831,"lat":45.8614,"speedMph":583,"altitudeFt":35000,"source":"ASDI","date":"2014-06-30T19:25:10.000Z"},{"lon":-113.5022,"lat":45.86,"speedMph":588,"altitudeFt":35000,"source":"ASDI","date":"2014-06-30T19:24:08.000Z"},{"lon":-113.7425,"lat":45.8589,"speedMph":586,"altitudeFt":35000,"source":"ASDI","date":"2014-06-30T19:23:06.000Z"},{"lon":-113.7822,"lat":45.8586,"speedMph":587,"altitudeFt":35000,"source":"ASDI","date":"2014-06-30T19:22:49.000Z"},{"lon":-113.9453,"lat":45.8578,"speedMph":583,"altitudeFt":34900,"source":"ASDI","date":"2014-06-30T19:22:04.000Z"},{"lon":-113.9856,"lat":45.8575,"speedMph":585,"altitudeFt":34900,"source":"ASDI","date":"2014-06-30T19:21:48.000Z"},{"lon":-114.1492,"lat":45.8558,"speedMph":582,"altitudeFt":34900,"source":"ASDI","date":"2014-06-30T19:21:01.000Z"},{"lon":-114.1881,"lat":45.8542,"speedMph":583,"altitudeFt":34900,"source":"ASDI","date":"2014-06-30T19:20:47.000Z"},{"lon":-114.3494,"lat":45.8528,"speedMph":583,"altitudeFt":34900,"source":"ASDI","date":"2014-06-30T19:19:59.000Z"},{"lon":-114.3892,"lat":45.8522,"speedMph":583,"altitudeFt":34900,"source":"ASDI","date":"2014-06-30T19:19:45.000Z"},{"lon":-114.5439,"lat":45.8494,"speedMph":583,"altitudeFt":35000,"source":"ASDI","date":"2014-06-30T19:18:57.000Z"},{"lon":-114.5831,"lat":45.8494,"speedMph":582,"altitudeFt":35000,"source":"ASDI","date":"2014-06-30T19:18:44.000Z"},{"lon":-114.7456,"lat":45.8464,"speedMph":585,"altitudeFt":35000,"source":"ASDI","date":"2014-06-30T19:17:55.000Z"},{"lon":-114.7853,"lat":45.8456,"speedMph":582,"altitudeFt":35000,"source":"ASDI","date":"2014-06-30T19:17:43.000Z"},{"lon":-114.9869,"lat":45.8422,"speedMph":586,"altitudeFt":35000,"source":"ASDI","date":"2014-06-30T19:16:53.000Z"},{"lon":-115.0261,"lat":45.8411,"speedMph":582,"altitudeFt":35000,"source":"ASDI","date":"2014-06-30T19:16:41.000Z"},{"lon":-115.1875,"lat":45.8375,"speedMph":588,"altitudeFt":35000,"source":"ASDI","date":"2014-06-30T19:15:51.000Z"},{"lon":-115.2278,"lat":45.8369,"speedMph":582,"altitudeFt":35000,"source":"ASDI","date":"2014-06-30T19:15:40.000Z"},{"lon":-115.2278,"lat":45.8369,"speedMph":582,"altitudeFt":35000,"source":"ASDI","date":"2014-06-30T19:15:40.000Z"},{"lon":-115.3883,"lat":45.8342,"speedMph":589,"altitudeFt":35000,"source":"ASDI","date":"2014-06-30T19:14:49.000Z"},{"lon":-115.3883,"lat":45.8342,"speedMph":589,"altitudeFt":35000,"source":"ASDI","date":"2014-06-30T19:14:49.000Z"},{"lon":-115.4289,"lat":45.8325,"speedMph":583,"altitudeFt":35000,"source":"ASDI","date":"2014-06-30T19:14:39.000Z"},{"lon":-115.4289,"lat":45.8325,"speedMph":583,"altitudeFt":35000,"source":"ASDI","date":"2014-06-30T19:14:39.000Z"},{"lon":-115.5967,"lat":45.8306,"speedMph":580,"altitudeFt":35000,"source":"ASDI","date":"2014-06-30T19:13:47.000Z"},{"lon":-115.5967,"lat":45.8306,"speedMph":580,"altitudeFt":35000,"source":"ASDI","date":"2014-06-30T19:13:47.000Z"},{"lon":-115.5967,"lat":45.8306,"speedMph":580,"altitudeFt":35000,"source":"ASDI","date":"2014-06-30T19:13:47.000Z"},{"lon":-115.6339,"lat":45.8278,"speedMph":585,"altitudeFt":35000,"source":"ASDI","date":"2014-06-30T19:13:37.000Z"},{"lon":-115.6339,"lat":45.8278,"speedMph":585,"altitudeFt":35000,"source":"ASDI","date":"2014-06-30T19:13:37.000Z"},{"lon":-115.6339,"lat":45.8278,"speedMph":585,"altitudeFt":35000,"source":"ASDI","date":"2014-06-30T19:13:37.000Z"},{"lon":-115.8006,"lat":45.8253,"speedMph":580,"altitudeFt":35000,"source":"ASDI","date":"2014-06-30T19:12:45.000Z"},{"lon":-115.8006,"lat":45.8253,"speedMph":580,"altitudeFt":35000,"source":"ASDI","date":"2014-06-30T19:12:45.000Z"},{"lon":-115.8006,"lat":45.8253,"speedMph":580,"altitudeFt":35000,"source":"ASDI","date":"2014-06-30T19:12:45.000Z"},{"lon":-115.8364,"lat":45.8231,"speedMph":583,"altitudeFt":34900,"source":"ASDI","date":"2014-06-30T19:12:36.000Z"},{"lon":-115.8364,"lat":45.8231,"speedMph":583,"altitudeFt":34900,"source":"ASDI","date":"2014-06-30T19:12:36.000Z"},{"lon":-115.8364,"lat":45.8231,"speedMph":583,"altitudeFt":34900,"source":"ASDI","date":"2014-06-30T19:12:36.000Z"},{"lon":-116.0006,"lat":45.8192,"speedMph":580,"altitudeFt":35000,"source":"ASDI","date":"2014-06-30T19:11:43.000Z"},{"lon":-116.0006,"lat":45.8192,"speedMph":580,"altitudeFt":35000,"source":"ASDI","date":"2014-06-30T19:11:43.000Z"},{"lon":-116.0006,"lat":45.8192,"speedMph":580,"altitudeFt":35000,"source":"ASDI","date":"2014-06-30T19:11:43.000Z"},{"lon":-116.0378,"lat":45.8172,"speedMph":582,"altitudeFt":34900,"source":"ASDI","date":"2014-06-30T19:11:35.000Z"},{"lon":-116.0378,"lat":45.8172,"speedMph":582,"altitudeFt":34900,"source":"ASDI","date":"2014-06-30T19:11:35.000Z"},{"lon":-116.0378,"lat":45.8172,"speedMph":582,"altitudeFt":34900,"source":"ASDI","date":"2014-06-30T19:11:35.000Z"},{"lon":-116.2414,"lat":45.8122,"speedMph":580,"altitudeFt":35000,"source":"ASDI","date":"2014-06-30T19:10:41.000Z"},{"lon":-116.2414,"lat":45.8122,"speedMph":580,"altitudeFt":35000,"source":"ASDI","date":"2014-06-30T19:10:41.000Z"},{"lon":-116.2414,"lat":45.8122,"speedMph":580,"altitudeFt":35000,"source":"ASDI","date":"2014-06-30T19:10:41.000Z"},{"lon":-116.2389,"lat":45.8114,"speedMph":582,"altitudeFt":34900,"source":"ASDI","date":"2014-06-30T19:10:34.000Z"},{"lon":-116.2389,"lat":45.8114,"speedMph":582,"altitudeFt":34900,"source":"ASDI","date":"2014-06-30T19:10:34.000Z"},{"lon":-116.2389,"lat":45.8114,"speedMph":582,"altitudeFt":34900,"source":"ASDI","date":"2014-06-30T19:10:34.000Z"},{"lon":-116.4439,"lat":45.8058,"speedMph":580,"altitudeFt":35000,"source":"ASDI","date":"2014-06-30T19:09:39.000Z"},{"lon":-116.4439,"lat":45.8058,"speedMph":580,"altitudeFt":35000,"source":"ASDI","date":"2014-06-30T19:09:39.000Z"},{"lon":-116.4439,"lat":45.8058,"speedMph":580,"altitudeFt":35000,"source":"ASDI","date":"2014-06-30T19:09:39.000Z"},{"lon":-116.4414,"lat":45.805,"speedMph":581,"altitudeFt":34900,"source":"ASDI","date":"2014-06-30T19:09:32.000Z"},{"lon":-116.4414,"lat":45.805,"speedMph":581,"altitudeFt":34900,"source":"ASDI","date":"2014-06-30T19:09:32.000Z"},{"lon":-116.4414,"lat":45.805,"speedMph":581,"altitudeFt":34900,"source":"ASDI","date":"2014-06-30T19:09:32.000Z"},{"lon":-116.6444,"lat":45.7992,"speedMph":580,"altitudeFt":35000,"source":"ASDI","date":"2014-06-30T19:08:37.000Z"},{"lon":-116.6444,"lat":45.7992,"speedMph":580,"altitudeFt":35000,"source":"ASDI","date":"2014-06-30T19:08:37.000Z"},{"lon":-116.6444,"lat":45.7992,"speedMph":580,"altitudeFt":35000,"source":"ASDI","date":"2014-06-30T19:08:37.000Z"},{"lon":-116.6408,"lat":45.7981,"speedMph":582,"altitudeFt":34900,"source":"ASDI","date":"2014-06-30T19:08:31.000Z"},{"lon":-116.6408,"lat":45.7981,"speedMph":582,"altitudeFt":34900,"source":"ASDI","date":"2014-06-30T19:08:31.000Z"},{"lon":-116.6408,"lat":45.7981,"speedMph":582,"altitudeFt":34900,"source":"ASDI","date":"2014-06-30T19:08:31.000Z"},{"lon":-116.8456,"lat":45.7922,"speedMph":580,"altitudeFt":35000,"source":"ASDI","date":"2014-06-30T19:07:35.000Z"},{"lon":-116.8456,"lat":45.7922,"speedMph":580,"altitudeFt":35000,"source":"ASDI","date":"2014-06-30T19:07:35.000Z"},{"lon":-116.8456,"lat":45.7922,"speedMph":580,"altitudeFt":35000,"source":"ASDI","date":"2014-06-30T19:07:35.000Z"},{"lon":-116.8806,"lat":45.7897,"speedMph":581,"altitudeFt":34900,"source":"ASDI","date":"2014-06-30T19:07:30.000Z"},{"lon":-116.8806,"lat":45.7897,"speedMph":581,"altitudeFt":34900,"source":"ASDI","date":"2014-06-30T19:07:30.000Z"},{"lon":-116.8806,"lat":45.7897,"speedMph":581,"altitudeFt":34900,"source":"ASDI","date":"2014-06-30T19:07:30.000Z"},{"lon":-117.0458,"lat":45.7844,"speedMph":580,"altitudeFt":35000,"source":"ASDI","date":"2014-06-30T19:06:33.000Z"},{"lon":-117.0458,"lat":45.7844,"speedMph":580,"altitudeFt":35000,"source":"ASDI","date":"2014-06-30T19:06:33.000Z"},{"lon":-117.0458,"lat":45.7844,"speedMph":580,"altitudeFt":35000,"source":"ASDI","date":"2014-06-30T19:06:33.000Z"},{"lon":-117.0836,"lat":45.7833,"speedMph":579,"altitudeFt":34900,"source":"ASDI","date":"2014-06-30T19:06:28.000Z"},{"lon":-117.0836,"lat":45.7833,"speedMph":579,"altitudeFt":34900,"source":"ASDI","date":"2014-06-30T19:06:28.000Z"},{"lon":-117.0836,"lat":45.7833,"speedMph":579,"altitudeFt":34900,"source":"ASDI","date":"2014-06-30T19:06:28.000Z"},{"lon":-117.2469,"lat":45.7772,"speedMph":578,"altitudeFt":35000,"source":"ASDI","date":"2014-06-30T19:05:30.000Z"},{"lon":-117.2469,"lat":45.7772,"speedMph":578,"altitudeFt":35000,"source":"ASDI","date":"2014-06-30T19:05:30.000Z"},{"lon":-117.2469,"lat":45.7772,"speedMph":578,"altitudeFt":35000,"source":"ASDI","date":"2014-06-30T19:05:30.000Z"},{"lon":-117.2833,"lat":45.7758,"speedMph":578,"altitudeFt":34900,"source":"ASDI","date":"2014-06-30T19:05:27.000Z"},{"lon":-117.2833,"lat":45.7758,"speedMph":578,"altitudeFt":34900,"source":"ASDI","date":"2014-06-30T19:05:27.000Z"},{"lon":-117.2833,"lat":45.7758,"speedMph":578,"altitudeFt":34900,"source":"ASDI","date":"2014-06-30T19:05:27.000Z"},{"lon":-117.4486,"lat":45.7692,"speedMph":578,"altitudeFt":35000,"source":"ASDI","date":"2014-06-30T19:04:28.000Z"},{"lon":-117.4486,"lat":45.7692,"speedMph":578,"altitudeFt":35000,"source":"ASDI","date":"2014-06-30T19:04:28.000Z"},{"lon":-117.4486,"lat":45.7692,"speedMph":578,"altitudeFt":35000,"source":"ASDI","date":"2014-06-30T19:04:28.000Z"},{"lon":-117.4833,"lat":45.7681,"speedMph":576,"altitudeFt":34900,"source":"ASDI","date":"2014-06-30T19:04:26.000Z"},{"lon":-117.4833,"lat":45.7681,"speedMph":576,"altitudeFt":34900,"source":"ASDI","date":"2014-06-30T19:04:26.000Z"},{"lon":-117.4833,"lat":45.7681,"speedMph":576,"altitudeFt":34900,"source":"ASDI","date":"2014-06-30T19:04:26.000Z"},{"lon":-117.6875,"lat":45.76,"speedMph":578,"altitudeFt":35000,"source":"ASDI","date":"2014-06-30T19:03:26.000Z"},{"lon":-117.6875,"lat":45.76,"speedMph":578,"altitudeFt":35000,"source":"ASDI","date":"2014-06-30T19:03:26.000Z"},{"lon":-117.6822,"lat":45.7603,"speedMph":576,"altitudeFt":34900,"source":"ASDI","date":"2014-06-30T19:03:24.000Z"},{"lon":-117.6822,"lat":45.7603,"speedMph":576,"altitudeFt":34900,"source":"ASDI","date":"2014-06-30T19:03:24.000Z"},{"lon":-117.88,"lat":45.7508,"speedMph":578,"altitudeFt":34900,"source":"ASDI","date":"2014-06-30T19:02:24.000Z"},{"lon":-117.88,"lat":45.7508,"speedMph":578,"altitudeFt":34900,"source":"ASDI","date":"2014-06-30T19:02:24.000Z"},{"lon":-117.8814,"lat":45.7508,"speedMph":576,"altitudeFt":34900,"source":"ASDI","date":"2014-06-30T19:02:23.000Z"},{"lon":-117.8814,"lat":45.7508,"speedMph":576,"altitudeFt":34900,"source":"ASDI","date":"2014-06-30T19:02:23.000Z"},{"lon":-117.8814,"lat":45.7508,"speedMph":576,"altitudeFt":34900,"source":"ASDI","date":"2014-06-30T19:02:23.000Z"},{"lon":-118.0783,"lat":45.7417,"speedMph":578,"altitudeFt":34900,"source":"ASDI","date":"2014-06-30T19:01:22.000Z"},{"lon":-118.0789,"lat":45.7417,"speedMph":576,"altitudeFt":34900,"source":"ASDI","date":"2014-06-30T19:01:22.000Z"},{"lon":-118.0783,"lat":45.7417,"speedMph":578,"altitudeFt":34900,"source":"ASDI","date":"2014-06-30T19:01:22.000Z"},{"lon":-118.0789,"lat":45.7417,"speedMph":576,"altitudeFt":34900,"source":"ASDI","date":"2014-06-30T19:01:22.000Z"},{"lon":-118.0783,"lat":45.7417,"speedMph":578,"altitudeFt":34900,"source":"ASDI","date":"2014-06-30T19:01:22.000Z"},{"lon":-118.0789,"lat":45.7417,"speedMph":576,"altitudeFt":34900,"source":"ASDI","date":"2014-06-30T19:01:22.000Z"},{"lon":-118.2761,"lat":45.7328,"speedMph":578,"altitudeFt":34900,"source":"ASDI","date":"2014-06-30T19:00:20.000Z"},{"lon":-118.2769,"lat":45.7331,"speedMph":576,"altitudeFt":34900,"source":"ASDI","date":"2014-06-30T19:00:20.000Z"},{"lon":-118.2761,"lat":45.7328,"speedMph":578,"altitudeFt":34900,"source":"ASDI","date":"2014-06-30T19:00:20.000Z"},{"lon":-118.2769,"lat":45.7331,"speedMph":576,"altitudeFt":34900,"source":"ASDI","date":"2014-06-30T19:00:20.000Z"},{"lon":-118.2761,"lat":45.7328,"speedMph":578,"altitudeFt":34900,"source":"ASDI","date":"2014-06-30T19:00:20.000Z"},{"lon":-118.2769,"lat":45.7331,"speedMph":576,"altitudeFt":34900,"source":"ASDI","date":"2014-06-30T19:00:20.000Z"},{"lon":-118.5144,"lat":45.7219,"speedMph":578,"altitudeFt":34900,"source":"ASDI","date":"2014-06-30T18:59:19.000Z"},{"lon":-118.5144,"lat":45.7219,"speedMph":578,"altitudeFt":34900,"source":"ASDI","date":"2014-06-30T18:59:19.000Z"},{"lon":-118.5144,"lat":45.7219,"speedMph":578,"altitudeFt":34900,"source":"ASDI","date":"2014-06-30T18:59:19.000Z"},{"lon":-118.5131,"lat":45.7219,"speedMph":580,"altitudeFt":34900,"source":"ASDI","date":"2014-06-30T18:59:18.000Z"},{"lon":-118.5131,"lat":45.7219,"speedMph":580,"altitudeFt":34900,"source":"ASDI","date":"2014-06-30T18:59:18.000Z"},{"lon":-118.5131,"lat":45.7219,"speedMph":580,"altitudeFt":34900,"source":"ASDI","date":"2014-06-30T18:59:18.000Z"},{"lon":-118.7108,"lat":45.7111,"speedMph":580,"altitudeFt":34800,"source":"ASDI","date":"2014-06-30T18:58:18.000Z"},{"lon":-118.7108,"lat":45.7111,"speedMph":580,"altitudeFt":34800,"source":"ASDI","date":"2014-06-30T18:58:18.000Z"},{"lon":-118.7108,"lat":45.7111,"speedMph":580,"altitudeFt":34800,"source":"ASDI","date":"2014-06-30T18:58:18.000Z"},{"lon":-118.7108,"lat":45.7111,"speedMph":580,"altitudeFt":34800,"source":"ASDI","date":"2014-06-30T18:58:18.000Z"},{"lon":-118.7094,"lat":45.7108,"speedMph":585,"altitudeFt":34800,"source":"ASDI","date":"2014-06-30T18:58:16.000Z"},{"lon":-118.7094,"lat":45.7108,"speedMph":585,"altitudeFt":34800,"source":"ASDI","date":"2014-06-30T18:58:16.000Z"},{"lon":-118.7094,"lat":45.7108,"speedMph":585,"altitudeFt":34800,"source":"ASDI","date":"2014-06-30T18:58:16.000Z"},{"lon":-118.7094,"lat":45.7108,"speedMph":585,"altitudeFt":34800,"source":"ASDI","date":"2014-06-30T18:58:16.000Z"},{"lon":-118.9092,"lat":45.7003,"speedMph":585,"altitudeFt":34200,"source":"ASDI","date":"2014-06-30T18:57:16.000Z"},{"lon":-118.9092,"lat":45.7003,"speedMph":585,"altitudeFt":34200,"source":"ASDI","date":"2014-06-30T18:57:16.000Z"},{"lon":-118.9092,"lat":45.7003,"speedMph":585,"altitudeFt":34200,"source":"ASDI","date":"2014-06-30T18:57:16.000Z"},{"lon":-118.9092,"lat":45.7003,"speedMph":585,"altitudeFt":34200,"source":"ASDI","date":"2014-06-30T18:57:16.000Z"},{"lon":-118.9092,"lat":45.7003,"speedMph":585,"altitudeFt":34200,"source":"ASDI","date":"2014-06-30T18:57:16.000Z"},{"lon":-118.9081,"lat":45.7,"speedMph":587,"altitudeFt":34200,"source":"ASDI","date":"2014-06-30T18:57:15.000Z"},{"lon":-118.9081,"lat":45.7,"speedMph":587,"altitudeFt":34200,"source":"ASDI","date":"2014-06-30T18:57:15.000Z"},{"lon":-118.9081,"lat":45.7,"speedMph":587,"altitudeFt":34200,"source":"ASDI","date":"2014-06-30T18:57:15.000Z"},{"lon":-118.9081,"lat":45.7,"speedMph":587,"altitudeFt":34200,"source":"ASDI","date":"2014-06-30T18:57:15.000Z"},{"lon":-118.9081,"lat":45.7,"speedMph":587,"altitudeFt":34200,"source":"ASDI","date":"2014-06-30T18:57:15.000Z"},{"lon":-119.1094,"lat":45.7042,"speedMph":586,"altitudeFt":33400,"source":"ASDI","date":"2014-06-30T18:56:15.000Z"},{"lon":-119.1094,"lat":45.7042,"speedMph":586,"altitudeFt":33400,"source":"ASDI","date":"2014-06-30T18:56:15.000Z"},{"lon":-119.1094,"lat":45.7042,"speedMph":586,"altitudeFt":33400,"source":"ASDI","date":"2014-06-30T18:56:15.000Z"},{"lon":-119.1094,"lat":45.7042,"speedMph":586,"altitudeFt":33400,"source":"ASDI","date":"2014-06-30T18:56:15.000Z"},{"lon":-119.1086,"lat":45.7039,"speedMph":588,"altitudeFt":33400,"source":"ASDI","date":"2014-06-30T18:56:12.000Z"},{"lon":-119.1086,"lat":45.7039,"speedMph":588,"altitudeFt":33400,"source":"ASDI","date":"2014-06-30T18:56:12.000Z"},{"lon":-119.1086,"lat":45.7039,"speedMph":588,"altitudeFt":33400,"source":"ASDI","date":"2014-06-30T18:56:12.000Z"},{"lon":-119.1086,"lat":45.7039,"speedMph":588,"altitudeFt":33400,"source":"ASDI","date":"2014-06-30T18:56:12.000Z"},{"lon":-119.1086,"lat":45.7039,"speedMph":588,"altitudeFt":33400,"source":"ASDI","date":"2014-06-30T18:56:12.000Z"},{"lon":-119.3114,"lat":45.7103,"speedMph":583,"altitudeFt":32500,"source":"ASDI","date":"2014-06-30T18:55:14.000Z"},{"lon":-119.3114,"lat":45.7103,"speedMph":583,"altitudeFt":32500,"source":"ASDI","date":"2014-06-30T18:55:14.000Z"},{"lon":-119.3114,"lat":45.7103,"speedMph":583,"altitudeFt":32500,"source":"ASDI","date":"2014-06-30T18:55:14.000Z"},{"lon":-119.3114,"lat":45.7103,"speedMph":583,"altitudeFt":32500,"source":"ASDI","date":"2014-06-30T18:55:14.000Z"},{"lon":-119.3103,"lat":45.71,"speedMph":588,"altitudeFt":32500,"source":"ASDI","date":"2014-06-30T18:55:10.000Z"},{"lon":-119.3103,"lat":45.71,"speedMph":588,"altitudeFt":32500,"source":"ASDI","date":"2014-06-30T18:55:10.000Z"},{"lon":-119.3103,"lat":45.71,"speedMph":588,"altitudeFt":32500,"source":"ASDI","date":"2014-06-30T18:55:10.000Z"},{"lon":-119.5128,"lat":45.7142,"speedMph":583,"altitudeFt":31700,"source":"ASDI","date":"2014-06-30T18:54:12.000Z"},{"lon":-119.5128,"lat":45.7142,"speedMph":583,"altitudeFt":31700,"source":"ASDI","date":"2014-06-30T18:54:12.000Z"},{"lon":-119.5128,"lat":45.7142,"speedMph":583,"altitudeFt":31700,"source":"ASDI","date":"2014-06-30T18:54:12.000Z"},{"lon":-119.5511,"lat":45.7153,"speedMph":590,"altitudeFt":31400,"source":"ASDI","date":"2014-06-30T18:54:08.000Z"},{"lon":-119.5511,"lat":45.7153,"speedMph":590,"altitudeFt":31400,"source":"ASDI","date":"2014-06-30T18:54:08.000Z"},{"lon":-119.5511,"lat":45.7153,"speedMph":590,"altitudeFt":31400,"source":"ASDI","date":"2014-06-30T18:54:08.000Z"},{"lon":-119.7111,"lat":45.7183,"speedMph":593,"altitudeFt":30600,"source":"ASDI","date":"2014-06-30T18:53:11.000Z"},{"lon":-119.7111,"lat":45.7183,"speedMph":593,"altitudeFt":30600,"source":"ASDI","date":"2014-06-30T18:53:11.000Z"},{"lon":-119.7111,"lat":45.7183,"speedMph":593,"altitudeFt":30600,"source":"ASDI","date":"2014-06-30T18:53:11.000Z"},{"lon":-119.7111,"lat":45.7183,"speedMph":593,"altitudeFt":30600,"source":"ASDI","date":"2014-06-30T18:53:11.000Z"},{"lon":-119.7539,"lat":45.7208,"speedMph":590,"altitudeFt":30300,"source":"ASDI","date":"2014-06-30T18:53:06.000Z"},{"lon":-119.7539,"lat":45.7208,"speedMph":590,"altitudeFt":30300,"source":"ASDI","date":"2014-06-30T18:53:06.000Z"},{"lon":-119.7539,"lat":45.7208,"speedMph":590,"altitudeFt":30300,"source":"ASDI","date":"2014-06-30T18:53:06.000Z"},{"lon":-119.7539,"lat":45.7208,"speedMph":590,"altitudeFt":30300,"source":"ASDI","date":"2014-06-30T18:53:06.000Z"},{"lon":-119.9147,"lat":45.7219,"speedMph":591,"altitudeFt":29400,"source":"ASDI","date":"2014-06-30T18:52:10.000Z"},{"lon":-119.9147,"lat":45.7219,"speedMph":591,"altitudeFt":29400,"source":"ASDI","date":"2014-06-30T18:52:10.000Z"},{"lon":-119.9147,"lat":45.7219,"speedMph":591,"altitudeFt":29400,"source":"ASDI","date":"2014-06-30T18:52:10.000Z"},{"lon":-119.9147,"lat":45.7219,"speedMph":591,"altitudeFt":29400,"source":"ASDI","date":"2014-06-30T18:52:10.000Z"},{"lon":-119.9575,"lat":45.7253,"speedMph":589,"altitudeFt":29200,"source":"ASDI","date":"2014-06-30T18:52:04.000Z"},{"lon":-119.9575,"lat":45.7253,"speedMph":589,"altitudeFt":29200,"source":"ASDI","date":"2014-06-30T18:52:04.000Z"},{"lon":-119.9575,"lat":45.7253,"speedMph":589,"altitudeFt":29200,"source":"ASDI","date":"2014-06-30T18:52:04.000Z"},{"lon":-119.9575,"lat":45.7253,"speedMph":589,"altitudeFt":29200,"source":"ASDI","date":"2014-06-30T18:52:04.000Z"},{"lon":-120.1197,"lat":45.7272,"speedMph":582,"altitudeFt":28400,"source":"ASDI","date":"2014-06-30T18:51:08.000Z"},{"lon":-120.1197,"lat":45.7272,"speedMph":582,"altitudeFt":28400,"source":"ASDI","date":"2014-06-30T18:51:08.000Z"},{"lon":-120.1197,"lat":45.7272,"speedMph":582,"altitudeFt":28400,"source":"ASDI","date":"2014-06-30T18:51:08.000Z"},{"lon":-120.1197,"lat":45.7272,"speedMph":582,"altitudeFt":28400,"source":"ASDI","date":"2014-06-30T18:51:08.000Z"},{"lon":-120.1622,"lat":45.7286,"speedMph":580,"altitudeFt":28100,"source":"ASDI","date":"2014-06-30T18:51:02.000Z"},{"lon":-120.1622,"lat":45.7286,"speedMph":580,"altitudeFt":28100,"source":"ASDI","date":"2014-06-30T18:51:02.000Z"},{"lon":-120.1622,"lat":45.7286,"speedMph":580,"altitudeFt":28100,"source":"ASDI","date":"2014-06-30T18:51:02.000Z"},{"lon":-120.1622,"lat":45.7286,"speedMph":580,"altitudeFt":28100,"source":"ASDI","date":"2014-06-30T18:51:02.000Z"},{"lon":-120.3614,"lat":45.7311,"speedMph":573,"altitudeFt":27300,"source":"ASDI","date":"2014-06-30T18:50:07.000Z"},{"lon":-120.3614,"lat":45.7311,"speedMph":573,"altitudeFt":27300,"source":"ASDI","date":"2014-06-30T18:50:07.000Z"},{"lon":-120.3614,"lat":45.7311,"speedMph":573,"altitudeFt":27300,"source":"ASDI","date":"2014-06-30T18:50:07.000Z"},{"lon":-120.3614,"lat":45.7311,"speedMph":573,"altitudeFt":27300,"source":"ASDI","date":"2014-06-30T18:50:07.000Z"},{"lon":-120.3642,"lat":45.7322,"speedMph":565,"altitudeFt":27300,"source":"ASDI","date":"2014-06-30T18:49:59.000Z"},{"lon":-120.3642,"lat":45.7322,"speedMph":565,"altitudeFt":27300,"source":"ASDI","date":"2014-06-30T18:49:59.000Z"},{"lon":-120.3642,"lat":45.7322,"speedMph":565,"altitudeFt":27300,"source":"ASDI","date":"2014-06-30T18:49:59.000Z"},{"lon":-120.3642,"lat":45.7322,"speedMph":565,"altitudeFt":27300,"source":"ASDI","date":"2014-06-30T18:49:59.000Z"},{"lon":-120.5656,"lat":45.7356,"speedMph":563,"altitudeFt":26300,"source":"ASDI","date":"2014-06-30T18:49:05.000Z"},{"lon":-120.5656,"lat":45.7356,"speedMph":563,"altitudeFt":26300,"source":"ASDI","date":"2014-06-30T18:49:05.000Z"},{"lon":-120.5656,"lat":45.7356,"speedMph":563,"altitudeFt":26300,"source":"ASDI","date":"2014-06-30T18:49:05.000Z"},{"lon":-120.5656,"lat":45.7356,"speedMph":563,"altitudeFt":26300,"source":"ASDI","date":"2014-06-30T18:49:05.000Z"},{"lon":-120.5636,"lat":45.7372,"speedMph":552,"altitudeFt":26300,"source":"ASDI","date":"2014-06-30T18:48:57.000Z"},{"lon":-120.5636,"lat":45.7372,"speedMph":552,"altitudeFt":26300,"source":"ASDI","date":"2014-06-30T18:48:57.000Z"},{"lon":-120.5636,"lat":45.7372,"speedMph":552,"altitudeFt":26300,"source":"ASDI","date":"2014-06-30T18:48:57.000Z"},{"lon":-120.5636,"lat":45.7372,"speedMph":552,"altitudeFt":26300,"source":"ASDI","date":"2014-06-30T18:48:57.000Z"},{"lon":-120.7603,"lat":45.7378,"speedMph":557,"altitudeFt":25300,"source":"ASDI","date":"2014-06-30T18:48:04.000Z"},{"lon":-120.7603,"lat":45.7378,"speedMph":557,"altitudeFt":25300,"source":"ASDI","date":"2014-06-30T18:48:04.000Z"},{"lon":-120.7603,"lat":45.7378,"speedMph":557,"altitudeFt":25300,"source":"ASDI","date":"2014-06-30T18:48:04.000Z"},{"lon":-120.7603,"lat":45.7378,"speedMph":557,"altitudeFt":25300,"source":"ASDI","date":"2014-06-30T18:48:04.000Z"},{"lon":-120.7603,"lat":45.7378,"speedMph":557,"altitudeFt":25300,"source":"ASDI","date":"2014-06-30T18:48:04.000Z"},{"lon":-120.7958,"lat":45.7383,"speedMph":542,"altitudeFt":25000,"source":"ASDI","date":"2014-06-30T18:47:55.000Z"},{"lon":-120.7958,"lat":45.7383,"speedMph":542,"altitudeFt":25000,"source":"ASDI","date":"2014-06-30T18:47:55.000Z"},{"lon":-120.7958,"lat":45.7383,"speedMph":542,"altitudeFt":25000,"source":"ASDI","date":"2014-06-30T18:47:55.000Z"},{"lon":-120.7958,"lat":45.7383,"speedMph":542,"altitudeFt":25000,"source":"ASDI","date":"2014-06-30T18:47:55.000Z"},{"lon":-120.7958,"lat":45.7383,"speedMph":542,"altitudeFt":25000,"source":"ASDI","date":"2014-06-30T18:47:55.000Z"},{"lon":-120.9547,"lat":45.7406,"speedMph":539,"altitudeFt":24100,"source":"ASDI","date":"2014-06-30T18:47:03.000Z"},{"lon":-120.9547,"lat":45.7406,"speedMph":539,"altitudeFt":24100,"source":"ASDI","date":"2014-06-30T18:47:03.000Z"},{"lon":-120.9547,"lat":45.7406,"speedMph":539,"altitudeFt":24100,"source":"ASDI","date":"2014-06-30T18:47:03.000Z"},{"lon":-120.9547,"lat":45.7406,"speedMph":539,"altitudeFt":24100,"source":"ASDI","date":"2014-06-30T18:47:03.000Z"},{"lon":-120.9889,"lat":45.7408,"speedMph":531,"altitudeFt":23800,"source":"ASDI","date":"2014-06-30T18:46:53.000Z"},{"lon":-120.9889,"lat":45.7408,"speedMph":531,"altitudeFt":23800,"source":"ASDI","date":"2014-06-30T18:46:53.000Z"},{"lon":-120.9889,"lat":45.7408,"speedMph":531,"altitudeFt":23800,"source":"ASDI","date":"2014-06-30T18:46:53.000Z"},{"lon":-120.9889,"lat":45.7408,"speedMph":531,"altitudeFt":23800,"source":"ASDI","date":"2014-06-30T18:46:53.000Z"},{"lon":-121.1431,"lat":45.7425,"speedMph":535,"altitudeFt":22800,"source":"ASDI","date":"2014-06-30T18:46:01.000Z"},{"lon":-121.1431,"lat":45.7425,"speedMph":535,"altitudeFt":22800,"source":"ASDI","date":"2014-06-30T18:46:01.000Z"},{"lon":-121.1431,"lat":45.7425,"speedMph":535,"altitudeFt":22800,"source":"ASDI","date":"2014-06-30T18:46:01.000Z"},{"lon":-121.1431,"lat":45.7425,"speedMph":535,"altitudeFt":22800,"source":"ASDI","date":"2014-06-30T18:46:01.000Z"},{"lon":-121.1431,"lat":45.7425,"speedMph":535,"altitudeFt":22800,"source":"ASDI","date":"2014-06-30T18:46:01.000Z"},{"lon":-121.1769,"lat":45.7436,"speedMph":519,"altitudeFt":22500,"source":"ASDI","date":"2014-06-30T18:45:51.000Z"},{"lon":-121.1769,"lat":45.7436,"speedMph":519,"altitudeFt":22500,"source":"ASDI","date":"2014-06-30T18:45:51.000Z"},{"lon":-121.1769,"lat":45.7436,"speedMph":519,"altitudeFt":22500,"source":"ASDI","date":"2014-06-30T18:45:51.000Z"},{"lon":-121.1769,"lat":45.7436,"speedMph":519,"altitudeFt":22500,"source":"ASDI","date":"2014-06-30T18:45:51.000Z"},{"lon":-121.1769,"lat":45.7436,"speedMph":519,"altitudeFt":22500,"source":"ASDI","date":"2014-06-30T18:45:51.000Z"},{"lon":-121.3286,"lat":45.7428,"speedMph":518,"altitudeFt":21400,"source":"ASDI","date":"2014-06-30T18:45:00.000Z"},{"lon":-121.3286,"lat":45.7428,"speedMph":518,"altitudeFt":21400,"source":"ASDI","date":"2014-06-30T18:45:00.000Z"},{"lon":-121.3286,"lat":45.7428,"speedMph":518,"altitudeFt":21400,"source":"ASDI","date":"2014-06-30T18:45:00.000Z"},{"lon":-121.3286,"lat":45.7428,"speedMph":518,"altitudeFt":21400,"source":"ASDI","date":"2014-06-30T18:45:00.000Z"},{"lon":-121.3286,"lat":45.7428,"speedMph":518,"altitudeFt":21400,"source":"ASDI","date":"2014-06-30T18:45:00.000Z"},{"lon":-121.5089,"lat":45.745,"speedMph":509,"altitudeFt":20000,"source":"ASDI","date":"2014-06-30T18:43:58.000Z"},{"lon":-121.5089,"lat":45.745,"speedMph":509,"altitudeFt":20000,"source":"ASDI","date":"2014-06-30T18:43:58.000Z"},{"lon":-121.5089,"lat":45.745,"speedMph":509,"altitudeFt":20000,"source":"ASDI","date":"2014-06-30T18:43:58.000Z"},{"lon":-121.5089,"lat":45.745,"speedMph":509,"altitudeFt":20000,"source":"ASDI","date":"2014-06-30T18:43:58.000Z"},{"lon":-121.5089,"lat":45.745,"speedMph":509,"altitudeFt":20000,"source":"ASDI","date":"2014-06-30T18:43:58.000Z"},{"lon":-121.6864,"lat":45.7456,"speedMph":489,"altitudeFt":18400,"source":"ASDI","date":"2014-06-30T18:42:57.000Z"},{"lon":-121.6864,"lat":45.7456,"speedMph":489,"altitudeFt":18400,"source":"ASDI","date":"2014-06-30T18:42:57.000Z"},{"lon":-121.6864,"lat":45.7456,"speedMph":489,"altitudeFt":18400,"source":"ASDI","date":"2014-06-30T18:42:57.000Z"},{"lon":-121.6864,"lat":45.7456,"speedMph":489,"altitudeFt":18400,"source":"ASDI","date":"2014-06-30T18:42:57.000Z"},{"lon":-121.6864,"lat":45.7456,"speedMph":489,"altitudeFt":18400,"source":"ASDI","date":"2014-06-30T18:42:57.000Z"},{"lon":-121.8494,"lat":45.7481,"speedMph":481,"altitudeFt":17300,"source":"ASDI","date":"2014-06-30T18:41:56.000Z"},{"lon":-121.8494,"lat":45.7481,"speedMph":481,"altitudeFt":17300,"source":"ASDI","date":"2014-06-30T18:41:56.000Z"},{"lon":-121.8494,"lat":45.7481,"speedMph":481,"altitudeFt":17300,"source":"ASDI","date":"2014-06-30T18:41:56.000Z"},{"lon":-122.0275,"lat":45.7511,"speedMph":474,"altitudeFt":16000,"source":"ASDI","date":"2014-06-30T18:40:54.000Z"},{"lon":-122.0275,"lat":45.7511,"speedMph":474,"altitudeFt":16000,"source":"ASDI","date":"2014-06-30T18:40:54.000Z"},{"lon":-122.0275,"lat":45.7511,"speedMph":474,"altitudeFt":16000,"source":"ASDI","date":"2014-06-30T18:40:54.000Z"},{"lon":-122.0275,"lat":45.7511,"speedMph":474,"altitudeFt":16000,"source":"ASDI","date":"2014-06-30T18:40:54.000Z"},{"lon":-122.1931,"lat":45.7525,"speedMph":453,"altitudeFt":15700,"source":"ASDI","date":"2014-06-30T18:39:53.000Z"},{"lon":-122.1931,"lat":45.7525,"speedMph":453,"altitudeFt":15700,"source":"ASDI","date":"2014-06-30T18:39:53.000Z"},{"lon":-122.1931,"lat":45.7525,"speedMph":453,"altitudeFt":15700,"source":"ASDI","date":"2014-06-30T18:39:53.000Z"},{"lon":-122.1931,"lat":45.7525,"speedMph":453,"altitudeFt":15700,"source":"ASDI","date":"2014-06-30T18:39:53.000Z"},{"lon":-122.3517,"lat":45.7539,"speedMph":428,"source":"ASDI","date":"2014-06-30T18:38:51.000Z"},{"lon":-122.3517,"lat":45.7539,"speedMph":428,"source":"ASDI","date":"2014-06-30T18:38:51.000Z"},{"lon":-122.3517,"lat":45.7539,"speedMph":428,"source":"ASDI","date":"2014-06-30T18:38:51.000Z"},{"lon":-122.3517,"lat":45.7539,"speedMph":428,"source":"ASDI","date":"2014-06-30T18:38:51.000Z"},{"lon":-122.5133,"lat":45.7556,"speedMph":395,"source":"ASDI","date":"2014-06-30T18:37:50.000Z"},{"lon":-122.5133,"lat":45.7556,"speedMph":395,"source":"ASDI","date":"2014-06-30T18:37:50.000Z"},{"lon":-122.5133,"lat":45.7556,"speedMph":395,"source":"ASDI","date":"2014-06-30T18:37:50.000Z"},{"lon":-122.5133,"lat":45.7556,"speedMph":395,"source":"ASDI","date":"2014-06-30T18:37:50.000Z"},{"lon":-122.6497,"lat":45.7589,"speedMph":329,"source":"ASDI","date":"2014-06-30T18:36:49.000Z"},{"lon":-122.6497,"lat":45.7589,"speedMph":329,"source":"ASDI","date":"2014-06-30T18:36:49.000Z"},{"lon":-122.6497,"lat":45.7589,"speedMph":329,"source":"ASDI","date":"2014-06-30T18:36:49.000Z"},{"lon":-122.6497,"lat":45.7589,"speedMph":329,"source":"ASDI","date":"2014-06-30T18:36:49.000Z"},{"lon":-122.7564,"lat":45.7425,"speedMph":319,"altitudeFt":8400,"source":"ASDI","date":"2014-06-30T18:35:47.000Z"},{"lon":-122.7564,"lat":45.7425,"speedMph":319,"altitudeFt":8400,"source":"ASDI","date":"2014-06-30T18:35:47.000Z"},{"lon":-122.7564,"lat":45.7425,"speedMph":319,"altitudeFt":8400,"source":"ASDI","date":"2014-06-30T18:35:47.000Z"},{"lon":-122.7564,"lat":45.7425,"speedMph":319,"altitudeFt":8400,"source":"ASDI","date":"2014-06-30T18:35:47.000Z"},{"lon":-122.7864,"lat":45.7078,"speedMph":327,"altitudeFt":6900,"source":"ASDI","date":"2014-06-30T18:35:14.000Z"},{"lon":-122.7864,"lat":45.7078,"speedMph":327,"altitudeFt":6900,"source":"ASDI","date":"2014-06-30T18:35:14.000Z"},{"lon":-122.7864,"lat":45.7078,"speedMph":327,"altitudeFt":6900,"source":"ASDI","date":"2014-06-30T18:35:14.000Z"},{"lon":-122.7836,"lat":45.6722,"speedMph":307,"altitudeFt":5600,"source":"ASDI","date":"2014-06-30T18:34:46.000Z"},{"lon":-122.7439,"lat":45.645,"speedMph":326,"altitudeFt":3700,"source":"ASDI","date":"2014-06-30T18:34:13.000Z"},{"lon":-122.7439,"lat":45.645,"speedMph":326,"altitudeFt":3700,"source":"ASDI","date":"2014-06-30T18:34:13.000Z"},{"lon":-122.6919,"lat":45.6253,"speedMph":238,"altitudeFt":2400,"source":"ASDI","date":"2014-06-30T18:33:45.000Z"},{"lon":-122.6919,"lat":45.6253,"speedMph":238,"altitudeFt":2400,"source":"ASDI","date":"2014-06-30T18:33:45.000Z"},{"lon":-122.6467,"lat":45.6106,"speedMph":192,"altitudeFt":1900,"source":"ASDI","date":"2014-06-30T18:33:12.000Z"},{"lon":-122.6467,"lat":45.6106,"speedMph":192,"altitudeFt":1900,"source":"ASDI","date":"2014-06-30T18:33:12.000Z"},{"lon":-122.6114,"lat":45.5989,"speedMph":181,"source":"ASDI","date":"2014-06-30T18:32:35.000Z"}],"waypoints":[{"lon":-122.5833,"lat":45.5833},{"lon":-122.4667,"lat":45.5667},{"lon":-122.4333,"lat":45.55},{"lon":-122.4,"lat":45.55},{"lon":-122.3333,"lat":45.5333},{"lon":-122.3167,"lat":45.5333},{"lon":-122.2667,"lat":45.5667},{"lon":-122.25,"lat":45.5833},{"lon":-122.15,"lat":45.6333},{"lon":-122.0667,"lat":45.6667},{"lon":-121.85,"lat":45.7333},{"lon":-121.85,"lat":45.7333},{"lon":-121.85,"lat":45.7333},{"lon":-121.5667,"lat":45.7333},{"lon":-121.3,"lat":45.7333},{"lon":-121.0,"lat":45.7333},{"lon":-120.7333,"lat":45.7333},{"lon":-120.6,"lat":45.7333},{"lon":-120.5833,"lat":45.7333},{"lon":-120.1667,"lat":45.7167},{"lon":-120.0,"lat":45.7167},{"lon":-119.6667,"lat":45.7167},{"lon":-119.4667,"lat":45.7},{"lon":-119.3167,"lat":45.7},{"lon":-118.9667,"lat":45.6833},{"lon":-118.9333,"lat":45.6833},{"lon":-117.8667,"lat":45.75},{"lon":-117.7333,"lat":45.75},{"lon":-117.5,"lat":45.75},{"lon":-115.1667,"lat":45.8333},{"lon":-115.0,"lat":45.8333},{"lon":-114.7667,"lat":45.8333},{"lon":-112.8667,"lat":45.85},{"lon":-112.1667,"lat":45.85},{"lon":-110.9833,"lat":45.65},{"lon":-110.0,"lat":45.7167},{"lon":-108.6167,"lat":45.8},{"lon":-106.9667,"lat":45.6667},{"lon":-106.0,"lat":45.5667},{"lon":-104.6333,"lat":45.4333},{"lon":-103.1667,"lat":45.2667},{"lon":-101.7,"lat":45.0667},{"lon":-97.7333,"lat":44.75},{"lon":-96.55,"lat":44.6333},{"lon":-95.6667,"lat":44.5333},{"lon":-95.4,"lat":44.5},{"lon":-95.35,"lat":44.4833},{"lon":-95.2667,"lat":44.4833},{"lon":-95.1167,"lat":44.4667},{"lon":-94.9333,"lat":44.5},{"lon":-94.8667,"lat":44.5167},{"lon":-94.6,"lat":44.5833},{"lon":-94.3667,"lat":44.6333},{"lon":-94.3,"lat":44.65},{"lon":-94.15,"lat":44.6833},{"lon":-94.1167,"lat":44.6833},{"lon":-94.0667,"lat":44.7},{"lon":-93.9,"lat":44.7333},{"lon":-93.7167,"lat":44.7833},{"lon":-93.7167,"lat":44.7833},{"lon":-93.4833,"lat":44.8333},{"lon":-93.4333,"lat":44.85},{"lon":-93.3667,"lat":44.85},{"lon":-93.25,"lat":44.8667},{"lon":-93.2167,"lat":44.8667}],"legacyRoute":"KPDX.LAVAA5.PDT.J16.HIA.J151.BIL.J34.RWF.SKETR5.KMSP/2116"}};

	// done(null, res);

	jsonpRequest(flightPath, "callback", function(err, response) {
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

Flex.prototype.fetchActiveAirports = function(options, done) {
	/* 
	Options:
	  - extendedOptions
	See https://developer.flightstats.com/api-docs/flightstatus/v2/flightsNear for documentation
	*/

	var airportPath = [
	  this.fsBasePath,
	  'airports/rest/v1/jsonp/active?appId=',
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

// jsonp client
(function(e){"use strict";var t=e.jsonpClient,n=typeof window!="undefined",r,i,s=/[\?|&]callback=([a-z0-9_]+)/i,o=function(){var e=Array.prototype.slice.apply(arguments),t,n=e.slice(0,-1),r=0,s,o=[],u,a;try{t=e.slice(-1)[0];if(typeof t!="function")throw new Error("Callback not found")}catch(f){throw new Error("jsonpClient expects a callback")}typeof n[0]!="string"&&(n=n[0]),a=function(){var e=0;o=o.sort(function(e,t){return e.position>t.position});for(e=0;o.length>e;e+=1)o[e]=o[e].data;o.unshift(null),t.apply(null,o)},u=function(e,u){i(n[r],function(e,r){if(s)return;s=e;if(e)return t(e);o.push({data:r,position:u}),o.length===n.length&&a()})};for(r=0;n.length>r;r+=1)u(n[r]+"",r)};o.noConflict=function(){return e.jsonpClient=t,o},r=function(){var e,t,n=document.getElementsByTagName("head")[0];return t=function(e,t){var r=document.createElement("script"),i=!1;r.src=e,r.async=!0,r.onload=r.onreadystatechange=function(){!i&&(!this.readyState||this.readyState==="loaded"||this.readyState==="complete")&&(i=!0,r.onload=r.onreadystatechange=null,r&&r.parentNode&&r.parentNode.removeChild(r),t())},n.appendChild(r)},e=function(e,t){var n=e.match(s);if(!n)return t(new Error("Could not find callback on URL"));t(null,n[1])},function(n,r){e(n,function(e,i){var s,o=window[i];if(e)return r(e);window[i]=function(e){s=e},t(n,function(e){!e&&!s&&(e=new Error("Calling to "+i+" did not returned a JSON response."+"Make sure the callback "+i+" exists and is properly formatted."));if(o)window[i]=o;else try{delete window[i]}catch(t){window[i]=undefined}r(e,s)})})}},i=n?r():require("./jsonp-node.js"),typeof module!="undefined"&&module.exports?module.exports=o:e.jsonpClient=o})(this);

function jsonpRequest(url, callback, done) {
	url = url + ("&callback=cb" + Math.random()).replace('.', '');
	jsonpClient(url, function (err, data) {
		done(err, data);
	});
	// $.ajax({
	//   url: url,
	//   jsonp: callback,
	//   dataType: "jsonp",
	//   beforeSend: function(a,b,c) {
	//     // console.log("beforeSend", a, b, c);
	//   },
	//   success: function(response) {
	//     // console.log("success", response);
	//     done(response.error, response);
	//   },
	//   error: function(xhr, ajaxOptions, err) {
	//     console.log("error", err);
	//     done(err);
	//   },
	//   complete: function(response) {
	//     // console.log("complete", response);
	//     // done(response);
	//   }
	// });
}