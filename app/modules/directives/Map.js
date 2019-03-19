angular.module('urban_impacts.map_directive', [])

/**
 *   Directive to render a map
 *
 */
.directive("projectMap", function(DataService, CONFIG, $http){

    return {
        restrict : 'EAC',
        scope    : {
            // Values of the set in the format:
            // [{ k: key, v: value }, { k, v }, { k, v }...]
            w    : '@',
            h    : '@',
            city : '@',
            code : '@',
            lat  : '@',
            lon  : '@'
        },
        template : '<div id="map"></div>',
        transclude : true,

        link     : function (scope, element, attrs)
        {
            var map = document.querySelector('#map');
            map.style.width  = scope.w;
            map.style.height = scope.h;

            var map = L.map('map', {
              scrollWheelZoom: false,
            });

            L.tileLayer('http://{s}.tile.osm.org/{z}/{x}/{y}.png', {
                attribution: '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
            }).addTo(map);

            map.addControl(new L.Control.Fullscreen());

            var geodata   = DataService.getGeodata();
            geodata.addTo(map);
            var i = 0;
            // Invisibilize not selected map features
            Object.keys(geodata._layers).forEach(function(key){
                var layer = geodata._layers[key];
                if(layer.feature.properties['CODPROY1'] != "" + scope.code &&
                   layer.feature.properties['CODPROY2'] != "" + scope.code &&
                   layer.feature.properties['CODPROY3'] != "" + scope.code){
                    layer.options.fillColor = 'transparent';
                    layer.options.color     = 'transparent';
                } else {
                    layer.options.fillColor   = 'red';
                    layer.options.color = 'red';
                }
            });

            map.setView([scope.lat, scope.lon], 14);
            if(CONFIG.DEBUG){
                map.setView([37.392570,-5.9966025], 14)
            }
        }
    };
});
