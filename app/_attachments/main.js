
$(function() {
  var po = org.polymaps;
  
  var map = po.map().container(document.body.appendChild(po.svg("svg"))).center({
    lat: 37.787,
    lon: -30.228
  }).zoom(2.5).add(po.interact());
  
  map.add(po.image().url(po.url("http://{S}tile.cloudmade.com" + "/3ab63d0e77be45a9a3d16565152f2eec" // http://cloudmade.com/register
  + "/998/256/{Z}/{X}/{Y}.png").hosts(["a.", "b.", "c.", ""])));
  
    
  $.get('_show/yearly/data', function(data) {
    var yearlyFlights = JSON.parse(data);
    map.add(po.geoJson().features(yearlyFlights).on("load",
      po.stylist()
      .style("stroke-width", function (d) {
        return d.properties.width;
      })
      .style("fill-opacity", function (d) {
        return 0;
      })
    ));
    
    $.get('_show/airports/data', function(data) {
      var airports = JSON.parse(data);
      console.log(data);
      map.add(po.geoJson().features(airports).on("load",
        po.stylist()
        .style("stroke-width", function (d) {
          return 3;
        })
        .style("fill-opacity", function (d) {
          return 0.5;
        })
        .attr("r", 2)
      ));
    });
  });  
  map.add(po.compass().pan("none"));
});