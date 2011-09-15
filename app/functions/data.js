var airportRow = function(row) {
  var wrapper = {
    coordinates: function() {
      return [parseFloat(row[2]), parseFloat(row[1])]
    },
    name: function() {
      return row[0];
    }
  }
  return wrapper;
};

exports.dataToAirports = function(data) {
  return data.map(function(airport) {
    return airportRow(airport);
  });
};

exports.yearlyFlightsRow = function(row) {
  var wrapper = {
    
  };
};