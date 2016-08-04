angular.module('application')
.directive('donutEikonD3', function(dataSvc) {
    return {
        scope: {
            model: '<'
        },
        template: '<div class="d3-line-bar line-bar"></div></div>',
        link: function(scope, element) {
            var parseTime = d3.time.format("%Y-%m-%d").parse;
            var data = dataSvc.getData();
            var sum = 0;

            var $bar = element.find('.d3-line-bar');
            var bar = d3.select($bar[0]);
            var svg = bar.append('svg');

            var svg_height = svg.node().getBoundingClientRect().height;
            var svg_width = Math.round(svg.node().getBoundingClientRect().width);

            scope.$watch('model', function(oldVal, newVal) {
                data = scope.model.filter(function(value) {
                    return value.selected;
                });

                // data.forEach(function(item) {
                //     sum += item.sales;
                // });

                // data.forEach(function(item) {
                //     item.percentage = item.sales * 100 / sum;
                // });

                // var maxValue = Math.max.apply(Math, data.map(function(item){
                //     return item.sales;
                // }));

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

                // new_svg
                //     .append('rect')
                //     .attr('class', 'chart-rect')
                //     .attr('width', width)
                //     .attr('height', height)
                //     .style('fill', '#262628')
            }
        }
    }
});

