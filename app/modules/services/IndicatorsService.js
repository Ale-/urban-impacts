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
              'label_en' : 'Town',
          },
          'codine' : {
              'var'      : 'CODINE',
              'label_es' : 'Código INE',
              'label_en' : 'INE Code',
          },
          'project' : {
            'var'      : 'Proyecto',
            'label_es' : 'Nombre del proyecto',
            'label_en' : 'Project name',
          },
          'program' : {
            'var'      : 'CONVOCATORIA_2',
            'label_es' : 'Programa',
            'label_en' : 'Program',
            'meth_es'  : 'Programas en los que se desarrollan los proyectos. Se corresponden con a las convocatorias del programa URBAN I (1994-1999) o del Programa URBAN II (2000-2006) y URBANA (2007-2012).',
            'meth_en'  : 'Programs in which the projects are developed. They correspond to the calls for the URBAN I program (1994-1999) or the URBAN II Program (2000-2006) and URBANA (2007-2012).'
          },
          'hood' : {
            'var'      : 'TipoBarrio',
            'label_es' : 'Tipo de área urbana',
            'label_en' : 'Type of urban area',
            'meth_es'  : 'Áreas pertenecientes a las delimitaciones de centro histórico o perteneciente a barriadas fuera del centro histórico.',
            'meth_en'  : 'Areas belonging to the delimitations of the historic center or belonging to neighborhoods outside the historic center',
          },
          'population' : {
              'var'      : 'POBLACION',
              'label_es' : 'Población total',
              'label_en' : 'Total population',
              'meth_es'  : 'Población total residente en las secciones censales.',
              'meth_en'  : 'Total population resident in the census sections.',
          },
          'area' : {
              'var'      : 'SUPERFICIE_km2',
              'label_es' : 'Extensión',
              'label_en' : 'Area',
              'meth_es'  : 'Extensión en kilómetros cuadrados de las secciones censales incluidas en el área del proyecto.',
              'meth_en'  : 'Extension in square kilometers of the census sections included in the project area.'
          },
          'density' : {
              'var'      : 'DENSIDAD',
              'label_es' : 'Densidad',
              'label_en' : 'Density',
              'meth_es'  : 'Residentes por kilómetro cuadrado.',
              'meth_es'  : 'Residents per square kilometer.'
          },
          'average_height' : {
              'var'      : 'ALTURAMEDIA',
              'label_es' : 'Altura media de edificios',
              'label_en' : 'Average housing height',
              'meth_es' : 'Número medio de plantas de los edificios destinados a vivienda.',
              'meth_en' : 'Average number of housing building floors',
          },
          'youth' : {
              'var'      : 'INFANCIA',
              'label_es' : 'Infancia: menores de 14 años',
              'label_en' : 'Childhood: younger than 14 years',
              'meth_es'  : 'Porcentaje de residentes menores de 14 años sobre población total.',
              'meth_es'  : 'Percentage of residents under 14 years of age over total population.'
          },
          'aging' : {
              'var'      : 'ENVEJECIMIENTO',
              'label_es' : 'Envejicimiento: mayores de 65 años',
              'label_en' : 'Aged population: older than 65 years',
              'meth_es'  : 'Porcentaje de residentes mayores de 65 años sobre población total.',
              'meth_en'  : 'Percentage of residents older than 65 years over total population.',
          },
          'foreigners' : {
              'var'      : 'EXTRANJEROS',
              'label_es' : 'Población extranjera',
              'label_en' : 'Foreign population',
              'meth_es'  : 'Porcentaje de residentes extranjeros de países no comunitarios sobre población total.',
              'meth_en'  : 'Percentage of foreign residents from non-EU countries over total population.'
          },
          'unemployment' : {
              'var'      : 'DESEMPLEO',
              'label_es' : 'Población desempleada',
              'label_en' : 'Unemployed population',
              'meth_es'  : 'Porcentaje de residentes mayores de 16 años en situación de desempleo.',
              'meth_en'  : 'Percentage of unemployed residents older than 16 years.'
          },
          'illiteracy' : {
              'var'      : 'SINESTUDIOS',
              'label_es' : 'Población sin estudios',
              'label_en' : 'Illiterate population',
              'meth_es'  : 'Porcentaje de residentes mayores de 16 años analfabetos o con estudios primarios no finalizados sobre total de residentes de 16 o más años.',
              'meth_en'  : 'Percentage of residents, older than 16, illiterate or with unfinished primary education over total residents aged 16 or over.'
          },
          'non_cualified' : {
              'var'      : 'NOCUALIFICADOS',
              'label_es' : 'Trabajadores no cualificados',
              'label_en' : 'Non cualified workers',
              'meth_es'  : 'Porcentaje de ocupados mayores de 16 años que desempeñan ocupaciones de trabajadores no cualificados sobre total de población ocupada.',
              'meth_en'  : 'Percentage of employed unskilled workers older than 16 years over the total employed population.',
          },
          'bad_housing' : {
              'var'      : 'VIVIENDAMALESTADO',
              'label_es' : 'Edificios en mal estado',
              'label_en' : 'Poor condition buildings',
              'meth_es'  : 'Porcentaje de edificios destinados a vivienda en situación de ruina y mal estado sobre el total de edificios destinados a vivienda.',
              'meth_en'  : 'Percentage of buildings destined to housing in a situation of ruin and bad condition over the total of buildings destined for housing.',
          },
          'economy_level' : {
              'var'      : 'INSE',
              'label_es' : 'Nivel socioeconómico',
              'label_en' : 'Socio-economic level',
              'meth_es'  : 'Indicador aditivo de nivel socioeconómico calculado a partir de los 4 cuatro anteriores (población desempleada, población sin estudios, trabajadores no cualificados y edificios en mal estado). Para más información acerca de este ver Fernández et al., 2018 [https://doi.org/10.5944/empiria.39.2018.20877].',
              'meth_en'  : 'Additive indicator of socioeconomic level calculated from the four previous four (unemployed population, population without studies, unskilled workers and buildings in poor condition). For more information about this see Fernández et al., 2018 [https://doi.org/10.5944/empiria.39.2018.20877].',
          },
          'total_cost' : {
              'var'      : 'CosteElegibletotal',
              'label_es' : 'Coste elegible total',
              'label_en' : 'Total eligible cost',
          },
          'affected_people' : {
              'var'      : 'Poblacionafectada',
              'label_es' : 'Población afectada',
              'label_en' : 'Affected population',
          },
          'budget' : {
              'var'      : 'Presupuesto_Total',
              'label_es' : 'Presupuesto total',
              'label_en' : 'Total budget',
              'meth_es'  : 'Coste total elegible programado del proyecto, compuesto por las aportaciones de fondos comunitarios (FEDER Y FSE) y las aportaciones de las instituciones municipales, autonómicas y/o estatales.',
              'meth_en'  : 'Total project eligible cost, made up of contributions from community funds (FEDER and ESF) and contributions from municipal, regional and/or State institutions.',
          },
          'budget_territory' : {
              'var'      : 'Porcentaje_Presupuesto_Territorio',
              'label_es' : 'Porcentaje de presupuesto territorio',
              'label_en' : 'Territory budget',
              'meth_es'  : 'Incluye las actuaciones adscritas a las áreas de <em>Mejora del medio ambiente urbano, Centros de formación y dotación de equipamientos sociales</em> en URBAN I  y las de <em>Utilización mixta y reurbanización de terrenos abandonados de modo compatible con el medio ambiente e Integración de transporte público y comunicaciones</em> en URBAN II.',
              'meth_en'  : 'It includes the actions assigned to the areas of <em>Improvement of the urban environment, Training centers and provision of social facilities</em> in URBAN I and those of <em>Mixed use and redevelopment of abandoned land in a manner compatible with the environment and Integration of public transport and communications</em> in URBAN II.',
          },
          'budget_economy' : {
              'var'      : 'Porcentaje_Presupuesto_Economía',
              'label_es' : 'Porcentaje de presupuesto economía',
              'label_en' : 'Economy budget',
              'meth_es'  : 'Incluye las actuaciones adscritas a las áreas de <em>Desarrollo tejido económico</em> en URBAN I y a las de <em>Empresariado y pactos a favor del empleo</em> en URBAN II',
              'meth_en'  : 'It includes the actions assigned to the areas of <em>Desarrollo tejido económico</em> in URBAN I and those of <em>Entrepreneurship and pacts in favor of employment</em> in URBAN II',
          },
          'budget_social' : {
              'var'      : 'Porcentaje_Presupuesto_Social',
              'label_es' : 'Porcentaje de presupuesto social',
              'label_en' : 'Social budget',
              'meth_es'  : 'Incluye las actuaciones adscritas a las áreas de <em>Programas sociales y Programas de Formación</em> en URBAN I y de <em>Integración de marginados y acceso a los servicios básicos</em> en URBAN II.',
              'meth_en'  : 'It includes the actions assigned to the areas of <em>Social Programs and Training Programs </ em> in URBAN I and <em>Integration of the marginalized and access to basic services</em> in URBAN II.',
          },
          'budget_sustainability' : {
              'var'      : 'Porcentaje_Presupuesto_Sostenibilidad',
              'label_es' : 'Porcentaje de presupuesto de sostenibilidad',
              'label_en' : 'Sustainability budget',
              'meth_es'  : 'Incluye las actuaciones adscritas a las áreas de <em>Reducción y tratamiento de residuos, gestión eficiente y reducción de consumo</em> en URBAN II.',
              'meth_en'  : 'It includes the actions assigned to the areas of <em>Waste reduction and treatment, efficient management and consumption reduction</em> in URBAN II.',
          },
          'budget_management' : {
              'var'      : 'Porcentaje_Presupuesto_Gestión',
              'label_es' : 'Porcentaje de presupuesto de gestión',
              'label_en' : 'Management budget',
              'meth_es'  : 'Incluye las actuaciones adscritas a las áreas de <em>Gestión, seguimiento, asistencia técnica y evaluación</em> en URBAN I y de <em>Evaluación, gestión y seguimiento Mejoras en el gobierno urbano</em> en URBAN II',
              'meth_en'  : 'It includes the actions assigned to the areas of <em>Management, monitoring, technical assistance and evaluation</em> in URBAN I and <em>Evaluation, management and monitoring Improvements in urban government </em> in URBAN II',
          },
          'investment' : {
              'var'      : 'Esfuerzo_01',
              'label_es' : 'Índice de esfuerzo',
              'label_en' : 'Effort index',
              'meth_es'  : 'Coste Elegible total sobre población afectada por el proyecto según su documento de programación.',
              'meth_en'  : 'Total eligible cost on the population affected by the project according to its programming document',
          },
          'diversity' : {
              'var'      : 'HHI_MA',
              'label_es' : 'Índice de diversidad',
              'label_en' : 'Diversity index',
              'meth_es'  : 'Considera la concentración o dispersión del gasto entre las macro-áreas de cada proyecto. El valor 0 significa que todo el presupuesto se concentra en un área y el valor 1 que el presupuesto se distribuye por igual en las cinco macro-áreas de actuación.',
              'meth_en'  : 'Considers the concentration or dispersion of spending between the macro-areas of each project. The value 0 means that the entire budget is concentrated in one area and the value 1 that the budget is distributed equally in the five macro-areas of action',
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
