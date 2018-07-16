angular.module('urban_impacts.methodology_controller', [])

/**
 *   Controller that handles a single location
 */

.controller("MethodologyController", [ 'IndicatorsService', function(IndicatorsService){

    /**
     *  Scope
     */
    this.indicators         = IndicatorsService.get();
    this.general_variables  = ['program', 'hood'];
    this.urban_variables    = ['population', 'area', 'density', 'average_height', 'youth', 'aging', 'foreigners', 'unemployment', 'illiteracy', 'non_cualified', 'bad_housing', 'economy_level'];
    this.budget_variables   = ['budget_territory', 'budget_economy', 'budget_social', 'budget_sustainability', 'budget_management' ];

}]);
