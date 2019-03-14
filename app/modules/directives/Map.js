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
            w         : '@',
            h         : '@',
            city      : '@',
            code : '@',
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
            $http.get('https://nominatim.openstreetmap.org/search/' + scope.city + ', España?format=json').then( function(data){
                var i = 0;
                // Invisibilize not selected map features
                Object.keys(geodata._layers).forEach(function(key){
                    var layer = geodata._layers[key];
                    if(layer.feature.properties.Cod_proy != "" + scope.code){
                        layer.options.fillColor   = 'transparent';
                        layer.options.color = 'transparent';
                    } else {
                        layer.options.fillColor   = 'red';
                        layer.options.color = 'red';
                    }
                });
                var important_city = 0, important_boundary = 0;
                for(var i = 0; i < data.data.length; i++){
                    if(data.data[i].type == 'city' && important_city == 0)
                        important_city = i
                    if(data.data[i].type == 'boundary' && important_boundary == 0)
                        important_boundary = i
                }
                var place = important_city ? important_city : important_boundary;
                map.setView([data.data[place].lat, data.data[place].lon], 13);
            });

            if(CONFIG.DEBUG){
                map.setView([37.3925705,-5.9966025], 14)
            }
        }
    };
});
