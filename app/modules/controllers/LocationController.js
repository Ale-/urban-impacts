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

        this.project        = DataService.getProject($routeParams.location);
        this.budget_keys    = DataService.getBudgetSecondaryKeys();
        this.budget_indexes = DataService.getBudgetIndexes();
        this.palette        = CONFIG.PALETTE;
    }
]);
