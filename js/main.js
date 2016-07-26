;(function() {
    'use strict';

    angular.module('application', [])
        .controller('MyController', function($scope) {
            $scope.lineBarScale = [{
                                  x: 1,
                                  y: 5
                                }, {
                                  x: 20,
                                  y: 20
                                }, {
                                  x: 40,
                                  y: 10
                                }, {
                                  x: 60,
                                  y: 40
                                }, {
                                  x: 80,
                                  y: 5
                                }, {
                                  x: 100,
                                  y: 60
                                }];


            $scope.data = [
         {"State":"AL","Under 5 Years":"310504","5 to 13 Years":"552339","14 to 17 Years":"259034","18 to 24 Years":"450818","25 to 44 Years":"1215966","45 to 64 Years":"641667"},
         {"State":"AK","Under 5 Years":"52083","5 to 13 Years":"85640","14 to 17 Years":"42153","18 to 24 Years":"74257","25 to 44 Years":"183159","45 to 64 Years":"50277"},
         {"State":"AZ","Under 5 Years":"515910","5 to 13 Years":"828669","14 to 17 Years":"362642","18 to 24 Years":"601943","25 to 44 Years":"1804762","45 to 64 Years":"1523681"},
         {"State":"AR","Under 5 Years":"202070","5 to 13 Years":"343207","14 to 17 Years":"157204","18 to 24 Years":"264160","25 to 44 Years":"754420","45 to 64 Years":"727124"},
         {"State":"CA","Under 5 Years":"2704659","5 to 13 Years":"4499890","14 to 17 Years":"2159981","18 to 24 Years":"3853788","25 to 44 Years":"10604510","45 to 64 Years":"8819342"},
         {"State":"CO","Under 5 Years":"358280","5 to 13 Years":"587154","14 to 17 Years":"261701","18 to 24 Years":"466194","25 to 44 Years":"1464939","45 to 64 Years":"1290094"},
         {"State":"CT","Under 5 Years":"211637","5 to 13 Years":"403658","14 to 17 Years":"196918","18 to 24 Years":"325110","25 to 44 Years":"916955","45 to 64 Years":"968967"},
         {"State":"DE","Under 5 Years":"59319","5 to 13 Years":"99496","14 to 17 Years":"47414","18 to 24 Years":"84464","25 to 44 Years":"230183","45 to 64 Years":"230528"}
        ]

        })
        .directive('lineBarDiv', function() {
            return {
                scope: {
                    scale: '='
                },
                template: '<div class="d3-line-bar">' +
                            '<div class="bar">' +
                            '</div>' +
                          '</div>',
                link: function(scope, element, attrs) {
                    var data = [
                        {number: 4, color: '#2ecc71'},
                        {number: 8, color: '#3498db'},
                        {number: 12, color: '#9b59b6'},
                        {number: 24, color: '#34495e'},
                        {number: 48, color: '#f1c40f'},
                        {number: 96, color: '#e74c3c'}
                    ];
                    var bar = d3.select('.bar');

                    var BAR_WIDTH = bar.node().getBoundingClientRect().width;
                    var BAR_HEIGHT = bar.node().getBoundingClientRect().height;

                    var x = d3.scaleLinear()
                        .domain([0, d3.max(data, function(number) {
                            return number.number;
                        })])
                        .range([0, BAR_WIDTH]);

                    var y = d3.scaleLinear()
                        .domain([0, d3.max(data, function(number) {
                            return number.number;
                        })])
                        .range([0, BAR_HEIGHT]);

                    bar.selectAll('.line')
                        .data(data)
                    .enter().append('div')
                        .attr('class', 'line')
                        .style('height', function(data) {
                            return Math.round(y(data.number)) + 'px';
                        })
                        .style('background-color', function(data) {
                            return data.color;
                        })
                        .text(function(data) {
                            return data.number;
                        });
                }
            }
        })

.directive('chartSvg', function() {
    return {
        scope: {

        },
        template: '<div class="d3-line-bar"></div>',
        link: function(scope, element) {
            var $bar = element.find('.d3-line-bar');
            var bar = d3.select($bar[0]);
            var svg = bar.append('svg');

            var svg_height = svg.node().getBoundingClientRect().height;
            var svg_width = svg.node().getBoundingClientRect().width;

            var new_data = [
                {name: 'Jordan', color: 'red', 2005: 400000, 2006: 500000, 2007: 800000, 2008: 250000, 2009: 120000},
                {name: 'Lebanon', color: 'yellow', 2005: 234000, 2006: 134000, 2007: 564000, 2008: 250000, 2009: 54000},
                {name: 'Iran', color: 'green', 2005: 435000, 2006: 123000, 2007: 543000, 2008: 123000, 2009: 120000},
                {name: 'Oman', color: 'purple', 2005: 543000, 2006: 654000, 2007: 845000, 2008: 143000, 2009: 435000},
                {name: 'UAE', color: 'brown', 2005: 182000, 2006: 872000, 2007: 546000, 2008: 346000, 2009: 123000},
                {name: 'Tunisia', color: 'gray', 2005: 431000, 2006: 546000, 2007: 641000, 2008: 562000, 2009: 583000},
            ]

            var margin = {top: 20, right: 0, bottom: 30, left: 50},
                width = svg_width - margin.left - margin.right,
                height = svg_height - margin.top - margin.bottom;

            var x0 = d3.scale.ordinal()
                .rangeRoundBands([0, width], .1);

            var x1 = d3.scale.ordinal();

            var y = d3.scale.linear()
                .range([height, 0]);

            var color = d3.scale.ordinal()
                .range(["#98abc5", "#8a89a6", "#7b6888", "#6b486b", "#a05d56", "#d0743c", "#ff8c00"]);

            var xAxis = d3.svg.axis()
                .scale(x0)
                .orient("bottom");

            var yAxis = d3.svg.axis()
                .scale(y)
                .orient("left")
                .tickFormat(d3.format(".2s"));

            var new_svg  = svg
              .append("g")
                .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

            d3.csv("js/client/data.csv", function(error, data) {
              if (error) throw error;

              var ageNames = d3.keys(data[0]).filter(function(key) { return key !== "State"; });

              data.forEach(function(d) {
                d.ages = ageNames.map(function(name) { return {name: name, value: +d[name]}; });
              });

              x0.domain(data.map(function(d) { return d.State; }));
              x1.domain(ageNames).rangeRoundBands([0, x0.rangeBand()]);
              y.domain([0, d3.max(data, function(d) { return d3.max(d.ages, function(d) { return d.value; }); })]);

              new_svg.append("g")
                  .attr("class", "x axis")
                  .attr("transform", "translate(0," + height + ")")
                  .call(xAxis);

              new_svg.append("g")
                  .attr("class", "y axis")
                  .call(yAxis)
                .append("text")
                  .attr("transform", "rotate(-90)")
                  .attr("y", 6)
                  .attr("dy", ".71em")
                  .style("text-anchor", "end")
                  .text("Population");

              var state = new_svg.selectAll(".state")
                  .data(data)
                .enter().append("g")
                  .attr("class", "state")
                  .attr("transform", function(d) { return "translate(" + x0(d.State) + ",0)"; });

              state.selectAll("rect")
                  .data(function(d) { return d.ages; })
                .enter().append("rect")
                  .attr("width", x1.rangeBand())
                  .attr("x", function(d) { return x1(d.name); })
                  .attr("y", function(d) { return y(d.value); })
                  .attr("height", function(d) { return height - y(d.value); })
                  .style("fill", function(d) { return color(d.name); });

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

            });

        }
    }
})

.directive('chartTest', function() {
    return {
        scope: {

        },
        template: '<div class="d3-line-bar"></div>',
        link: function(scope, element) {
            var $bar = element.find('.d3-line-bar');
            var bar = d3.select($bar[0]);
            var svg = bar.append('svg');

            var svg_height = svg.node().getBoundingClientRect().height;
            var svg_width = svg.node().getBoundingClientRect().width;

            var new_data = [
                {name: 'Jordan', color: 'red', 2005: 400000, 2006: 500000, 2007: 800000, 2008: 250000, 2009: 120000},
                {name: 'Lebanon', color: 'yellow', 2005: 234000, 2006: 134000, 2007: 564000, 2008: 250000, 2009: 54000},
                {name: 'Iran', color: 'green', 2005: 435000, 2006: 123000, 2007: 543000, 2008: 123000, 2009: 120000},
                {name: 'Oman', color: 'purple', 2005: 543000, 2006: 654000, 2007: 845000, 2008: 143000, 2009: 435000},
                {name: 'UAE', color: 'brown', 2005: 182000, 2006: 872000, 2007: 546000, 2008: 346000, 2009: 123000},
                {name: 'Tunisia', color: 'gray', 2005: 431000, 2006: 546000, 2007: 641000, 2008: 562000, 2009: 583000},
            ]

            var margin = {top: 20, right: 0, bottom: 30, left: 50},
                width = svg_width - margin.left - margin.right,
                height = svg_height - margin.top - margin.bottom;

            var x0 = d3.scale.ordinal()
                .rangeRoundBands([0, width], .1);

            var x1 = d3.scale.ordinal();

            var y = d3.scale.linear()
                .range([height, 0]);

            var color = d3.scale.ordinal()
                .range(["#98abc5", "#8a89a6", "#7b6888", "#6b486b", "#a05d56", "#d0743c", "#ff8c00"]);

            var xAxis = d3.svg.axis()
                .scale(x0)
                .orient("bottom");

            var yAxis = d3.svg.axis()
                .scale(y)
                .orient("left")
                .tickFormat(d3.format(".2s"));

            var new_svg  = svg
              .append("g")
                .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

            d3.csv("data.csv", function(error, data) {
              if (error) throw error;

              var ageNames = d3.keys(data[0]).filter(function(key) { return key !== "State"; });

              data.forEach(function(d) {
                d.ages = ageNames.map(function(name) { return {name: name, value: +d[name]}; });
              });

              x0.domain(data.map(function(d) { return d.State; }));
              x1.domain(ageNames).rangeRoundBands([0, x0.rangeBand()]);
              y.domain([0, d3.max(data, function(d) { return d3.max(d.ages, function(d) { return d.value; }); })]);

              new_svg.append("g")
                  .attr("class", "x axis")
                  .attr("transform", "translate(0," + height + ")")
                  .call(xAxis);

              new_svg.append("g")
                  .attr("class", "y axis")
                  .call(yAxis)
                .append("text")
                  .attr("transform", "rotate(-90)")
                  .attr("y", 6)
                  .attr("dy", ".71em")
                  .style("text-anchor", "end")
                  .text("Population");

              var state = new_svg.selectAll(".state")
                  .data(data)
                .enter().append("g")
                  .attr("class", "state")
                  .attr("transform", function(d) { return "translate(" + x0(d.State) + ",0)"; });

              state.selectAll("rect")
                  .data(function(d) { return d.ages; })
                .enter().append("rect")
                  .attr("width", x1.rangeBand())
                  .attr("x", function(d) {
                    return x1(d.name);
                     })
                  .attr("y", function(d) {
                    return y(d.value);
                     })
                  .attr("height", function(d) {
                    return height - y(d.value);
                     })
                  .style("fill", function(d) {
                    return color(d.name);
                     });

              var legend = svg.selectAll(".legend")
                  .data(ageNames.slice().reverse())
                .enter().append("g")
                  .attr("class", "legend")
                  .attr("transform", function(d, i) { return "translate(0," + i * 20 + ")"; });

              legend.append("rect")
                  .attr("x", width - 18)
                  .attr("width", 18)
                  .attr("height", 18)
                  .style("fill", color);

              legend.append("text")
                  .attr("x", width - 24)
                  .attr("y", 9)
                  .attr("dy", ".35em")
                  .style("text-anchor", "end")
                  .text(function(d) { return d; });

            });

        }
    }
})

        .directive('chartSvg2', function() {
            return {
                scope: {

                },
                template: '<div class="d3-line-bar"></div>',
                link: function(scope, element, attrs) {
                    var data = [{"label":"1990", "value":16},
                            {"label":"1991", "value":56},
                            {"label":"1992", "value":7},
                            {"label":"1993", "value":77},
                            {"label":"1994", "value":22},
                            {"label":"1995", "value":16},
                            ];
                    //maximum of data you want to use
                    var data_max = 80,
                    //number of tickmarks to use
                    num_ticks = 5,
                    //margins
                    left_margin = 60,
                    right_margin = 60,
                    top_margin = 30,
                    bottom_margin = 0;
                    var w = 500,                        //width
                        h = 500,                        //height
                        color = function(id) { return '#00b3dc' };
                    var x = d3.scale.linear()
                        .domain([0, data_max])
                        .range([0, w - ( left_margin + right_margin ) ]),
                        y = d3.scale.ordinal()
                        .domain(d3.range(data.length))
                        .rangeBands([bottom_margin, h - top_margin], .5);
                    var chart_top = h - y.rangeBand()/2 - top_margin;
                    var chart_bottom = bottom_margin + y.rangeBand()/2;
                    var chart_left = left_margin;
                    var chart_right = w - right_margin;
                    /*
                     *  Setup the SVG element and position it
                     */
                    var vis = d3.select("body")
                        .append("svg:svg")
                            .attr("width", w)
                            .attr("height", h)
                        .append("svg:g")
                            .attr("id", "barchart")
                            .attr("class", "barchart")
                    //Ticks
                    var rules = vis.selectAll("g.rule")
                        .data(x.ticks(num_ticks))
                    .enter()
                        .append("svg:g")
                        .attr("transform", function(d)
                                {
                                return "translate(" + (chart_left + x(d)) + ")";});
                    rules.append("svg:line")
                        .attr("class", "tick")
                        .attr("y1", chart_top)
                        .attr("y2", chart_top + 4)
                        .attr("stroke", "black");
                    rules.append("svg:text")
                        .attr("class", "tick_label")
                        .attr("text-anchor", "middle")
                        .attr("y", chart_top)
                        .text(function(d)
                        {
                        return d;
                        });
                    var bbox = vis.selectAll(".tick_label").node().getBBox();
                    vis.selectAll(".tick_label")
                    .attr("transform", function(d)
                            {
                            return "translate(0," + (bbox.height) + ")";
                            });
                    var bars = vis.selectAll("g.bar")
                        .data(data)
                    .enter()
                        .append("svg:g")
                            .attr("class", "bar")
                            .attr("transform", function(d, i) {
                                    return "translate(0, " + y(i) + ")"; });
                    bars.append("svg:rect")
                        .attr("x", right_margin)
                        .attr("width", function(d) {
                                return (x(d.value));
                                })
                        .attr("height", y.rangeBand())
                        .attr("fill", color(0))
                        .attr("stroke", color(0));
                    //Labels
                    var labels = vis.selectAll("g.bar")
                        .append("svg:text")
                            .attr("class", "label")
                            .attr("x", 0)
                            .attr("text-anchor", "right")
                            .text(function(d) {
                                    return d.label;
                                    });
                    var bbox = labels.node().getBBox();
                    vis.selectAll(".label")
                        .attr("transform", function(d) {
                                return "translate(0, " + (y.rangeBand()/2 + bbox.height/4) + ")";
                                });
                    labels = vis.selectAll("g.bar")
                        .append("svg:text")
                        .attr("class", "value")
                        .attr("x", function(d)
                                {
                                return x(d.value) + right_margin + 10;
                                })
                        .attr("text-anchor", "left")
                        .text(function(d)
                        {
                        return "" + d.value + "%";
                        });
                    bbox = labels.node().getBBox();
                    vis.selectAll(".value")
                        .attr("transform", function(d)
                        {
                            return "translate(0, " + (y.rangeBand()/2 + bbox.height/4) + ")";
                        });
                    //Axes
                    vis.append("svg:line")
                        .attr("class", "axes")
                        .attr("x1", chart_left)
                        .attr("x2", chart_left)
                        .attr("y1", chart_bottom)
                        .attr("y2", chart_top)
                        .attr("stroke", "black");
                     vis.append("svg:line")
                        .attr("class", "axes")
                        .attr("x1", chart_left)
                        .attr("x2", chart_right)
                        .attr("y1", chart_top)
                        .attr("y2", chart_top)
                        .attr("stroke", "black");


                }
            }
        })





})();



