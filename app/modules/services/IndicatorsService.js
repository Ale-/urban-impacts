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
              'var'      : 'codigo_proyecto',
              'label_es' : 'Id',
          },
          'town' : {
              'var'      : 'municipio',
              'label_es' : 'Municipio',
              'label_en' : 'City',
          },
          'codine' : {
              'var'      : 'codigo_ine',
              'label_es' : 'Código INE',
              'label_en' : 'INE Code',
          },
          'project' : {
            'var'      : 'nombre_proyecto',
            'label_es' : 'Nombre del proyecto',
            'label_en' : 'Project',
          },
          'program' : {
            'var'      : 'convocatoria',
            'label_es' : 'Programa',
            'label_en' : 'Program',
            'meth_es'  : 'Programas en los que se desarrollan los proyectos. Se corresponden con a las convocatorias del programa URBAN I (1994-1999), del Programa URBAN II (2000-2006) y URBANA (2007-2012).  Los casos de Langreo, Avilés-Corvera (URBAN I) y Teruel (URBAN II) no han sido incluidos por no cumplir las características definidas por el Proyecto.',
            'meth_en'  : 'Programs in which the project have been  developed. They correspond to the calls for URBAN I program (1994-1999), URBAN II  (2000-2006), and URBANA (2007-2012) Initiatives. The cases of Langreo, Avilés-Corvera (URBAN I) and Teruel (URBAN II) have not been included in the catalogue due to the fact that they do not have the characteristics defined by the Project.'
          },
          'hood' : {
            'var'      : 'barrio',
            'label_es' : 'Tipo de área urbana',
            'label_en' : 'Type of urban area',
            'meth_es'  : 'Áreas pertenecientes a las delimitaciones de centro histórico o perteneciente a barriadas fuera del centro histórico.',
            'meth_en'  : 'Areas belonging to the historic center of the city or belonging to neighborhoods outside the historic center.',
          },
          'population' : {
              'var'      : 'poblacion_afectada',
              'label_es' : 'Población total',
              'label_en' : 'Total population',
              'meth_es'  : 'Población total residente en el área de proyecto.',
              'meth_en'  : 'Total population resident in the project area.',
          },
          'area' : {
              'var'      : 'superficie',
              'label_es' : 'Extensión',
              'label_en' : 'Area',
              'meth_es'  : 'Extensión en kilómetros cuadrados del área de proyecto.',
              'meth_en'  : 'Extension in square kilometers of the project area.'
          },
          'density' : {
              'var'      : 'densidad',
              'label_es' : 'Densidad',
              'label_en' : 'Population density',
              'meth_es'  : 'Habitantes por kilómetro cuadrado.',
              'meth_es'  : 'Residents per square kilometer.'
          },
          'average_height' : {
              'var'      : 'altura_media',
              'label_es' : 'Altura media de edificios',
              'label_en' : 'Buildings average height',
              'meth_es' : 'Número medio de plantas de los edificios destinados a vivienda.',
              'meth_en' : 'Average number of floors in buildings.',
          },
          'youth' : {
              'var'      : 'infancia',
              'label_es' : 'Infancia: menores de 14 años',
              'label_en' : 'Childhood: younger than 14 years',
              'meth_es'  : 'Porcentaje de residentes menores de 14 años sobre el total de la población.',
              'meth_en'  : 'Percentage of residents under 14 years of age over total population.'
          },
          'aging' : {
              'var'      : 'envejecimiento',
              'label_es' : 'Envejecimiento: mayores de 65 años',
              'label_en' : 'Aged population: older than 65 years',
              'meth_es'  : 'Porcentaje de residentes mayores de 65 años sobre población total.',
              'meth_en'  : 'Percentage of residents older than 65 years over total population.',
          },
          'foreigners' : {
              'var'      : 'extranjeros',
              'label_es' : 'Población extranjera',
              'label_en' : 'Foreign population',
              'meth_es'  : 'Porcentaje de residentes extranjeros de países no comunitarios sobre población total.',
              'meth_en'  : 'Percentage of foreign residents from non-EU countries over total population.'
          },
          'unemployment' : {
              'var'      : 'desempleo',
              'label_es' : 'Población desempleada',
              'label_en' : 'Unemployed population',
              'meth_es'  : 'Porcentaje de residentes mayores de 16 años en situación de desempleo.',
              'meth_en'  : 'Percentage of unemployed residents older than 16 years.'
          },
          'illiteracy' : {
              'var'      : 'sin_estudios',
              'label_es' : 'Población sin estudios',
              'label_en' : 'Illiterate population',
              'meth_es'  : 'Porcentaje de residentes mayores de 16 años analfabetos o con estudios primarios no finalizados sobre total de residentes de 16 o más años.',
              'meth_en'  : 'Percentage of residents illiterate or with unfinished primary education over total residents aged 16 or over.'
          },
          'non_cualified' : {
              'var'      : 'no_cualificados',
              'label_es' : 'Trabajadores no cualificados',
              'label_en' : 'Unskilled workers',
              'meth_es'  : 'Porcentaje de ocupados mayores de 16 años que desempeñan ocupaciones de trabajadores no cualificados sobre total de población ocupada.',
              'meth_en'  : 'Percentage of unskilled workers over the total employed population aged 16 or over.',
          },
          'bad_housing' : {
              'var'      : 'vivienda_mal_estado',
              'label_es' : 'Edificios en mal estado',
              'label_en' : 'Building conditions',
              'meth_es'  : 'Porcentaje de edificios destinados a vivienda en situación de ruina y mal estado sobre el total de edificios destinados a vivienda.',
              'meth_en'  : 'Percentage of houses in buildings in bad conditions over the total of buildings destined for housing in the project area.',
          },
          'companies' : {
              'var'      : 'empresas100',
              'label_es' : 'Empresas',
              'label_en' : 'Enterprise density',
              'meth_es'  : 'Número de empresas por cien habitantes',
              'meth_en'  : 'Number of enterprises for 100 inhabitants.'
          },
          'economy_level' : {
              'var'      : 'inse',
              'label_es' : 'Nivel socioeconómico',
              'label_en' : 'Socio-economic level (INSE)',
              'meth_es'  : 'Nivel socioeconómico. El índice va desde niveles bajos (valores cercanos a 0) hasta niveles altos de composición socioeconómica (valores cercanos a 100). Es un valor aditivo basado en la población desempleada, la población analfabeta, los trabajadores no calificados y las viviendas en edificios en malas condiciones. Para más detalles, véase  Fernández et al., 2018 [https://doi.org/10.5944/empiria.39.2018.20877].',
              'meth_en'  : 'Socio-economic level. The index rank from low levels (values near to 0) to high levels of socioeconomic composition (values near to 100). It is an additive score based on unemployment population, illiterate population, unskilled workers, and houses in buildings in bad conditions. For more details see Fernández et al., 2018 [https://doi.org/10.5944/empiria.39.2018.20877].',
          },
          'total_cost' : {
              'var'      : 'coste_elegible_total',
              'label_es' : 'Coste elegible total',
              'label_en' : 'Total eligible cost',
          },
          'affected_people' : {
              'var'      : 'poblacion_afectada',
              'label_es' : 'Población afectada',
              'label_en' : 'Affected population',
          },
          'budget' : {
              'var'      : 'presupuesto_total',
              'label_es' : 'Presupuesto total',
              'label_en' : 'Budget',
              'meth_es'  : 'Coste total elegible programado del proyecto, compuesto por las aportaciones de fondos comunitarios (FEDER Y FSE) y las aportaciones de las instituciones municipales, autonómicas y/o estatales.',
              'meth_en'  : 'Budget as total eligible cost. This include EU Funds, as well as national, regional and local governments funds.',
          },
          'budget_territory' : {
              'var'      : 'porcentaje_presupuesto_territorio',
              'label_es' : 'Porcentaje de presupuesto territorio',
              'label_en' : 'Territory budget',
              'meth_es'  : 'Incluye las actuaciones adscritas a las áreas de <em>Mejora del medio ambiente urbano, Centros de formación y dotación de equipamientos sociales</em> en URBAN I  y las de <em>Utilización mixta y reurbanización de terrenos abandonados de modo compatible con el medio ambiente e Integración de transporte público y comunicaciones</em> en URBAN II.',
              'meth_en'  : 'It includes the actions assigned to the areas of <em>Improvement of the urban environment, Training centers and provision of social facilities</em> in URBAN I and those of <em>Mixed use and redevelopment of abandoned land in a manner compatible with the environment and Integration of public transport and communications</em> in URBAN II.',
          },
          'budget_economy' : {
              'var'      : 'porcentaje_presupuesto_economia',
              'label_es' : 'Porcentaje de presupuesto economía',
              'label_en' : 'Economy budget',
              'meth_es'  : 'Incluye las actuaciones adscritas a las áreas de <em>Desarrollo tejido económico</em> en URBAN I y a las de <em>Empresariado y pactos a favor del empleo</em> en URBAN II',
              'meth_en'  : 'It includes the actions assigned to the areas of <em>Desarrollo tejido económico</em> in URBAN I and those of <em>Entrepreneurship and pacts in favor of employment</em> in URBAN II',
          },
          'budget_social' : {
              'var'      : 'porcentaje_presupuesto_social',
              'label_es' : 'Porcentaje de presupuesto social',
              'label_en' : 'Social budget',
              'meth_es'  : 'Incluye las actuaciones adscritas a las áreas de <em>Programas sociales y Programas de Formación</em> en URBAN I y de <em>Integración de marginados y acceso a los servicios básicos</em> en URBAN II.',
              'meth_en'  : 'It includes the actions assigned to the areas of <em>Social Programs and Training Programs </ em> in URBAN I and <em>Integration of the marginalized and access to basic services</em> in URBAN II.',
          },
          'budget_sustainability' : {
              'var'      : 'porcentaje_presupuesto_sostenibilidad',
              'label_es' : 'Porcentaje de presupuesto de sostenibilidad',
              'label_en' : 'Sustainability budget',
              'meth_es'  : 'Incluye las actuaciones adscritas a las áreas de <em>Reducción y tratamiento de residuos, gestión eficiente y reducción de consumo</em> en URBAN II.',
              'meth_en'  : 'It includes the actions assigned to the areas of <em>Waste reduction and treatment, efficient management and consumption reduction</em> in URBAN II.',
          },
          'budget_management' : {
              'var'      : 'porcentaje_presupuesto_gestion',
              'label_es' : 'Porcentaje de presupuesto de gestión',
              'label_en' : 'Management budget',
              'meth_es'  : 'Incluye las actuaciones adscritas a las áreas de <em>Gestión, seguimiento, asistencia técnica y evaluación</em> en URBAN I y de <em>Evaluación, gestión y seguimiento Mejoras en el gobierno urbano</em> en URBAN II',
              'meth_en'  : 'It includes the actions assigned to the areas of <em>Management, monitoring, technical assistance and evaluation</em> in URBAN I and <em>Evaluation, management and monitoring Improvements in urban government </em> in URBAN II',
          },
          'investment' : {
              'var'      : 'esfuerzo',
              'label_es' : 'Esfuerzo económico',
              'label_en' : 'Effort index',
              'meth_es'  : 'Coste elegible total sobre población afectada por el proyecto según su documento de programación.',
              'meth_en'  : 'Total Budget on total resident population in the Project área.',
          },
          'diversity' : {
              'var'      : 'hhi_ma',
              'label_es' : 'Índice de diversidad',
              'label_en' : 'Diversity index',
              'meth_es'  : 'Considera la concentración o dispersión del gasto entre las áreas de actuación cada proyecto. El valor 0 significa que todo el presupuesto se concentra en un área y el valor 1 que el presupuesto se distribuye por igual en las cinco áreas de actuación.',
              'meth_en'  : 'Budget concentration according to policy areas. Values equal to 0 mean a high level of concentration in a policy area; values equal to 1 mean a homogeneous distribution across policy areas (i.e. more diversity).',
          },

          'catalogue_title' : {
            'label_es' : 'Catálogo de Proyectos URBAN IMPACTS',
            'label_en' : 'Project Catalogue. URBAN IMPACTS',
          },
          'catalogue_subtitle' : {
            'label_es' : 'Nota Metodológica',
            'label_en' : 'Methodological note: indexes definition.',
          },
          'catalogue_intro' : {
            'label_es' : 'A continuación se detalla la metodología para obtener las variables mostradas en el catálogo de proyectos.',
            'label_en' : 'The methodology to obtain the variables shown in the project catalog is detailed below.',
          },
          'urban_areas_section_title' : {
            'label_es' : 'Área urbana y composición socioeconómica',
            'label_en' : 'Urban area and socioeconomic composition',
          },
          'urban_areas_section_intro' : {
            'label_es' : 'Unidad territorial: área urbana cubierta por el proyecto de acuerdo con la información incluida en la documentación del proyecto recopilada por la Dirección General de Fondos Comunitarios-Ministerio de Hacienda (Gobierno de España). Fuente: Censos de Población y Vivienda. Instituto Nacional de Estadística (Gobierno de España). Años: URBAN I (1991), URBAN II (2001), URBANA (2001)',
            'label_en' : 'Territorial unit: urban area covered by the project according to the information included in project documentation gathered from Dirección General de Fondos Comunitarios-Ministerio de Hacienda (Government of Spain). Source: Censos de Población y Vivienda. Instituto Nacional de Estadística (Government of Spain). Years: URBAN I (1991), URBAN II (2001), URBANA (2001)',
          },
          'strategy_section_title' : {
            'label_es' : 'Estrategia del proyecto',
            'label_en' : 'Project policy strategy',
          },
          'strategy_section_intro' : {
            'label_es' : 'Unidad: proyectos. Fuente: análisis del contenido de la documentación del proyecto recopilada de la Dirección General de Fondos Comunitarios-Ministerio de Hacienda (Gobierno de España). Más información sobre políticas e índices en Navarro et al., 2019 [http://dx.doi.org/10.12795/anduli/FORTHCOMING]',
            'label_en' : 'Unit: projects. Source: content analysis of project documentation gathered from Dirección General de Fondos Comunitarios-Ministerio de Hacienda (Gobierno de España). More information about policy areas and indexes in Navarro, C.J.; Rodríguez-García, M.J. y Gómez, I. (2019): La agenda del desarrollo urbano integral en España (1994-2013): "efecto policy frame" y "efecto barrio" en las Iniciativas URBAN y URBANA, Anduli...',
          },
          'areas_section_title' : {
            'label_es' : 'Áreas de actuación',
            'label_en' : 'Policy areas',
          },
          'areas_section_intro' : {
            'label_es' : 'Porcentaje de presupuesto <strong>ejecutado</strong> agrupadas en cada una de las macro áreas de actuación definidas por el equipo de investigación a partir de las áreas oficiales de los proyectos. Estas macro-áreas son: territorio, desarrollo económico, bienestar, medio ambiente y gobernanza/gestión.',
            'label_en' : 'Weight of policy areas on total Budget. Policy areas has been delimitated in the framework of the URBAN IMPACTS Project. These are: territorial space, economic development, social welfare, environment, and governance/management. For more details about these policy areas and Project strategy see Navarro, Rodrígue-García and Gómez (2019).',
          },
          'quote' : {
            'label_es' : 'URBAN IMPACTS (CSO2015-70048-R; MINECO/FEDER), Catálogo de Proyectos. Centro de Sociología y Políticas Locales-Universidad Pablo de Olavide.',
            'label_en' : 'URBAN IMPACTS (CSO2015-70048-R; MINECO/FEDER), Project Catalogue. The Urban Governance Lab. Universidad Pablo de Olavide.',
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
        'diversity',
        'companies'
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
