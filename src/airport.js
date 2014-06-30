var Airport = function(airportData, config) {
	this.name = airportData.name;
	this.classification = airportData.classification;
	this.lat = airportData.latitude;
	this.lon = airportData.longitude;
	this.icon = config.icon;
};