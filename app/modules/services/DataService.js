angular.module('urban_impacts.data_service', [])

/**
 *   Factory that stores the data visualized in the app
 */
.factory("DataService", [
    '$http',
    'CONFIG',
    function($http, CONFIG)
    {
        var service = {
            data : [],
            categories : {
                'program' : {
                    'ARB'  : { k : 'ARB',  n : 0 },
                    'URB'  : { k : 'URB',  n: 0 },
                    'ZNTS' : { k : 'ZNTS', n: 0 },
                },
                'context' : {
                    'CH-GC'    : { k : 'CH-GC', n : 0 },
                    'Barriada' : { k : 'Barriada', n : 0 },
                    'CH-CM'    : { k : 'CH-CM', n : 0 },
                },
            }
        }

        var rnd = function(container){
            if(typeof container === 'object'){
                keys = Object.keys(container);
                return container[ keys[parseInt( Math.random() * keys.length)] ];
            } else {
                return container[ parseInt( Math.random() * list.length) ];
            }
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
                    // Set data
                    service.data = response.data;
                    service.calculateCategoryItems(service.data);
                    return service.data;
                }, function(response){
                    if(CONFIG.DEBUG && !CONFIG.FAKE_DATA)
                        console.log(response);
                }
            );
        };

        /**
         *  calculateCategoryItems
         *  Calculates the number of items in each category
         */
        service.calculateCategoryItems = function(items){
            for(var i in items){
                service.categories.context[ items[i].context ].n++;
                service.categories.program[ items[i].program ].n++;
            }
        }

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
         *  getCategory
         *  Returns info about a category
         */
        service.getCategory = function(category){
            return service.categories[category];
        }

        /**
         *  getFakeData
         *  Returns fake random data
         */
        service.getFakeData = function()
        {
            var fake_data = [];
            var programs  = [];
            var contexts  = [];
            for(var i = 0; i < CONFIG.FAKE_DATA_LENGTH; i++){
                fake_data.push({
                    id      : i,
                    name    : i,
                    program : rnd(service.categories.program).k,
                    context : rnd(service.categories.context).k,

                });
            };
            service.calculateCategoryItems(fake_data);
            return fake_data;
        }

        return service;
    }
]);
