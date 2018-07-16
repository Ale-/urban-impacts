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
            'meth_es'  : 'Proyectos correspondientes a las convocatorias del programa URBAN I (1994-1999) o del Programa URBAN II (2000-2006).'
          },
          'hood' : {
            'var'      : 'TipoBarrio',
            'label_es' : 'Tipo de barrio',
            'label_en' : '',
            'meth_es'  : 'Áreas pertenecientes a las delimitaciones de centro histórico o perteneciente a barriadas fuera del centro histórico.'
          },
          'population' : {
              'var'      : 'POBLACION',
              'label_es' : 'Población total',
              'label_en' : '',
              'meth_es'  : 'Población total residente en las secciones censales. Suma de las secciones censales afectadas.'
          },
          'area' : {
              'var'      : 'SUPERFICIE_km2',
              'label_es' : 'Superficie',
              'label_en' : '',
              'meth_es'  : 'Extensión en kilómetros cuadrados de las secciones censales. Suma de las secciones censales afectadas.'
          },
          'density' : {
              'var'      : 'DENSIDAD',
              'label_es' : 'Densidad de habitantes',
              'label_en' : '',
              'meth_es'  : 'Residentes por Kilómetro cuadrado. Suma de las secciones censales afectadas.'
          },
          'average_height' : {
              'var'      : 'ALTURAMEDIA',
              'label_es' : 'Altura media',
              'label_en' : '',
              'meth_es' : 'Número medio de plantas de los edificios destinados a viviendas en las secciones censales afectadas.',
          },
          'youth' : {
              'var'      : 'INFANCIA',
              'label_es' : 'Infancia',
              'label_en' : '',
              'meth_es'  : 'Porcentaje de residentes menores de 14 años en secciones censales afectadas.'
          },
          'aging' : {
              'var'      : 'ENVEJECIMIENTO',
              'label_es' : 'Envejicimiento',
              'label_en' : '',
              'meth_es'  : 'Porcentaje de residentes mayores de 65 años en secciones censales afectadas.'
          },
          'foreigners' : {
              'var'      : 'EXTRANJEROS',
              'label_es' : 'Extranjeros',
              'label_en' : '',
              'meth_es'  : 'Porcentaje de residentes extranjeros de países no comunitarios.'
          },
          'unemployment' : {
              'var'      : 'DESEMPLEO',
              'label_es' : 'Desempleo',
              'label_en' : '',
              'meth_es'  : 'Porcentaje de residentes mayores de 16 años en situación de desempleo.',
          },
          'illiteracy' : {
              'var'      : 'SINESTUDIOS',
              'label_es' : 'Sin estudios',
              'label_en' : '',
              'meth_es'  : 'Porcentaje de residentes mayores de 16 años s analfabetos o con estudios primarios no finalizados.'
          },
          'non_cualified' : {
              'var'      : 'NOCUALIFICADOS',
              'label_es' : 'No cualificados',
              'label_en' : '',
              'meth_es'  : 'Porcentaje de ocupados mayores de 16 años peones o en trabajos no cualificados.'
          },
          'bad_housing' : {
              'var'      : 'VIVIENDAMALESTADO',
              'label_es' : 'Vivienda en mal estado',
              'label_en' : '',
              'meth_es'  : 'Porcentaje de edificios destinados a vivienda en ruina, mal estado o e'
          },
          'economy_level' : {
              'var'      : 'INSE',
              'label_es' : 'Indicador de nivel socioeconómico',
              'label_en' : '',
              'meth_es'  : ' Indicador aditivo de nivel socioeconómico calculado a partir de los 4 cuatro anteriores. Para más información acerca de este ver <a href="https://doi.org/10.5944/empiria.39.2018.20877">Fernández et al, 2018</a>.'
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
              'meth_es'  : 'Coste total elegible programado del proyecto, compuesto por las aportaciones de fondos comunitarios (FEDER Y FSE) y las aportaciones de las instituciones  municipales, Autonómicas y/o estatales.'
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
              'label_es' : 'Inversión por habitante',
              'label_en' : '',
              'meth_es'  : 'Calculado como el Coste Elegible total entre la estimación de población afectada total incluida en el documento de programación proyecto.'
          },
          'diversity' : {
              'var'      : 'HHI_MA',
              'label_es' : 'Índice de diversidad',
              'label_en' : '',
              'meth_es'  : 'Índice de diversidad de H Calculado a partir de la distribución del número de actuaciones en cada una de las macro-áreas entre el total de las actuaciones.'
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
