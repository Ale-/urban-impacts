angular.module('urban_impacts.methodology_controller', [])

/**
 *   Controller that handles a single location
 */

.controller("MethodologyController", [ 'IndicatorsService', 'Langs', function(IndicatorsService, Langs){

    /**
     *  Scope
     */
    this.indicators         = IndicatorsService.get();
    this.general_variables  = ['program', 'hood'];
    this.urban_variables    = ['population', 'area', 'density', 'average_height', 'youth', 'aging', 'foreigners', 'unemployment', 'illiteracy', 'non_cualified', 'bad_housing', 'economy_level'];
    this.budget_variables   = ['budget_territory', 'budget_economy', 'budget_social', 'budget_sustainability', 'budget_management' ];

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
     *  getNote
     *  Gets the methodological note of a variable
     *
     *  @param key {String} - Category name
     */
    this.getNote = function(key){
        return Langs.get_note(this.indicators[key]);
    }
}]);
