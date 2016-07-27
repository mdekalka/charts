angular.module('application')
.directive('barVertEikonD3', function() {
    return {
        scope: {
            model: '<'
        },
        template: '<div class="d3-line-bar line-bar"></div>',
        link: function(scope, element, attr) {
            var $bar = element.find('.d3-line-bar');
            var bar = d3.select($bar[0]);
            var svg = bar.append('svg');

            var svg_height = svg.node().getBoundingClientRect().height;
            var svg_width = Math.round(svg.node().getBoundingClientRect().width);

            var data;

            scope.$watch('model', function(oldVal, newVal) {
                data = scope.model.filter(function(value) {
                    return value.selected;
                });
                svg.selectAll('*').remove();
                updateRender();
            }, true);

            var maxValue = 1000000;

            var margin = {top: 20, right: 20, bottom: 30, left: 50},
            width = svg_width - margin.left - margin.right,
            height = svg_height - margin.top - margin.bottom;

            var x = d3.scale.ordinal()
                .rangeRoundBands([0, width], .8);

            var y = d3.scale.linear()
                .range([height, 0]);

            var xAxis = d3.svg.axis()
                .scale(x)
                .orient("bottom");

            var yAxis = d3.svg.axis()
                .scale(y)
                .orient("left")
                .tickFormat(d3.format(".2s"))
                .ticks(5)

                function updateRender() {
                    var new_svg = svg
                        .style('background-color', '#1F1F21')
                        .append("g")
                        .attr("transform", "translate(" + margin.left + "," + margin.top + ")")
                        .attr('width', width)
                        .attr('height', height)

                    var tip = d3.tip()
                      .attr('class', 'line-bar-tip')
                      .offset([-10, 0])
                      .html(function(data) {
                            return "<span>Sales:</span> <span>" + data.sales + "</span>";
                      });

                    new_svg.call(tip);

                    new_svg
                        .append('rect')
                        .attr('class', 'chart-rect')
                        .attr('width', width)
                        .attr('height', height)
                        .style('fill', '#262628')

                    x.domain(data.map(function(d) { return d.country; }));
                    y.domain([0, maxValue]);

                    new_svg.append("g")
                      .attr("class", "x axis")
                      .attr("transform", "translate(0," + height + ")")
                      .attr('fill', '#656566')
                      .call(xAxis);


                    var ticks = new_svg.append("g")
                      .attr("class", "y axis")
                      .attr('fill', '#656566')
                      .call(yAxis)
                    // Draw text label
                    // .append("text")
                    //   .attr("transform", "rotate(-90)")
                    //   .attr("y", 6)
                    //   .attr("dy", ".71em")
                    //   .style("text-anchor", "end")
                    //   .text("Sales");

                    ticks.selectAll('line')
                        .attr('x2', width)
                    // Draw bars
                    new_svg.selectAll(".bar")
                        .data(data)
                        .enter().append("rect")
                        .attr("class", "bar")
                        .attr("x", function(d) {
                            return x(d.country);
                        })
                        .attr("width", x.rangeBand())
                        .attr("y", function(d) {
                            return y(d.sales);
                        })
                        .attr("height", function(d) {
                            return height - y(d.sales);
                        })
                        .attr('fill', function(data) {
                            return data.color;
                        })
                        .on('mouseover', tip.show)
                        .on('mouseout', tip.hide);
                        }
        }
    }
});


