function(doc, req) {
  var airports = doc.airports;
  airports.shift();
  var geoJson = airports.map(function(airport) {
    return {
      geometry: {
        type: "Point",
        coordinates: [parseFloat(airport[2]), parseFloat(airport[1])]
      },
      type: "Feature",
      attributes: {
        name: airport[0]
      }
    };
  });
  return {
    body : JSON.stringify(geoJson)
  }
}