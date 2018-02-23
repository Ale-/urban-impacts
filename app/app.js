'use strict';

/**
 * @ngdoc overview
 * @name Urban impacts
 * @description
 * An angular app to explore budget data
 *
 * Main module of the application.
 */
angular.module('urban_impacts', [
    'ngRoute',
    'ngSanitize',
    'angular-loading-bar',
    'urban_impacts.data_service',
    'urban_impacts.view_controller',
    'urban_impacts.location_controller',
  ])

.value('CONFIG', {
    'DEBUG'            : true,
    'FAKE_DATA'        : true,
    'FAKE_DATA_LENGTH' : 100,
    'DATA_PATH'        : 'app/data/data.json',
})

.config([
    '$routeProvider',
    'cfpLoadingBarProvider',
    '$logProvider',
    '$compileProvider',
    '$httpProvider',
    '$locationProvider',
    function ($routeProvider, cfpLoadingBarProvider, $logProvider, $compileProvider, $httpProvider, $locationProvider)
    {
    //To avoid excessive amounts of logs coming from the events in leaflet-directive
    $logProvider.debugEnabled(false);
    //To improve performance in production
    $compileProvider.debugInfoEnabled(false);
    //Use applysync to reduce $digest calls using ajax
    $httpProvider.useApplyAsync(true);
    //Clean up URLs
    $locationProvider.hashPrefix('')
    //Turn off spinner in angular-loading-bar
    cfpLoadingBarProvider.includeSpinner = false;

    $routeProvider
    .when('/', {
        // Home of the app
        templateUrl: 'app/templates/list.html',
        controller  : 'ViewController',
        controllerAs: 'view',
        resolve: {
             data: function(DataService) {
                 return DataService.get();
             }
        }
    })
    .when('/:location', {
        // Single year views
        templateUrl : 'app/templates/location.html',
        controller  : 'LocationController',
        controllerAs: 'location',
        resolve: {
             data: function(DataService) {
                 return DataService.get();
             }
        }
    })
    // Otherwise redirect to app's home
    .otherwise({
      redirectTo: '/'
    });
}])
