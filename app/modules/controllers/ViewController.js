angular.module('urban_impacts.view_controller', [])

/**
 *   Controller that handles the view of locations
 */
.controller("ViewController", [
    'CONFIG',
    'data',
    'DataService',
    function(CONFIG, data, DataService)
    {
        this.data       = data
        this.sort_order = 'context';
        this.reverse    = false;
        this.contexts   = DataService.getCategory('context');
        this.programs   = DataService.getCategory('program');
        this.selected_context = '';
        this.selected_program = '';

        /**
         *  Sorts projects
         */
        this.sortBy = function(property){
            this.reverse = (this.sort_order === property) ? !this.reverse : false;
            this.sort_order = property;
        }

        this.setContext = function(i){
            this.selected_context = i ? i.k : '';
        }

        this.setProgram = function(i){
            this.selected_program = i ? i.k : '';
        }

        /**
         *  This filter shows projects according to filters
         */
        this.show = angular.bind(this, function(item){
            return (!this.selected_context || this.selected_context == item.context ) &&
                   (!this.selected_program || this.selected_program == item.program );
        });

        if(CONFIG.DEBUG){
            console.log("View controller loaded.");
            console.log("Current data: ");
            console.log(this.data);
        }
    }
]);
