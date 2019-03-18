angular.module('urban_impacts.data_service', [])

/**
 *   Factory that stores the data visualized in the app
 */
.factory("DataService", ['$http', 'IndicatorsService', 'CONFIG', 'Langs', function($http, IndicatorsService, CONFIG, Langs){

    // Data indicators, encapsulated in another service to decouple it
    var indicators = IndicatorsService.get();

    /**
     *  Service object
     */
    var service = {
        data    : [],
        geodata : {},
        categories : {
            'program' : {
                '1' : { k : 'Urban I',  v: 1, n : 0 },
                '2' : { k : 'Urban II', v: 2, n : 0 },
                '3' : { k : 'Urbana',   v: 2, n : 0 },
            },
            'hood' : {
                '0' : { k : 'Barriada',        v: 1, n : 0 },
                '1' : { k : 'Casco Histórico', v: 2, n : 0 },
            },
        },
        geodata  : {},
    };

    /**
     *  calculateAverages
     *  Calculates the average value of all chapters in the dataset
     */

    var averages = {};
    service.calculateAverages = function(items){
        for(var i in items){
            var p = items[i];
            var item_program = p[ indicators.program.var ];
            var item_hood    = p[ indicators.hood.var ];
            service.categories.program[ item_program ].n++;
            service.categories.hood[ item_hood ].n++;
            for(var k in indicators){
                var key = indicators[k].var;
                var value = parseFloat(p[key]);
                if(!averages[key]){
                    averages[key] = {
                        'program' : {
                            '1' : {
                               'items' : 0,
                               'value' : 0,
                            },
                            '2' : {
                               'items' : 0,
                               'value' : 0,
                            },
                            '3' : {
                               'items' : 0,
                               'value' : 0,
                            },
                        },
                        'hood'    : {
                            '0' : {
                               'items' : 0,
                               'value' : 0,
                            },
                            '1' : {
                               'items' : 0,
                               'value' : 0,
                            },
                        },
                        'all' : {
                           'items' : 0,
                           'value' : 0,
                        },
                    }
                };

                averages[key].program[ item_program ].value += value ? value : 0;
                averages[key].program[ item_program ].items++;
                averages[key].hood[ item_hood ].value       += value ? value : 0;
                averages[key].hood[ item_hood ].items++;
                averages[key].all.value                     += value ? value : 0;
                averages[key].all.items++;
            }
        }
        for(var k in averages){
            var avg = averages[k];
            avg.program['1'].value /= avg.program['1'].items;
            avg.program['2'].value /= avg.program['2'].items;
            avg.program['3'].value /= avg.program['3'].items;
            avg.hood['0'].value    /= avg.hood['0'].items;
            avg.hood['1'].value    /= avg.hood['1'].items;
            avg.all.value          /= avg.all.items;
        }
    };

    /**
     *  get
     *  Returns the data of the dataset and cache it
     */
    service.get = function()
    {
        if(!CONFIG.FAKE_DATA){
            if(service.data.length > 0){
                if(CONFIG.DEBUG)
                    console.log("Data retrieved from cache");
                return service.data;
            } else {
                return service.set();
            }
        } else {
            if(CONFIG.DEBUG)
                console.log("Generating fake data");
            return service.generateData();
        }
    };

    /**
     *  getCategory
     *  Return info about a category
     */
    service.getCategory = function(category){
        return service.categories[category];
    }

    /**
     *  getCategories
     *  Return all categories
     */
    service.getCategories = function(){
        return this.categories;
    }

    /**
     *  getProject
     *  Return a project givens its id
     *
     *  @param {int} id - Id of the project we want to retrieve
     */
    service.getProject = function(id){
        pid = indicators.id.var;
        for(var i in service.data)
            if(service.data[i][pid] == id)
                return service.data[i];
    };

    /**
     *  set
     *  Loads data into the factory from an external source
     *  This external source (data_path) is defined as a
     *  constant value in app.js
     */
    service.set = function(){
        if(CONFIG.DEBUG)
            console.log("Data loaded");
        return $http.get(CONFIG.DATA_PATH, { responseType:'arraybuffer' }).then(
            function(response){
                // Set data
                var wb = XLSX.read(response.data, {type:"array"});
                var d  = XLSX.utils.sheet_to_json(wb.Sheets[wb.SheetNames[0]]);
                var source_data = d;
                service.calculateAverages(source_data);
                service.data = source_data;
                for(var i in source_data){
                    var project = service.data[i];
                    for(var key in project){
                        if( IndicatorsService.isAveraged(key) ){
                            project[key] = [
                                {
                                    k : project[indicators.project.var],
                                    v : parseFloat(project[key])
                                },
                                {
                                    k : Langs.get_legend_text('b_c', service.getCategory('program')[project[indicators.program.var]]['k'].toUpperCase()),
                                    v : averages[key].program[ project[ indicators.program.var] ].value
                                },
                                {
                                    k : Langs.get_legend_text('b_c', service.getCategory('hood')[project[indicators.hood.var]]['k'].toLowerCase()),
                                    v : averages[key].hood[ project[ indicators.hood.var] ].value
                                },
                                {
                                    k : Langs.get_legend_text('d'),
                                    v : averages[key].all.value
                                },
                            ];
                        }
                    }
                 }
                service.geodata = new L.Shapefile(CONFIG.GEODATA_PATH);
                return service.data;
            }, function(response){
                if(CONFIG.DEBUG && !CONFIG.FAKE_DATA)
                    console.log(response);
            }
        );
    };

    /**
     *  getBudget
     *  Returns budget data
     */
    service.getBudget = function(id){
        var keys     = IndicatorsService.getBudgetKeys();
        var budget   = [];
        var project  = this.getProject(id);
        var averages = [
            project[indicators.project.var],
            Langs.get_legend_text('b_c', this.getCategory('program')[project[indicators.program.var]]['k'].toUpperCase()),
            Langs.get_legend_text('b_c', this.getCategory('hood')[project[indicators.hood.var]]['k'].toLowerCase()),
            Langs.get_legend_text('d'),
        ];
        for(var i in averages){
            var avg = { 'key' : averages[i] };
            for(var k in keys){
                avg[ keys[k] ] = project[ keys[k] ].find( function(element){
                    return element.k == averages[i];
                })['v'];
            }
            budget.push(avg);
        }
        return budget;
    }

    /**
     *  getGeoata
     *  Returns geodata
     */
    service.getGeodata = function(){
        return service.geodata;
    };

    return service;
}]);
