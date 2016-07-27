angular.module('application')
.directive('test', function() {
    return {
        scope: {},
        template: '<div class="d3-line-bar"></div>',
        link: function(scope, element, attr) {
            var $bar = element.find('.d3-line-bar');
            var bar = d3.select($bar[0]);
            var svg = bar.append('svg');

            var svg_height = svg.node().getBoundingClientRect().height;
            var svg_width = Math.round(svg.node().getBoundingClientRect().width);
            var data = [
                {name: 'Jordan', value: 150000, color: '#FF9736' },
                {name: 'Lebanon', value: 190000, color: '#AF13F1'},
                {name: 'Iran', value: 190000, color: '#7CE343'},
                {name: 'Oman', value: 134000, color: '#397EBD'},
                {name: 'UAE', value: 850000, color: '#FFE336'},
                {name: 'Tunisia', value: 320000, color: '#8A8A8A'}
            ];
            var margin = {
                top: 30,
                right: 20,
                bottom: 50,
                left: 50
            };
            var chart_height = svg_height - margin.top - margin.bottom;
            var chart_width = svg_width - margin.left - margin.right;



            // Create svg + group + rect to style
            svg
                .style('background-color', '#1F1F21')
                .append('g')
                .attr('transform', "translate(" + margin.left + ", " + margin.top +  ")")
                .attr('class', 'group')
                .append('rect')
                .attr('class', 'chart-rect')
                .attr('width', chart_width)
                .attr('height', chart_height)
                .style('fill', '#262628')
                // 38383C lightgray

        }
    }
});