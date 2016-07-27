angular.module('application')
.directive('lineEikonD3', function() {
    return {
        scope: {
            model: '<'
        },
        template: '<div class="d3-line-bar line-bar"></div></div>',
        link: function(scope, element) {
            var $bar = element.find('.d3-line-bar');
            var bar = d3.select($bar[0]);
            var svg = bar.append('svg');

            var svg_height = svg.node().getBoundingClientRect().height;
            var svg_width = Math.round(svg.node().getBoundingClientRect().width);


            var svg = d3.select("svg"),
                margin = {top: 20, right: 80, bottom: 30, left: 50},
                width = svg.attr("width") - margin.left - margin.right,
                height = svg.attr("height") - margin.top - margin.bottom,
                g = svg.append("g").attr("transform", "translate(" + margin.left + "," + margin.top + ")");

            var parseTime = d3.time.format("%Y%m%d").parse;


            var x = d3.time.scale().range([0, width]),
                y = d3.scale.linear().range([height, 0]),
                z = d3.scale.ordinal(d3.schemeCategory10);

            var line = d3.svg.line()
                .interpolate(d3.curveBasis)
                .x(function(d) { return x(d.date); })
                .y(function(d) { return y(d.temperature); });

// https://bl.ocks.org/mbostock/3884955
            d3.tsv("js/data.tsv", type, function(error, data) {

              if (error) throw error;

              var cities = data.columns.slice(1).map(function(id) {
                return {
                  id: id,
                  values: data.map(function(d) {
                    return {date: d.date, temperature: d[id]};
                  })
                };
              });

              x.domain(d3.extent(data, function(d) { return d.date; }));

              y.domain([
                d3.min(cities, function(c) { return d3.min(c.values, function(d) { return d.temperature; }); }),
                d3.max(cities, function(c) { return d3.max(c.values, function(d) { return d.temperature; }); })
              ]);

              z.domain(cities.map(function(c) { return c.id; }));

              g.append("g")
                  .attr("class", "axis axis--x")
                  .attr("transform", "translate(0," + height + ")")
                  .call(d3.axisBottom(x));

              g.append("g")
                  .attr("class", "axis axis--y")
                  .call(d3.axisLeft(y))
                .append("text")
                  .attr("transform", "rotate(-90)")
                  .attr("y", 6)
                  .attr("dy", "0.71em")
                  .attr("fill", "#000")
                  .text("Temperature, ºF");

              var city = g.selectAll(".city")
                .data(cities)
                .enter().append("g")
                  .attr("class", "city");

              city.append("path")
                  .attr("class", "line")
                  .attr("d", function(d) { return line(d.values); })
                  .style("stroke", function(d) { return z(d.id); });

              city.append("text")
                  .datum(function(d) { return {id: d.id, value: d.values[d.values.length - 1]}; })
                  .attr("transform", function(d) { return "translate(" + x(d.value.date) + "," + y(d.value.temperature) + ")"; })
                  .attr("x", 3)
                  .attr("dy", "0.35em")
                  .style("font", "10px sans-serif")
                  .text(function(d) { return d.id; });
            });

            function type(d, _, columns) {
              d.date = parseTime(d.date);
              for (var i = 1, n = columns.length, c; i < n; ++i) d[c = columns[i]] = +d[c];
              return d;
            }


            // // Set the dimensions of the canvas / graph
            // var margin = {top: 30, right: 20, bottom: 30, left: 40},
            //     width = svg_width - margin.left - margin.right,
            //     height = svg_height - margin.top - margin.bottom;

            // // Parse the date / time
            // var parseDate = d3.time.format("%d-%b-%y").parse;

            // // Set the ranges
            // //var x = d3.time.scale().range([0, width]);
            // var x = d3.scale.ordinal().rangeRoundBands([0, width], .1);
            // var y = d3.scale.linear().range([height, 0]);

            // // Define the axes
            // var xAxis = d3.svg.axis().scale(x)
            //     .orient("bottom").ticks(5);

            // var xAxis = d3.svg.axis().scale(x)
            // .orient("bottom")
            // .tickFormat(d3.time.format("%d-%b-%y"));

            // var yAxis = d3.svg.axis().scale(y)
            //     .orient("left").ticks(10);

            // // Define the linear line
            // var valueline = d3.svg.line()
            //     .x(function(d) { return x(d.year); })
            //     .y(function(d) {
            //         return y(d.max);
            //          })
            //     .interpolate('linear');

            // // Define the smooth line
            // var valueline2=d3.svg.line()
            //     .interpolate("basis")
            //     .x(function(d){return x(d.year)})
            //     .y(function(d){return y(d.max)});



            // // Adds the svg canvas
            // var new_svg = svg
            //     .append("g")
            //         .attr("transform",
            //               "translate(" + margin.left + "," + margin.top + ")");

            // // Get the data
            // d3.csv("https://s3-us-west-2.amazonaws.com/s.cdpn.io/205914/mobile_sub.csv", function(error, data) {

            //     var data = [
            //         {
            //             year: '20-Jun-12',
            //             items: [{name: 'Iraq', value: 500},{name: 'Iran', value: 200}, {name: 'UAE', value: 100}, {name: 'Kuwait', value: 454}]
            //         },
            //         {
            //             year: '20-Jun-13',
            //             items: [{name: 'Iraq', value: 200}, {name: 'Iran', value: 100}, {name: 'UAE', value: 234}, {name: 'Kuwait', value: 453}]
            //         },
            //         {
            //             year: '20-Jun-14',
            //             items: [{name: 'Iraq', value: 300}, {name: 'Iraq', value: 100}, {name: 'UAE', value: 453}, {name: 'Kuwait', value: 464}]
            //         },
            //         {
            //             year: '20-Jun-15',
            //             items: [{name: 'Iraq', value: 400}, {name: 'Iran', value: 500}, {name: 'UAE', value: 453}, {name: 'Kuwait', value: 345}]
            //         },
            //         {
            //             year: '20-Jun-16',
            //             items: [{name: 'Iraq', value: 700}, {name: 'Iran', value: 800}, {name: 'UAE', value: 345}, {name: 'Kuwait', value: 345}]
            //         },
            //         {
            //             year: '20-Jun-17',
            //             items: [{name: 'Iraq', value: 200}, {name: 'Iran', value: 431}, {name: 'UAE', value: 235}, {name: 'Kuwait', value: 342}]
            //         },
            //         {
            //             year: '20-Jun-18',
            //             items: [{name: 'Iraq', value: 100}, {name: 'Iran', value: 453}, {name: 'UAE', value: 234}, {name: 'Kuwait', value: 234}]
            //         }
            //     ]


            //     data.forEach(function(data) {
            //         data.max = Math.max.apply(Math, data.items.map(function(item) {
            //             return item.value; }
            //         ));
            //     });

            //     // data.forEach(function(d) {
            //     //     d.year = parseDate(d.year);
            //     //     d.value = +d.value;
            //     //     d.open=+d.open;
            //     //     console.log(d.value)
            //     // });

            //     // Scale the range of the data
            //     //x.domain(d3.extent(data, function(d) { return d.date; }));
            //     // old
            //     // x.domain(data.map(function(d) { return d.date; }));

            //     x.domain(data.map(function(d) { return d.year; }));

            //     // old
            //     // y.domain([0, d3.max(data, function(d) {
            //     //     return Math.max(d.value,d.open)
            //     // })]);

            //     y.domain([0, d3.max(data, function(d) {
            //         return d.max;
            //     })]);

            //     // Add the valueline path.
            //     new_svg.append("path")
            //         .attr("class", "line")

            //         .attr("d", valueline(data));

            //     new_svg.append("path")
            //         .style("stroke","red")
            //         .attr("d", valueline2(data));

            //     // svg.selectAll("bar")
            //     // .data(data)
            //     // .enter().append("rect")
            //     // .style("fill", "steelblue")
            //     // .attr("x", function(d) { return x(d.date) -10; })
            //     // .attr("width",20)
            //     // .attr("y", function(d) { return y(d.value); })
            //     // .attr("height", function(d) { return height - y(d.value); });


            //   new_svg.selectAll("dot")
            //         .data(data)
            //         .enter().append("circle")
            //         .attr("r",3)
            //         .attr("cx", function(d) { return x(d.year) ; })
            //         .attr("cy", function(d) { return y(d.value); })
            //         .attr("fill","steelblue")
            //         .attr("stroke","steelblue");


            //     // Add the X Axis
            //     new_svg.append("g")
            //         .attr("class", "x axis")
            //         .attr("transform", "translate(0," + height + ")")
            //          .attr("width", 1440)
            //         .call(xAxis);



            //     // Add the Y Axis
            //     new_svg.append("g")
            //         .attr("class", "y axis")
            //         .call(yAxis);

            // });


        }
    }
});