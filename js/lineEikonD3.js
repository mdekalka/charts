angular.module('application')
.directive('lineEikonD3', function(dataSvc) {
    return {
        scope: {
            model: '<'
        },
        template: '<div class="d3-line-bar line-bar"></div></div>',
        link: function(scope, element) {
            var parseTime = d3.time.format("%Y-%m-%d").parse;

            var data = dataSvc.getData();

            var $bar = element.find('.d3-line-bar');
            var bar = d3.select($bar[0]);
            var svg = bar.append('svg');
            var countries;

            var svg_height = svg.node().getBoundingClientRect().height;
            var svg_width = Math.round(svg.node().getBoundingClientRect().width);

            scope.$watch('model', function(oldVal, newVal) {
                countries = scope.model.filter(function(item) {
                    return item.selected;
                }).map(function(item) {
                    return item.country
                });

                svg.selectAll('*').remove();
                updateRender();
            }, true);

            var margin = {top: 20, right: 20, bottom: 30, left: 50},
                width = svg_width - margin.left - margin.right,
                height = svg_height - margin.top - margin.bottom;


            function updateRender() {
            var new_svg = svg
                    .style('background-color', '#1F1F21')
                    .append("g")
                    .attr("transform", "translate(" + margin.left + "," + margin.top + ")")
                    .attr('width', width)
                    .attr('height', height)

                new_svg
                    .append('rect')
                    .attr('class', 'chart-rect')
                    .attr('width', width)
                    .attr('height', height)
                    .style('fill', '#262628')

            var x = d3.time.scale().range([0, width]),
                y = d3.scale.linear().range([height, 0])

            var line = d3.svg.line()
                .interpolate('linear')
                .x(function(d) {
                    return x(d.date);
                     })
                .y(function(d) {
                    return y(d.temperature);
                     });


            data.columns = []
            data.columns.push('date');
            data.columns = data.columns.concat(countries);

            var cities = data.columns.slice(1).map(function(id) {
                if (countries.indexOf(id)  > -1) {
                    return {
                      id: id,
                      color: data.colors[id],
                      values: data.map(function(d) {
                        return {date: d.date, temperature: d[id]};
                      })
                    };
                }
            });

            x.domain(d3.extent(data, function(d) {
                return d.date;
            }));

              var minValue = 0;
              var maxValue = 100;
              y.domain([
                // d3.min(cities, function(c) { return d3.min(c.values, function(d) { return d.temperature; }); }),
                // d3.max(cities, function(c) { return d3.max(c.values, function(d) { return d.temperature; }); })
                minValue, maxValue
              ]);

            var xTicks = new_svg.append("g")
                  .attr("class", "axis axis--x")
                  .attr("transform", "translate(0," + height + ")")
                  .attr('fill', '#656566')
                  .call(d3.svg.axis()
                    .scale(x)
                    .orient("bottom"))

            var yTicks = new_svg.append("g")
              .attr("class", "axis axis--y")
              .attr('fill', '#656566')
               .call(d3.svg.axis()
                .scale(y)
                .orient("left").ticks(5))

            yTicks.selectAll('line')
                .attr('x2', width)

            xTicks.selectAll('line')
                .attr('y2', -height)


                // .append("text")
                //   .attr("transform", "rotate(-90)")
                //   .attr("y", 6)
                //   .attr("dy", "0.71em")
                //   .attr("fill", "#000")
                //   .text("Temperature, ºF")

              var city = new_svg.selectAll(".city")
                .data(cities)
                .enter().append("g")
                  .attr("class", "city");

            // Draw lines
            city.append("path")
                  .attr("class", "line")
                  .attr("d", function(d) {
                    return line(d.values);
                     })
                  .style("stroke", function(d) {
                    return d.color
                     });

          }

              // city.append("text")
              //     .datum(function(d) { return {id: d.id, value: d.values[d.values.length - 1]}; })
              //     .attr("transform", function(d) { return "translate(" + x(d.value.date) + "," + y(d.value.temperature) + ")"; })
              //     .attr("x", 3)
              //     .attr("dy", "0.35em")
              //     .style("font", "10px sans-serif")
              //     .text(function(d) { return d.id; });

            // function type(d, _, columns) {
            //   d.date = parseTime(d.date);
            //   for (var i = 1, n = columns.length, c; i < n; ++i) d[c = columns[i]] = +d[c];
            //   return d;
            // }

        }
    }
});

