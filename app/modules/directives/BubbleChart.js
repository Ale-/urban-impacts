angular.module('urban_impacts.bubblechart_directive', [])

/**
 *   Directive to render a map
 *
 */
.directive("bubbleChart", function(DataService, IndicatorsService){

    return {
        restrict : 'EAC',
        scope    : {
          width  : '=',
          height : '=',
          top    : '=',
          bottom : '=',
          left   : '=',
          right  : '=',
          data   : '=',
          max    : '=',
          unit   : '@',
          title  : '@',
          help   : '@',
        },

        link     : function (scope, element, attrs)
        {
            // set up initial svg object with the Dimensions
            // passed in the directive parameters
            var _this_ = element[0];
            w = scope.width - scope.left - scope.right,
            h = scope.height - scope.top - scope.bottom;
            var svg   = d3.select(_this_).append("svg").attr("width", scope.width).attr("height", scope.height);
            // Set up root svg group
            var g     = svg.append("g").attr("transform", "translate(" + scope.left + "," + scope.top + ")");

            var s = d3.scaleLinear().rangeRound([0, 360]);
            var y = d3.scaleBand().rangeRound([0, h]);

            y.domain(scope.data.map(function(d) { return d.k; })).paddingInner(.5);
            s.domain([0, d3.max(scope.data, function(d) { return d.v; })]);

            var r = function(v){
                var sup = s(v);
                return Math.sqrt( sup / Math.PI );
            }
            var div = d3.select(_this_).append("div").attr("class", "tooltip");

            g.selectAll(".bubble").data(scope.data).enter()
                .append("circle")
                .attr("class", "bubble")
                .attr("cx", w/2 - 10)
                .attr("cy", function(d) { return y(d.k) + r(d.v)/2; })
                .attr("r", function(d) { return r(d.v); })
                .attr("fill", "#063461" )
                .on("mouseover", function(d) {
                    if(scope.unit != 'M. €')
                        var n = d3.format(".2f")(d.v);
                    else
                        var n = d3.format(".2f")(d.v/1e6);
                    div.html(n + " " + scope.unit).transition().duration(200).style("opacity", .9);
                })
                .on("mouseout", function(d) {
                    div.transition().duration(500).style("opacity", 0);
                });
                var title = d3.select(_this_).append("abbr")
                    .attr("class", "bar-chart__title")
                    .attr("title", scope.help)
                    .text(scope.title);
        }
    };
});
