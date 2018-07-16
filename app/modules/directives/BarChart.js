angular.module('urban_impacts.barchart_directive', [])

/**
 *   Directive to render a map
 *
 */
.directive("barChart", function(DataService, IndicatorsService){

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

            var x = d3.scaleBand().rangeRound([0, w]).padding(0.3);
            var y = d3.scaleLinear().rangeRound([h, 0]);
            var c = d3.scaleOrdinal(['#c83741', '#eda16a', '#6c283d', '#72a68e']);

            x.domain(scope.data.map(function(d) { return d.k; }));

            // If unit is not percentage upper limit of domain is the max value
            // else is 100% -> to avoid perception distortions

            if(scope.unit){
                if(scope.max)
                    y.domain([0, scope.max]);
                else if(scope.unit != '%')
                    y.domain([0, d3.max(scope.data, function(d) { console.log(d); return d.v; })]);
                else
                    y.domain([0, 100]);
            } else {
                y.domain([0,1]);
            }
            var div = d3.select(_this_).append("div").attr("class", "tooltip");

            g.append("g")
                .attr("class", "axis axis--y")
                .call(
                    d3.axisLeft(y).
                    ticks(5).
                    tickSize(1)
                );

            g.selectAll(".bar").data(scope.data).enter()
                .append("rect")
                .attr("class", "bar")
                .attr("x", function(d) { return x(d.k); })
                .attr("y", function(d) { return y(d.v); })
                .attr("width", x.bandwidth())
                .attr("height", function(d) { return h - y(d.v); })
                .attr("fill", function(d) { return c(d.k); })
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
