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
            },
            geodata : {},
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
         *  getCategory
         *  Returns info about a category
         */
        service.getProject = function(id){
            for(var i in service.data)
                if(service.data[i].id == id)
                    return service.data[i];
        }

        service.rnd = function(min, max){
            return min + Math.floor( Math.random() * (max-min) );
        }

        service.getRndItems = function(min, max){
            return [
                { k: 'a', v: service.rnd(min, max) },
                { k: 'b', v: service.rnd(min, max) },
                { k: 'c', v: service.rnd(min, max) },
                { k: 'd', v: service.rnd(min, max) },
            ];
        }

        service.getBudgetPrimaryKeys = function(){
            return [
                'Proyecto',
                'Media de proyectos por convocatoria',
                'Media de proyectos por tipo de área',
                'Media de las ciudades intervenidas'
            ]
        }

        service.getBudgetSecondaryKeys = function(){
            return [
                'Territorio',
                'Desarrollo económico',
                'Bienestar',
                'Medioambiente',
                'Gestión',
            ];
        }

        service.getBudgetIndexes = function(){
            return [
                'Esfuerzo €/habitante',
                'Índice de diversidad',
            ];
        }

        service.getBudget = function(){
            var budget   = [];
            var keys     = service.getBudgetPrimaryKeys();
            var keys_sec = service.getBudgetSecondaryKeys();
            var indexes  = service.getBudgetIndexes();
            for(var i in keys){
                var primary = { "key" : keys[i] };
                var total = 0;
                for(var j in keys_sec){
                    var val = service.rnd(1000000, 2000000);
                    primary[ keys_sec[j] ] = val;
                    total += val;
                }
                for(var k in indexes){
                    primary[ indexes[k] ] = .15 + Math.random()*.85;
                }
                primary['total'] = total;
                budget.push(primary);
            }
            return budget;
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
                    data    : {
                        "population"   : service.getRndItems(25000, 400000),
                        "extension"    : service.getRndItems(50, 200),
                        "density"      : service.getRndItems(500, 1000),
                        "height"       : service.getRndItems(6, 20),
                        "buildings"    : service.getRndItems(10, 20),
                        "childhood"    : service.getRndItems(15, 35),
                        "aging"        : service.getRndItems(15, 35),
                        "foreigners"   : service.getRndItems(10, 20),
                        "unemployment" : service.getRndItems(5, 40),
                        "illiteracy"   : service.getRndItems(2, 8),
                        "workers"      : service.getRndItems(10, 20),
                        "budget"       : service.getBudget(),
                    }
                });
            };
            service.calculateCategoryItems(fake_data);
            service.data = fake_data;
            return fake_data;
        }

        return service;
    }
]);
