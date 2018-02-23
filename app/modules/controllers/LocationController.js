angular.module('urban_impacts.location_controller', [])

/**
 *   Controller that handles a single location
 */

.controller("LocationController", [
    'CONFIG',
    'DataService',
    '$routeParams',
    function(CONFIG, DataService, $routeParams)
    {
        if(CONFIG.DEBUG)
          console.log("Location controller loaded. Route param: " + $routeParams.location)
    }
]);
