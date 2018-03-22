angular.module('urban_impacts.barchart_directive', [])

/**
 *   Directive to render a map
 *
 */
.directive("barChart", function(DataService){

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
          unit   : '@',
          title  : '@',
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

            var x = d3.scaleBand().rangeRound([0, w]).padding(0.3);
            var y = d3.scaleLinear().rangeRound([h, 0]);
            var c = d3.scaleOrdinal(['#c83741', '#eda16a', '#6c283d', '#72a68e']);

            x.domain(scope.data.map(function(d) { return d.k; }));
            y.domain([0, d3.max(scope.data, function(d) { return d.v; })]);

            var div = d3.select(_this_).append("div").attr("class", "tooltip");

            g.selectAll(".bar").data(scope.data).enter()
                .append("rect")
                .attr("class", "bar")
                .attr("x", function(d) { return x(d.k); })
                .attr("y", function(d) { return y(d.v); })
                .attr("width", x.bandwidth())
                .attr("height", function(d) { return h - y(d.v); })
                .attr("fill", function(d) { return c(d.k); })
                .on("mouseover", function(d) {
                    div.html(d.v + " " + scope.unit).transition().duration(200).style("opacity", .9);
                })
                .on("mouseout", function(d) {
                    div.transition().duration(500).style("opacity", 0);
                });
                var title = d3.select(_this_).append("p")
                    .attr("class", "bar-chart__title")
                    .text( scope.title );
        }
    };
});
