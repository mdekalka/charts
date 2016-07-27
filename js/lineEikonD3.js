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


            // Set the dimensions of the canvas / graph
            var margin = {top: 30, right: 20, bottom: 30, left: 40},
                width = svg_width - margin.left - margin.right,
                height = svg_height - margin.top - margin.bottom;

            // Parse the date / time
            var parseDate = d3.time.format("%d-%b-%y").parse;

            // Set the ranges
            //var x = d3.time.scale().range([0, width]);
            var x = d3.scale.ordinal().rangeRoundBands([0, width], .1);
            var y = d3.scale.linear().range([height, 0]);

            // Define the axes
            var xAxis = d3.svg.axis().scale(x)
                .orient("bottom").ticks(5);

            var xAxis = d3.svg.axis().scale(x)
            .orient("bottom")
            .tickFormat(d3.time.format("%d-%b-%y"));

            var yAxis = d3.svg.axis().scale(y)
                .orient("left").ticks(10);

            // Define the linear line
            var valueline = d3.svg.line()
                .x(function(d) { return x(d.date); })
                .y(function(d) { return y(d.value); })
                .interpolate('linear');

            // Define the smooth line
            var valueline2=d3.svg.line()
                .interpolate("basis")
                .x(function(d){return x(d.date)})
                .y(function(d){return y(d.open)});



            // Adds the svg canvas
            var new_svg = svg
                .append("g")
                    .attr("transform",
                          "translate(" + margin.left + "," + margin.top + ")");

            // Get the data
            d3.csv("https://s3-us-west-2.amazonaws.com/s.cdpn.io/205914/mobile_sub.csv", function(error, data) {
                data.forEach(function(d) {
                    d.date = parseDate(d.date);
                    d.value = +d.value;
                    d.open=+d.open;
                    console.log(d.value)
                });

                // Scale the range of the data
                //x.domain(d3.extent(data, function(d) { return d.date; }));
                x.domain(data.map(function(d) { return d.date; }));

                y.domain([0, d3.max(data, function(d) { return Math.max(d.value,d.open) })]);


                // Add the valueline path.
                new_svg.append("path")
                    .attr("class", "line")

                    .attr("d", valueline(data));

                new_svg.append("path")
                    .style("stroke","red")
                    .attr("d", valueline2(data));

                // svg.selectAll("bar")
                // .data(data)
                // .enter().append("rect")
                // .style("fill", "steelblue")
                // .attr("x", function(d) { return x(d.date) -10; })
                // .attr("width",20)
                // .attr("y", function(d) { return y(d.value); })
                // .attr("height", function(d) { return height - y(d.value); });


              new_svg.selectAll("dot")
                    .data(data)
                    .enter().append("circle")
                    .attr("r",3)
                    .attr("cx", function(d) { return x(d.date) ; })
                    .attr("cy", function(d) { return y(d.value); })
                    .attr("fill","steelblue")
                    .attr("stroke","steelblue");


                // Add the X Axis
                new_svg.append("g")
                    .attr("class", "x axis")
                    .attr("transform", "translate(0," + height + ")")
                     .attr("width", 1440)
                    .call(xAxis);



                // Add the Y Axis
                new_svg.append("g")
                    .attr("class", "y axis")
                    .call(yAxis);

            });


        }
    }
});