angular.module('urban_impacts.view_controller', [])

/**
 *   Controller that handles the table with different projects
 */
.controller("ViewController", ['CONFIG', 'data', 'DataService', 'IndicatorsService', 'Langs', function(CONFIG, data, DataService, IndicatorsService, Langs){

    /**
     *  Scope
     */
    this.data             = data;
    this.reverse          = false;
    this.hood             = DataService.getCategory('hood');
    this.program          = DataService.getCategory('program');
    this.indicators       = IndicatorsService.get();
    this.sort_order       = this.indicators.town.var;
    this.selected_hood    = '';
    this.selected_program = '';
    this.lang             = Langs.getLang();

    /**
     *  Sorts projects by a given property
     */
    this.sortBy = function(property){
        this.reverse = (this.sort_order === property) ? !this.reverse : false;
        this.sort_order = property;
    }

    /**
     *  Selects a type of hood to show only related projects
     *  @param {object} i  - A key/value object, item of this.program
     */
    this.setHood = function(i){
        this.selected_hood = i ? i.v : '';
    }

    /**
     *  Selects a type of program to show only related projects
     *  @param {object} i  - A key/value object, item of this.program
     */
    this.setProgram = function(i){
        this.selected_program = i ? i.v : '';
    }

    /**
     *  Shows/hides projects according to a given value
     *  @param {object} item - Item to check
     *
     *  @see https://docs.angularjs.org/api/ng/filter/filter
     */
    this.show = angular.bind(this, function(item){
        return (!this.selected_hood    ||
                 this.selected_hood    == item[this.indicators.hood.var])
                 &&
               (!this.selected_program ||
                 this.selected_program == item[ this.indicators.program.var ]);
    });

    /**
     *  Logs
     */
    if(CONFIG.DEBUG){
        console.log("View controller loaded.");
        console.log("Current data: ");
        console.log(this.data);
    }
}]);
