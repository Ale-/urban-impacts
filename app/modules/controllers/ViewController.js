angular.module('urban_impacts.view_controller', [])

/**
 *   Controller that handles the view of locations
 */
.controller("ViewController", [
    'CONFIG',
    'data',
    function(CONFIG, data)
    {
        this.data = data

        if(CONFIG.DEBUG){
          console.log("View controller loaded.");
          console.log("Current data: ");
          console.log(this.data);
        }
    }
]);
