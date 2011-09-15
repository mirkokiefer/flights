function(doc, req) {
  var airportsData = doc.airports;
  airportsData.shift();
  var yearlyData = doc.yearly;
  yearlyData.shift();
  
  var airports = require('functions/data').dataToAirports(airportsData);
  var yearlyFlights = require('functions/data').dataToYearlyFlights(yearlyData);

  var airportDict = {};
  airports.forEach(function(airport) {
    airportDict[airport.name()] = airport;
  });
  var nameToAirport = function(name) {
    return airportDict[name];
  }
  
  var geoJson = yearlyFlights.map(function(flight) {
    return {
      "geometry": {
        "coordinates": [
          nameToAirport(flight.origin()).coordinates(),
          nameToAirport(flight.destination()).coordinates()
        ],
        "type": "LineString"
      },
      "type": "Feature",
      "properties": {
        "width": flight.passengers()/15000
      }
    }
  });
  
  
  return {
    body : JSON.stringify(geoJson)
  }
}