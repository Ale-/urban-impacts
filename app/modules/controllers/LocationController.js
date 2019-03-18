angular.module('urban_impacts.location_controller', [])

/**
 *   Controller that handles a single location
 */

.controller("LocationController", ['CONFIG', 'DataService', '$routeParams', 'IndicatorsService' ,'Langs', function(CONFIG, DataService, $routeParams, IndicatorsService, Langs){

    /**
     *  Scope
     */
    this.indicators  = IndicatorsService.get();
    this.town_code   = $routeParams.location;
    this.project     = DataService.getProject($routeParams.location);
    this.budget      = DataService.getBudget($routeParams.location);
    this.budget_keys = IndicatorsService.getBudgetKeys();
    this.categories  = DataService.getCategories();
    this.palette     = CONFIG.PALETTE;
    this.lon         = this.project.Latitud;
    this.lat         = this.project.Longitud;
    console.log(this.lat, this.lon);
    
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
        return Langs.get_indicator(this.indicators[key]);
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
     *  getNote
     *  Gets the methodological note of a variable
     *
     *  @param key {String} - Category name
     */
    this.getNote = function(key){
        return Langs.get_note(this.indicators[key]);
    }

    this.legend_texts   = {
       'a' : this.project[ this.indicators.project.var ],
       'b' : Langs.get_legend_text('b_c', this.getCategory('program').toUpperCase()),
       'c' : Langs.get_legend_text('b_c', this.getCategory('hood')),
       'd' : Langs.get_legend_text('d', ''),
    }

    /**
     *  Logs
     */
    if(CONFIG.DEBUG)
      console.log("Location controller loaded. Route param: " + $routeParams.location)

}]);
