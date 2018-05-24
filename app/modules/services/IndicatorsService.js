angular.module('urban_impacts.indicators_service', [])

/**
 *   IndicatorsService
 *   This service manages all the information related to the different categories
 *   used in the dataset, allowing us to decouple the name of the variables (source-data/
 *   current app) and related labels
 */
.factory("IndicatorsService", [ function(){

    var service = {};

    /**
     *  data
     *  Categories: variable names, labels, languages
     */
    var data = {
          'id'   : {
              'var'      : 'CODPROY',
              'label_es' : 'Id',
          },
          'town' : {
              'var'      : 'MUNICIPIO',
              'label_es' : 'Municipio',
              'label_en' : '',
          },
          'codine' : {
              'var'      : 'CODINE',
              'label_es' : 'Código INE',
              'label_en' : '',
          },
          'project' : {
            'var'      : 'Proyecto',
            'label_es' : 'Nombre del proyecto',
            'label_en' : '',
          },
          'program' : {
            'var'      : 'CONVOCATORIA_2',
            'label_es' : 'Programa',
            'label_en' : '',
          },
          'hood' : {
            'var'      : 'TipoBarrio',
            'label_es' : 'Tipo de barrio',
            'label_en' : '',
          },
          'population' : {
              'var'      : 'POBLACION',
              'label_es' : 'Población total',
              'label_en' : '',
          },
          'area' : {
              'var'      : 'SUPERFICIE_km2',
              'label_es' : 'Superficie',
              'label_en' : '',
          },
          'density' : {
              'var'      : 'DENSIDAD',
              'label_es' : 'Densidad de habitantes',
              'label_en' : '',
          },
          'average_height' : {
              'var'      : 'ALTURAMEDIA',
              'label_es' : 'Altura media',
              'label_en' : '',
          },
          'youth' : {
              'var'      : 'INFANCIA',
              'label_es' : 'Infancia',
              'label_en' : '',
          },
          'aging' : {
              'var'      : 'ENVEJECIMIENTO',
              'label_es' : 'Envejicimiento',
              'label_en' : '',
          },
          'foreigners' : {
              'var'      : 'EXTRANJEROS',
              'label_es' : 'Extranjeros',
              'label_en' : '',
          },
          'unemployment' : {
              'var'      : 'DESEMPLEO',
              'label_es' : 'Desempleo',
              'label_en' : '',
          },
          'illiteracy' : {
              'var'      : 'SINESTUDIOS',
              'label_es' : 'Sin estudios',
              'label_en' : '',
          },
          'non_cualified' : {
              'var'      : 'NOCUALIFICADOS',
              'label_es' : 'No cualificados',
              'label_en' : '',
          },
          'bad_housing' : {
              'var'      : 'VIVIENDAMALESTADO',
              'label_es' : 'Vivienda en mal estado',
              'label_en' : '',
          },
          'economy_level' : {
              'var'      : 'INSE',
              'label_es' : 'Indicador de nivel socioeconómico',
              'label_en' : '',
          },
          'total_cost' : {
              'var'      : 'CosteElegibletotal',
              'label_es' : 'Coste elegible total',
              'label_en' : '',
          },
          'affected_people' : {
              'var'      : 'Poblacionafectada',
              'label_es' : 'Población afectada',
              'label_en' : '',
          },
          'budget' : {
              'var'      : 'Presupuesto_Total',
              'label_es' : 'Presupuesto total',
              'label_en' : '',
          },
          'budget_territory' : {
              'var'      : 'Porcentaje_Presupuesto_Territorio',
              'label_es' : 'Porcentaje de presupuesto territorio',
              'label_en' : '',
          },
          'budget_economy' : {
              'var'      : 'Porcentaje_Presupuesto_Economía',
              'label_es' : 'Porcentaje de presupuesto economía',
              'label_en' : '',
          },
          'budget_social' : {
              'var'      : 'Porcentaje_Presupuesto_Social',
              'label_es' : 'Porcentaje de presupuesto social',
              'label_en' : '',
          },
          'budget_sustainability' : {
              'var'      : 'Porcentaje_Presupuesto_Sostenibilidad',
              'label_es' : 'Porcentaje de presupuesto en sostenibilidad',
              'label_en' : '',
          },
          'budget_management' : {
              'var'      : 'Porcentaje_Presupuesto_Gestión',
              'label_es' : 'Porcentaje de presupuesto de gestión',
              'label_en' : '',
          },
          'investment' : {
              'var'      : 'Esfuerzo_01',
              'label_es' : 'Inversión por habitante',
              'label_en' : '',
          },
          'diversity' : {
              'var'      : 'HHI_MA',
              'label_es' : 'Índice de diversidad',
              'label_en' : '',
          },
    };

    /**
     *  averaged
     *  Names of the variables (in the source_data) that
     *  are averaged in the final viz
     */
    var averaged = [
        'population',
        'area',
        'density',
        'average_height',
        'youth',
        'aging',
        'foreigners',
        'unemployment',
        'illiteracy',
        'non_cualified',
        'bad_housing',
        'economy_level',
        'total_cost',
        'affected_people',
        'budget',
        'budget_territory',
        'budget_economy',
        'budget_social',
        'budget_sustainability',
        'budget_management',
        'investment',
        'diversity'
    ].map( function(v){ return data[v].var } );

    /**
     *  budget_keys
     *  Names of the variables (in the source_data)
     *  that are part of the budget block
     *  NOTE: not being used right now, useful if
     *  budget visualization changes to another layout
     */
    var budget_keys = [
      'budget_territory',
      'budget_economy',
      'budget_social',
      'budget_sustainability',
      'budget_management'
    ].map( function(v){ return data[v].var } );

    /**
     *  budget_keys
     *  Names of the variables (in the source_data)
     *  that are part of the budget indexes block
     *  NOTE: not being used right now, useful if
     *  budget visualization changes to another layout
     */
    var budget_keys_alt = [
      'investment',
      'diversity'
    ]

    /**
     *  get
     *  Get service main data
     */
    service.get = function(){
        return data;
    }

    /**
     *  getBudgetKeys
     *  Get variable names of the categories inside the budget block
     */
    service.getBudgetKeys = function(){
        return budget_keys;
    }

    /**
     *  getBudgetAltKeys
     *  Get variable names of the categories inside the budget indexes
     */
    service.getBudgetAltKeys = function(){
        return budget_keys_alt;
    }

    /**
     *  isAveraged
     *  Check if a category is averaged
     *
     *  @param {string} key - Variable name of the category
     */
    service.isAveraged = function(key){
         return averaged.indexOf(key) > -1;
    }

    return service;
}])
