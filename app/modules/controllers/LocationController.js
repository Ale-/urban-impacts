angular.module('urban_impacts.location_controller', [])

/**
 *   Controller that handles a single location
 */

.controller("LocationController", ['CONFIG', 'DataService', '$routeParams', 'IndicatorsService', function(CONFIG, DataService, $routeParams, IndicatorsService){

    /**
     *  Scope
     */
    this.indicators     = IndicatorsService.get();
    this.project        = DataService.getProject($routeParams.location);
    this.budget_keys    = IndicatorsService.getBudgetKeys()
    this.budget_indexes = IndicatorsService.getBudgetAltKeys();
    this.categories     = DataService.getCategories();
    this.palette        = CONFIG.PALETTE;
    var current_lang    = 'es';

    /**
     *  get
     *  Gets the value of a variable of the current project
     *
     *  @param key {String} - Variable name
     */
    this.get = function(key){
        return this.project[ this.indicators[key].var ];
    }

    /**
     *  getLabel
     *  Gets the label of a variable of the current project
     *
     *  @param key {String}  - Variable name
     */
    this.getLabel = function(key){
        return this.indicators[key]['label_' + current_lang];
    }


    /**
     *  getCategory
     *  Gets the value of a category of the current project
     *
     *  @param key {String} - Category name
     */
    this.getCategory = function(key){
        return this.categories[key][ this.project[ this.indicators[key].var ] ].k;
    }

    /**
     *  Logs
     */
    if(CONFIG.DEBUG)
      console.log("Location controller loaded. Route param: " + $routeParams.location)

}]);
