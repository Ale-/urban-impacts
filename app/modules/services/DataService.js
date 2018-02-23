angular.module('urban_impacts.data_service', [])

/**
 *   Factory that stores the data visualized in the app
 */
.factory("DataService", [
    '$http',
    'CONFIG',
    function($http, CONFIG)
    {
        var service = {}

        var rnd = function(list){
            return list[ parseInt( Math.random() * list.length) ];
        }

        /**
         *  set
         *  Loads data into the factory from an external source
         *  This external source (data_path) is defined as a
         *  constant value in app.js
         */
        service.set = function()
        {
            if(CONFIG.DEBUG)
                console.log("Data loaded");
            return $http.get(CONFIG.DATA_PATH).then(
                function(response){
                    service.data = response.data;
                    return service.data;
                }, function(response){
                    if(CONFIG.DEBUG && !CONFIG.FAKE_DATA)
                        console.log(response);
                }
            );
        };

        /**
         *  get
         *  Returns the data of the dataset and cache it
         */
        service.get = function()
        {
            if(!CONFIG.FAKE_DATA){
                if(service.data){
                    if(CONFIG.DEBUG)
                        console.log("Data retrieved from cache");
                    return service.data;
                } else {
                    return service.set();
                }
            } else {
                if(CONFIG.DEBUG)
                    console.log("Generating fake data");
                return service.getFakeData();
            }
        }

        /**
         *  fake_data
         *  Returns fake random data
         */
        service.getFakeData = function()
        {
            var fake_data     = [];
            var programs = ['ARB', 'URB', 'ZNTS' ];
            var contexts = ['CH-GC', 'Barriada', 'CH-CM' ];
            for(var i = 0; i < CONFIG.FAKE_DATA_LENGTH; i++){
                fake_data.push({
                    id      : i,
                    name    : 'Lorem ipsum',
                    program : rnd(programs),
                    context : rnd(contexts),

                });
            }
            return fake_data;
        }

        return service;
    }
]);
