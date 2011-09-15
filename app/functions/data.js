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

var yearlyFlightsRow = function(row) {
  var wrapper = {
    carrier: function() {
      return row[0];
    },
    origin: function() {
      return row[1];
    },
    destination: function() {
      return row[2];
    },
    year: function() {
      return row[3];
    },
    passengers: function() {
      return row[4];
    }
  };
  return wrapper;
};

exports.dataToAirports = function(data) {
  return data.map(function(row) {
    return airportRow(row);
  });
};

exports.dataToYearlyFlights = function(data) {
  return data.map(function(row) {
    return yearlyFlightsRow(row);
  });
}