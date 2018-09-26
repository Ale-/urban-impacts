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
            'meth_es'  : 'Programas en los que se desarrollan los proyectos. Se corresponden con a las convocatorias del programa URBAN I (1994-1999) o del Programa URBAN II (2000-2006) y URBANA (2007-2012).'
          },
          'hood' : {
            'var'      : 'TipoBarrio',
            'label_es' : 'Tipo de área urbana',
            'label_en' : '',
            'meth_es'  : 'Áreas pertenecientes a las delimitaciones de centro histórico o perteneciente a barriadas fuera del centro histórico.'
          },
          'population' : {
              'var'      : 'POBLACION',
              'label_es' : 'Población total',
              'label_en' : '',
              'meth_es'  : 'Población total residente en las secciones censales.'
          },
          'area' : {
              'var'      : 'SUPERFICIE_km2',
              'label_es' : 'Extensión',
              'label_en' : '',
              'meth_es'  : 'Extensión en kilómetros cuadrados de las secciones censales incluidas en el área del proyecto.'
          },
          'density' : {
              'var'      : 'DENSIDAD',
              'label_es' : 'Densidad',
              'label_en' : '',
              'meth_es'  : 'Residentes por kilómetro cuadrado.'
          },
          'average_height' : {
              'var'      : 'ALTURAMEDIA',
              'label_es' : 'Altura media de edificios',
              'label_en' : '',
              'meth_es' : 'Número medio de plantas de los edificios destinados a vivienda.',
          },
          'youth' : {
              'var'      : 'INFANCIA',
              'label_es' : 'Infancia: menores de 14 años',
              'label_en' : '',
              'meth_es'  : 'Porcentaje de residentes menores de 14 años sobre población total.'
          },
          'aging' : {
              'var'      : 'ENVEJECIMIENTO',
              'label_es' : 'Envejicimiento: mayores de 65 años',
              'label_en' : '',
              'meth_es'  : 'Porcentaje de residentes mayores de 65 años sobre población total.'
          },
          'foreigners' : {
              'var'      : 'EXTRANJEROS',
              'label_es' : 'Población extranjera',
              'label_en' : '',
              'meth_es'  : 'Porcentaje de residentes extranjeros de países no comunitarios sobre población total.'
          },
          'unemployment' : {
              'var'      : 'DESEMPLEO',
              'label_es' : 'Población desempleada',
              'label_en' : '',
              'meth_es'  : 'Porcentaje de residentes mayores de 16 años en situación de desempleo.',
          },
          'illiteracy' : {
              'var'      : 'SINESTUDIOS',
              'label_es' : 'Población sin estudios',
              'label_en' : '',
              'meth_es'  : 'Porcentaje de residentes mayores de 16 años s analfabetos o con estudios primarios no finalizados sobre total de residentes de 16 o más años.'
          },
          'non_cualified' : {
              'var'      : 'NOCUALIFICADOS',
              'label_es' : 'Trabajadores no cualificados',
              'label_en' : '',
              'meth_es'  : 'Porcentaje de ocupados mayores de 16 años que desempeñan ocupaciones de trabajadores no cualificados sobre total de población ocupada.'
          },
          'bad_housing' : {
              'var'      : 'VIVIENDAMALESTADO',
              'label_es' : 'Edificios en mal estado',
              'label_en' : '',
              'meth_es'  : 'Porcentaje de edificios destinados a vivienda en situación de ruina y mal estado sobre el total de edificios destinados a vivienda.'
          },
          'economy_level' : {
              'var'      : 'INSE',
              'label_es' : 'Indicador de nivel socioeconómico INSE',
              'label_en' : '',
              'meth_es'  : 'Indicador aditivo de nivel socioeconómico calculado a partir de los 4 cuatro anteriores (población desempleada, población sin estudios, trabajadores no cualificados y edificios en mal estado). Para más información acerca de este ver Fernández et al., 2018.'
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
              'meth_es'  : 'Coste total elegible programado del proyecto, compuesto por las aportaciones de fondos comunitarios (FEDER Y FSE) y las aportaciones de las instituciones municipales, autonómicas y/o estatales.'
          },
          'budget_territory' : {
              'var'      : 'Porcentaje_Presupuesto_Territorio',
              'label_es' : 'Porcentaje de presupuesto territorio',
              'label_en' : '',
              'meth_es'  : 'Incluye las actuaciones adscritas a las áreas de <em>Mejora del medio ambiente urbano, Centros de formación y dotación de equipamientos sociales</em> en URBAN I  y las de <em>Utilización mixta y reurbanización de terrenos abandonados de modo compatible con el medio ambiente e Integración de transporte público y comunicaciones</em> en URBAN II.'
          },
          'budget_economy' : {
              'var'      : 'Porcentaje_Presupuesto_Economía',
              'label_es' : 'Porcentaje de presupuesto economía',
              'label_en' : '',
              'meth_es'  : 'Incluye las actuaciones adscritas a las áreas de <em>Desarrollo tejido económico</em> en URBAN I y a las de <em>Empresariado y pactos a favor del empleo</em> en URBAN II'
          },
          'budget_social' : {
              'var'      : 'Porcentaje_Presupuesto_Social',
              'label_es' : 'Porcentaje de presupuesto social',
              'label_en' : '',
              'meth_es'  : 'Incluye las actuaciones adscritas a las áreas de <em>Programas sociales y Programas de Formación</em> en URBAN I y de <em>Integración de marginados y acceso a los servicios básicos</em> en URBAN II.'
          },
          'budget_sustainability' : {
              'var'      : 'Porcentaje_Presupuesto_Sostenibilidad',
              'label_es' : 'Porcentaje de presupuesto en sostenibilidad',
              'label_en' : '',
              'meth_es'  : 'Incluye las actuaciones adscritas a las áreas de <em>Reducción y tratamiento de residuos, gestión eficiente y reducción de consumo</em> en URBAN II.'
          },
          'budget_management' : {
              'var'      : 'Porcentaje_Presupuesto_Gestión',
              'label_es' : 'Porcentaje de presupuesto de gestión',
              'label_en' : '',
              'meth_es'  : 'Incluye las actuaciones adscritas a las áreas de <em>Gestión, seguimiento, asistencia técnica y evaluación</em> en URBAN I y de <em>Evaluación, gestión y seguimiento Mejoras en el gobierno urbano</em> en URBAN II'
          },
          'investment' : {
              'var'      : 'Esfuerzo_01',
              'label_es' : 'Índice de esfuerzo',
              'label_en' : '',
              'meth_es'  : 'Coste Elegible total sobre población afectada por el proyecto según su documento de programación.'
          },
          'diversity' : {
              'var'      : 'HHI_MA',
              'label_es' : 'Índice de diversidad',
              'label_en' : '',
              'meth_es'  : 'Considera la concentración o dispersión del gasto entre las macro-áreas de cada proyecto. El valor 0 significa que todo el presupuesto se concentra en un área y el valor 1 que el presupuesto se distribuye por igual en las cinco macro-áreas de actuación.'
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
