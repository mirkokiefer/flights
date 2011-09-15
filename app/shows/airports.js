function(doc, req) {
  var airportsData = doc.airports;
  airportsData.shift();
  var airports = require('functions/data').dataToAirports(airportsData);
  var geoJson = airports.map(function(airport) {
    return {
      geometry: {
        type: "Point",
        coordinates: airport.coordinates()
      },
      type: "Feature",
      attributes: {
        name: airport.name()
      }
    };
  });
  return {
    body : JSON.stringify(geoJson)
  }
}