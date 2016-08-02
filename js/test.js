angular.module('application')
.directive('test', function(dataSvc) {
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

            var margin = {top: 20, right: 80, bottom: 30, left: 50},
                width = svg_width - margin.left - margin.right,
                height = svg_height - margin.top - margin.bottom;

            var x0 = d3.scale.ordinal()
                .rangeRoundBands([0, width], .1, .2);

            var x1 = d3.scale.ordinal();

            var y = d3.scale.linear()
                .range([height, 0]);

            var y1 = d3.scale.linear()
                .domain([0, 4000])
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
                .ticks(5)

            var yAxis1 = d3.svg.axis()
                      .scale(y1)
                      .orient('right')
                      .tickValues([800, 1600, 2400, 3200]);

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
                .style('fill', '#262628');

            var data1 = dataSvc.getData();

            var countryNames = (countries).filter(function(item) {
                return item !== "date";
            });

            data1.forEach(function(d) {
                d.countries = countryNames.map(function(name) {
                    return {name: name, value: + d[name], color: data1.colors[name]}
                })
            })

            data1.columns = []
            data1.columns.push('date');
            data1.columns = data1.columns.concat(countries);

            var cities = data1.columns.slice(1).map(function(id) {
                if (countries.indexOf(id)  > -1) {
                    return {
                      id: id,
                      color: data1.colors[id],
                      values: data1.map(function(d) {
                        return {date: d.date, value: d[id] * 100 / 2.3};
                      })
                    };
                }
            });


            x0.domain(data1.map(function(d) {
                return d.date;
            }));

            x1.domain(countryNames).rangeRoundBands([0, x0.rangeBand()]);
            var maxValue = 100;

            y.domain([0, maxValue]);

            var line = d3.svg.line()
                .interpolate('linear')
                .x(function(d) {
                    return x0(d.date);
                     })
                .y(function(d) {
                    return y1(d.value);
                     });


            new_svg.append("g")
                .attr("class", "x axis")
                .attr("transform", "translate(0," + height + ")")
                .attr('fill', '#656566')
                .call(xAxis);

            var yTicks  = new_svg.append("g")
              .attr("class", "y axis")
              .attr('fill', '#656566')
              .call(yAxis);

            var yTicks1 = new_svg.append('g')
                .attr('class', 'y axis1')
                .attr('fill', '#656566')
                .attr("transform", "translate(" + [width, 0] + ")")
                .call(yAxis1);

            yTicks.selectAll('line')
            .attr('stroke', '#656566')
                .attr('x2', width)

            var state = new_svg.selectAll(".state")
                .data(data1)
                .enter().append("g")
                .attr("class", "state")
                .attr("transform", function(d) {
                    return "translate(" + x0(d.date)  +",0)";
                });

            state.selectAll("rect")
                .data(function(d) {
                    return d.countries;
                    })
                .enter().append("rect")
                .attr("width", x1.rangeBand() / 1.5)
                .attr("x", function(d) {
                    return x1(d.name);
                     })
                .attr("y", function(d) {
                    return y(d.value);
                     })
                .attr("height", function(d) { return height - y(d.value); })
                .style("fill", function(d) {
                    return d.color;
                });

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
        }
    }
});