angular.module('application')
.directive('barHorD3', function() {
    return {
        scope: {

        },
        template: '<div class="d3-line-bar"></div>',
        link: function(scope, element, attrs) {
            var $bar = element.find('.d3-line-bar');
            var bar = d3.select($bar[0]);
            var svg = bar.append('svg');

            var data = [{"label":"1990", "value":16},
                    {"label":"1991", "value":56},
                    {"label":"1992", "value":7},
                    {"label":"1993", "value":77},
                    {"label":"1994", "value":22},
                    {"label":"1995", "value":16}
                    ];

            var svg_height = svg.node().getBoundingClientRect().height;
            var svg_width = svg.node().getBoundingClientRect().width;

            // maximum of data you want to use
            var data_max = 100,
            // number of tickmarks to use
            num_ticks = 5,
            // margins
            left_margin = 60,
            right_margin = 60,
            top_margin = 30,
            bottom_margin = 0;

            var color = function(id) { return '#00b3dc' };

            // Scale function for oX
            // @domain - input domain range(input real data; min/max values)
            // @range - output range values(output virtual values; min/max values)
            var x = d3.scale.linear()
                .domain([0, data_max])
                .range([0, svg_width - ( left_margin + right_margin ) ]);

            // Scale function for oY
            // @domain - range, based ot real data count
            // @rangeBands -
            var y = d3.scale.ordinal()
                .domain(d3.range(data.length))
                .rangeBands([0, svg_height - top_margin], .5);

            var chart_top = svg_height - y.rangeBand() / 2 - top_margin;
            var chart_bottom = bottom_margin + y.rangeBand() / 2;
            var chart_left = left_margin;
            var chart_right = svg_width - right_margin;

            // Setup the SVG element and position it
            var vis = svg
                .append("svg:g")
                    .attr("id", "barchart")
                    .attr("class", "barchart")


            // Draw ticks
            var rules = vis.selectAll("g.rule")
            // set number of ticks
                .data(x.ticks(num_ticks))
            .enter()
                .append("svg:g")
                .attr("transform", function(d) {
                    // begin with margin from the left
                    return "translate(" + (chart_left + x(d)) + ")";
                });
            // Draw tick line if needed
            rules.append("svg:line")
                .attr("class", "tick")
                .attr("y1", chart_top)
                .attr("y2", chart_top + 4)
                .attr("stroke", "black");
            rules.append("svg:text")
                .attr("class", "tick_label")
                .attr("text-anchor", "middle")
                .attr("y", chart_top)
                .text(function(d) {
                    return d;
                });

            var bbox = vis.selectAll(".tick_label").node().getBBox();
            vis.selectAll(".tick_label")
            .attr("transform", function(d) {
                return "translate(0," + (bbox.height) + ")";
            })
            .attr('fill', '#000')


            // Bars blocks
            var bars = vis.selectAll("g.bar")
            // bind data to bars
                .data(data)
            // will create new elements, based on elements' count in data
            .enter()
            // append svg group block
                .append("svg:g")
                    .attr("class", "bar")
                    .attr("transform", function(d, i) {
                        return "translate(0, " + y(i) + ")";
                    });
            // append rect block in each group block
            bars.append("svg:rect")
                .attr("x", right_margin)
                .attr("width", function(d) {
                    return x(d.value);
                })
                .attr("height", y.rangeBand())
                .attr("fill", color(0))
                .attr("stroke", color(0));


            // Draw Labels (year/%)
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
                .attr("x", function(d) {
                    return x(d.value) + right_margin + 10;
                })
                .attr("text-anchor", "left")
                .text(function(d) {
                    return "" + d.value + "%";
                });

            bbox = labels.node().getBBox();
            vis.selectAll(".value")
                .attr("transform", function(d) {
                    return "translate(0, " + (y.rangeBand()/2 + bbox.height/4) + ")";
                });


            // @vis - main svg element
            // -------------------------------------
            // Draw horizontal axe:
            // x1,y2 - start point of line
            // x2,ya - enf point of line
            vis.append("svg:line")
                .attr("class", "axes")
                .attr("x1", chart_left)
                .attr("y1", chart_bottom)
                .attr("x2", chart_left)
                .attr("y2", chart_top)
                .attr("stroke", "black");
            // Draw vertical axe:
            vis.append("svg:line")
                .attr("class", "axes")
                .attr("x1", chart_left)
                .attr("y1", chart_top)
                .attr("x2", chart_right)
                .attr("y2", chart_top)
                .attr("stroke", "black");
        }
    }
})