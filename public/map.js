$(document).ready(function(){

  $('#map_geo').height($(window).innerHeight());

  L.mapbox.accessToken = 'pk.eyJ1IjoiY2hyaXNqd2VpIiwiYSI6ImNpaml0aGR1ajAyeDV0dG01NG10cjM5NmQifQ.ot1jmLRF2Ooi2xC8ZQ0Qjg';

  var map = L.mapbox.map('map_geo', 'mapbox.dark',{
        minZoom: 2,
        maxZoom: 15
    })
    .setView([44.967586, -103.772234], 2)

  var featureLayer = L.mapbox.featureLayer()
    .addTo(map);

  featureLayer.on('layeradd', function(e) {
    var marker = e.layer,
        feature = marker.feature;

    var content = '<div class="popup"><h2>'+ feature.properties.name + '<\/h2>' +
      '<p>Armed: ' + feature.properties.armed + '<\/p><\/class>';

    marker.bindPopup(content,{
        closeButton: false,
        minWidth: 100
    });
  });

  featureLayer.on('click', function(e) {
    var lng = e.layer.feature.geometry.coordinates[0];
    var lat = e.layer.feature.geometry.coordinates[1];
    map.setView([lat,lng]);
  });

  featureLayer.loadURL('the_counted.geojson')

  armedFilter = document.getElementById('filter-armed');

  armedFilter.onclick = function(e) {
    if (this.className == 'active'){
      this.className = ''
      featureLayer.setFilter(function(f) {
        return true;
      });
    } else {
      this.className = 'active';  
      featureLayer.setFilter(function(f) {
        return f.properties.armed == 'No';
      });
    }
    return false;
  };




});