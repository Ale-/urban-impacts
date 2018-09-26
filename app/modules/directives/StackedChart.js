angular.module('urban_impacts.stackedchart_directive', [])

/**
 *   Directive to render a stacked chart
 *   @see https://bl.ocks.org/mbostock/3886208
 */
.directive("stackedChart", function(){

    return {
        restrict : 'AEC',
        scope    : {
            // Dimensions of the chart
            // width, height and margins
            width  : '=',
            height : '=',
            top    : '=',
            bottom : '=',
            left   : '=',
            right  : '=',
            // An array of data composed of objects
            // with pairs key/value
            data   : '=',
            // An array with the keys of the chart
            keys   : '=',
            // An array with the keys of the chart
            indexes : '=',
            // Palette
            palette : '=',
            // title
            title : '@',
            //
            unit : '@'
        },
        link     : function (scope, element, attrs)
        {
            // Prepare data
            // set up initial svg object with the Dimensions
            // passed in the directive parameters
            var _this_ = element[0];
            var mobile = d3.select('body').node().getBoundingClientRect().width < '720';
            if(mobile)
                var max_width = d3.select('.project-stats-block').node().getBoundingClientRect().width - 24;
            else
                var max_width = d3.select('.project-stats-block').node().getBoundingClientRect().width * .75;
            w = (scope.width ? scope.width : max_width) - scope.left - scope.right;
            h = scope.height - scope.top - scope.bottom;
            var svg   = d3.select(_this_).append("svg")
                        .attr("width", (scope.width ? scope.width : max_width)).attr("height", scope.height);
            // Set up root svg group
            var g     = svg.append("g").attr("transform", "translate(" + scope.left + "," + scope.top + ")");

            // Set up scales of data
            var x     = mobile ? d3.scaleLinear().rangeRound([0, w]) : d3.scaleLinear().rangeRound([0, w-250]);
            var y     = d3.scaleBand().rangeRound([0, h]).paddingInner(.5);
            var z     = d3.scaleOrdinal(scope.palette ? scope.palette : d3.schemeCategory10);

            x.domain([0, 100]);
            y.domain(scope.data.map(function(d) { return d.key; }));
            z.domain(scope.keys);
            var div = d3.select(_this_).append("div").attr("class", "tooltip");

            // Set layout
            var stacked_layout = d3.stack().keys(scope.keys);
            g.append("g")
              .selectAll("g")
              .data( stacked_layout(scope.data) )
              .enter().append("g")
              .attr("fill", function(d) { return z(d.key); })
              .selectAll("rect")
              .data( function(d){ return d })
              .enter().append("rect")
              .attr("x", function(d) { return mobile ? 20 + x(d[0]) : 226 + x(d[0]); })
              .attr("y", function(d) { return y(d.data.key); })
              .attr("height", y.bandwidth())
              .attr("width", function(d) { return x(d[1]) - x(d[0]); })
              .on("mouseover", function(d) {
                  var text = "";
                  for(var i in scope.keys){
                      var key = scope.keys[i];
                      text += "<i class='" + ['a','b','c','d','e'][i] + "'></i>" + (d.data[key]).toFixed(2) + scope.unit + " ";
                  }
                  div.html(text).transition().duration(200).style("opacity", .9);
              })
              .on("mouseout", function(d) {
                  div.transition().duration(500).style("opacity", 0);
              });

            var r = d3.scaleLinear().rangeRound([0, 20]);
            r.domain([0, 1]);

            // Category names texts
            g.append("g")
              .selectAll("text")
              .data( scope.data )
              .enter().append("text")
              .text(function(d, i){
                  var text = mobile ? i+1 : d.key;
                  return text;
              })
              .attr("class", "category")
              .attr("font-size", "12")
              .attr("fill", "#063461")
              .attr("y", function(d){
                  return y(d.key) + (y.bandwidth()*.75);
              })
              .attr("x", 0)

            // Title
            var title = d3.select(_this_).append("p")
                .attr("class", "chart__title")
                .text( scope.title );

        },
    };
});
