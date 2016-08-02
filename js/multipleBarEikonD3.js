angular.module('application')
.directive('multipleBarEikonD3', function(dataSvc) {
    return {
        scope: {
            model: '<'
        },
        template: '<div class="d3-line-bar"></div>',
        link: function(scope, element) {
            var $bar = element.find('.d3-line-bar');
            var bar = d3.select($bar[0]);
            var svg = bar.append('svg');

            var svg_height = svg.node().getBoundingClientRect().height;
            var svg_width = svg.node().getBoundingClientRect().width;

            scope.$watch('model', function(oldVal, newVal) {
                countries = scope.model.filter(function(item) {
                    return item.selected;
                }).map(function(item) {
                    return item.country
                });

                // Clear the svg canvas, before re-render new data
                svg.selectAll('*').remove();
                updateRender();
            }, true);

            var margin = {top: 20, right: 20, bottom: 30, left: 50},
                width = svg_width - margin.left - margin.right,
                height = svg_height - margin.top - margin.bottom;

            var x0 = d3.scale.ordinal()
                .rangeRoundBands([0, width], .1, .2);

            var x1 = d3.scale.ordinal();

            var y = d3.scale.linear()
                .range([height, 0]);

            var parseTime = d3.time.format("%Y-%m-%d").parse;
            formatDate = d3.time.format("%Y")

            var xAxis = d3.svg.axis()
                .scale(x0)
                .orient("bottom")
                .tickFormat(formatDate);
                // .tickFormat(d3.time.format("%a %d"));

            var yAxis = d3.svg.axis()
                .scale(y)
                .orient("left")
                .tickFormat(d3.format(".2s"))
                .ticks(7)

            function updateRender() {

            var new_svg  = svg
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

            // d3.csv("data.csv", function(error, data) {
            var data1 = dataSvc.getData();

              // var ageNames = d3.keys(data[0]).filter(function(key) { return key !== "State"; });

            var countryNames = (countries).filter(function(item) {
                return item !== "date";
            });

              // data.forEach(function(d) {
              //   d.ages = ageNames.map(function(name) {
              //       return {name: name, value: +d[name]}; });
              // });

            data1.forEach(function(d) {
                d.countries = countryNames.map(function(name) {
                    return {name: name, value: + d[name], color: data1.colors[name]}
                })
            })

              // x0.domain(data.map(function(d) { return d.State; }));
              // x1.domain(ageNames).rangeRoundBands([0, x0.rangeBand()]);
              // y.domain([0, d3.max(data, function(d) {
              //   return d3.max(d.ages, function(d) {
              //       return d.value;
              //   });
              // })]);
              //
              x0.domain(data1.map(function(d) {
                return d.date;
              }));

              x1.domain(countryNames).rangeRoundBands([0, x0.rangeBand()]);
              var maxValue = 100;

              y.domain([0, maxValue]);

              // y.domain([0, d3.max(data1, function(d) {
              //   return d3.max(d.countries, function(d) {
              //       return d.value;
              //   });
              // })]);

                  new_svg.append("g")
                  .attr("class", "x axis")
                  .attr("transform", "translate(0," + height + ")")
                  .attr('fill', '#656566')
                  .call(xAxis);

                var yTicks  = new_svg.append("g")
                  .attr("class", "y axis")
                  .attr('fill', '#656566')
                  .call(yAxis);

                yTicks.selectAll('line')
                .attr('stroke', '#656566')
                    .attr('x2', width)


                // Draw "population" text with rotate transform
                // .append("text")
                //   .attr("transform", "rotate(-90)")
                //   .attr("y", 6)
                //   .attr("dy", ".71em")
                //   .style("text-anchor", "end")
                //   .text("Population");

              var state = new_svg.selectAll(".state")
                  .data(data1)
                .enter().append("g")
                  .attr("class", "state")
                  .attr("transform", function(d) {
                    return "translate(" + x0(d.date)  +",0)";
                     });

              state.selectAll("rect")
                  .data(function(d) { return d.countries; })
                .enter().append("rect")
                  .attr("width", x1.rangeBand() / 1.5)
                  .attr("x", function(d) { return x1(d.name); })
                  .attr("y", function(d) { return y(d.value); })
                  .attr("height", function(d) { return height - y(d.value); })
                  .style("fill", function(d) {
                        return d.color;
                  });

              // var legend = svg.selectAll(".legend")
              //     .data(ageNames.slice().reverse())
              //   .enter().append("g")
              //     .attr("class", "legend")
              //     .attr("transform", function(d, i) { return "translate(0," + i * 20 + ")"; });

              // legend.append("rect")
              //     .attr("x", width - 18)
              //     .attr("width", 18)
              //     .attr("height", 18)
              //     .style("fill", color);

              // legend.append("text")
              //     .attr("x", width - 24)
              //     .attr("y", 9)
              //     .attr("dy", ".35em")
              //     .style("text-anchor", "end")
              //     .text(function(d) { return d; });
            // });

            }
        }
    }
});