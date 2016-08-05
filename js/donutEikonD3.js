angular.module('application')
.directive('donutEikonD3', function(dataSvc) {
    return {
        scope: {
            model: '<'
        },
        template: '<div id="donutChart"></div></div>',
        link: function(scope, element) {
            // links:
            // http://codepen.io/karthicguru/pen/QjYVRK
            // http://codepen.io/piupiupiu/pen/NAOqLk?editors=1010
            var pie;
            var sum = 0;
            var data = []

            var $bar = element.find('#donutChart');
            var bar = d3.select($bar[0]);
            var svg = bar.append('svg');

            var svg_height = svg.node().getBoundingClientRect().height;
            var svg_width = Math.round(svg.node().getBoundingClientRect().width);

            scope.$watch('model', function(oldVal, newVal) {
                data = scope.model.filter(function(value) {
                    return value.selected;
                });

                svg.selectAll('*').remove();
                updateRender();
            }, true);

            function calcPosition() {
                var tooltip;
                var w = 0;
                var h = 0;

                if (!tooltip) {
                    tooltip = $('.donut-tip');
                }

                w = tooltip.width();
                h = tooltip.height();

                return {
                    x: d3.event.pageX - w / 2,
                    y: d3.event.pageY - h - 30
                }
            }

            var tip = d3.tip()
              .attr('class', 'donut-tip')
              .html(function(d) {
                var percentage = Math.round(d.data.sales * 100 / sum);

                return '<span><span class="icon" style="background-color:'+ d.data.color +'"></span> ' + d.data.country + '</br>Sales: ' + d.data.sales +'</br>Percentage: ' + percentage +' %</span>';
              })
              .style('top', (d3.event + 100) + 'px')
              .style('left', (d3.event + 100) + 'px');

            svg.call(tip);

            function updateRender() {
                var width = svg_width,
                    height = svg_height,
                    radius = Math.min(width, height) / 2.5
                    outerRadius = radius / 2;
                // var colour = d3.scale.category20();

                data.forEach(function(item) {
                    sum += item.sales;
                });

                var new_svg = svg
                    .style('background-color', '#1F1F21')

                var arc = d3.svg.arc()
                   .innerRadius(radius - 110)
                   .outerRadius(radius - 20);

                var outerArc = d3.svg.arc()
                    .innerRadius(outerRadius - 10)
                    .outerRadius(outerRadius - 3);

                var hoverArc = d3.svg.arc()
                    .outerRadius(radius - 13)
                    .innerRadius(radius - 20);

                pie = d3.layout.pie()
                   .value(function (data) {
                        return data.sales;
                    })
                   .sort(null);

                var x = width / 2 - radius;
                var y  = height / 2 - radius;
                var new_svg = svg
                   .attr("width", width)
                   .attr("height", height)
                   .append("g")
                   .attr("transform", "translate(" + width / 2 + "," + height / 2 + ")");

                var arcs = new_svg.selectAll(".arc")
                    .data(pie(data))
                    .enter().append("g")
                    .attr("class", "arc")
                    .on('mousemove', function(event) {
                        var pos = calcPosition();

                        tip
                        .style("top", pos.y + "px")
                        .style("left", pos.x + "px")
                    })
                    .on('mouseover', function(d) {
                        var hoverPath = d3.select(this).select('.hoverPath');
                        var pos = calcPosition();

                        tip.style("top", pos.y + "px")
                            .style("left", pos.x + "px")
                            .show(d);
                        hoverPath.attr('opacity', .5);

                        tip.show(d);
                    })
                    .on('mouseout', function(d) {
                        var hoverPath = d3.select(this).select('.hoverPath');

                        tip.hide();
                        hoverPath.attr('opacity', 0);
                    });

                arcs.append("path")
                  .attr("d", arc)
                  .attr("fill", function(data, i) {
                    return data.data.color;
                  });

                arcs.append('path')
                    .attr("d", outerArc)
                    .style('fill', function(d, i) {
                        return '#fff';
                    })
                    .attr('opacity', .2);

                var hoverPaths = arcs.append('path')
                    .attr('d', hoverArc)
                    .attr('class', 'hoverPath')
                    .style('fill', function(data, i) {
                        return data.data.color;
                    })
                    .attr('opacity', 0)


                  // var outterArcs = new_svg.selectAll('.outer')
                  //   .data(pie(data))
                  //   .enter().append('g')
                  //   .attr("class", "outer")


                // var outterArcs = svg.append("g")
                //         .attr("class", "outter-arc")
                //         .attr("transform", 'translate(' + (width / 2) + ',' + (height / 2) + ')');

                // var outter = outterArcs.selectAll('path')
                //     .data(pie(data));

                // outterArcs.append('path')
                //     .attr("d", outerArc)
                //     .style('fill', function(d, i) {
                //         return '#fff';
                //     })
                //     .attr('opacity', .2)

            }



            // g.append("text")
            //   .attr("transform", function(d) {
            //     return "translate(" + arc.centroid(d) + ")";
            //   })
            //   .attr("dy", ".35em")
            //   .style("text-anchor", "middle")
            //   .attr("fill", "#fff")
            //   .text(function(d,i) { return seedData[i].label; })

            // new_svg.append("circle")
            //    .attr("cx", 0)
            //    .attr("cy", 0)
            //    .attr("r", 100)
            //    .attr("fill", "#CCC") ;
               // If you want to change the colour of the inner circle, change it here.

            // new_svg.append("text")
            //   .attr("dy", "-0.5em")
            //   .style("text-anchor", "middle")
            //   .attr("class", "inner-circle")
            //   .attr("fill", "#36454f")
            //   .text(function(d) { return 'JavaScript'; });

            // new_svg.append("text")
            //   .attr("dy", "1.0em")
            //   .style("text-anchor", "middle")
            //   .attr("class", "inner-circle")
            //   .attr("fill", "#36454f")
            //   .text(function(d) { return 'is lots of fun!'; });




        }
    }
});

