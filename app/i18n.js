'use strict';

/**
 *  i18n
 *  A service to handle interface translation
 */
angular.module('urban_impacts.i18n', [])

.filter('t', function(Langs) {
    return function(text){
        return Langs.get(text);
    };
})

.filter('t_ind', function(Langs, IndicatorsService) {
    return function(indicator){
        return Langs.get_indicator(indicator);
    };
})

.factory('Langs', function()
{
    var translations = {
        en: {
            // location.html
            'Volver al listado general' : 'Go back to the main list',
            'Nota' : 'Note',
            'se pueden consultar los valores de las gráficas, así como la definición de las variables, pasando el cursor por encima de los mismas' : 'you can check chart values and variable definitions hovering over them',
            'Área Urbana' : 'Urban Area',
            'Composición social' : 'Social composition',
            'Estrategia' : 'Strategy',
            'Territorio' : 'Territory',
            'Desarrollo económico' : 'Economic development',
            'Bienestar' : 'Welfare',
            'Medioambiente' : 'Environment',
            'Gestión' : 'Management',
            'Nota metodológica' : 'Notes on methodology',
            'Consultar nota metodológica de la investigación' : 'Check the notes on methodology of this research',
            'Citar de la forma siguiente' : 'Quote as follows',
            'Presupuesto desglosado' : 'Budget breakdown',
            // list.html
            'se pueden reordenar la tabla en función de cualquiera de las variables mostradas pulsando sobre el nombre de la variable en la cabecera de la tabla' : 'you can sort the table by any variable clicking on its name in the table header',
            'Ver todo' : 'See all',
            'Barriada' : 'Neighborhood',
            'Casco Histórico' : 'Historic Center',
            'Volver atrás' : 'Go back',
        }
    };

    var l = window.location.pathname.split('/')[1];

    return {
        lang : l,

        langs : [
            { k: 'es', v: 'es'},
            { k: 'en', v: 'en'},
        ],

        get: function(text){
            var lang = this.lang;
            return (lang == 'es' || !translations[lang] ) ? text : translations[lang][text];
        },

        get_indicator: function(indicator){
            var lang = this.lang;
            return (lang == 'es' || !indicator['label_'+ lang] ) ? indicator['label_es'] : indicator['label_'+ lang];
        },

        get_note: function(indicator){
            var lang = this.lang;
            return (lang == 'es' || !indicator['meth_'+ lang] ) ? indicator['meth_es'] : indicator['meth_'+ lang];
        },

        get_legend_text : function(key, val){
            return {
                'es' : {
                    'b_c' : "Media de proyectos en " + val,
                    'd'   : "Average of cities in catalog",
                },
                'en' : {
                    'b_c' : "Project average in " + val,
                    'd'   : "Average of cities in catalog",
                }
            }[this.lang][key]
        },

    }
});
