angular.module('urban_impacts.map_directive', [])

/**
 *   Directive to render a map
 *
 */
.directive("projectMap", function(DataService){

    return {
        restrict : 'EAC',
        scope    : {
            // Values of the set in the format:
            // [{ k: key, v: value }, { k, v }, { k, v }...]
            w     : '@',
            h     : '@',
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
            }).setView([39.7990, -3.5233], 7);

            L.tileLayer('http://{s}.tile.osm.org/{z}/{x}/{y}.png', {
                attribution: '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
            }).addTo(map);
        }
    };
});
