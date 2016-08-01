angular.module('application')
.directive('multipleBarEikonHc', function($window, dataSvc) {
    return {
        scope: {
            model: '<'
        },
        template: '<div class="hs-line-bar">' +
                    '<div class="hs-container"></div>' +
                  '</div>',
        link: function(scope, element, attr) {
            var chartContainer = element.find('.hs-container')[0];
            var data = dataSvc.getData();
            var countries;
            var chart;
            var dates;
            var values;

            var config = {
                chart: {
                    type: 'column',
                    renderTo: chartContainer,
                    marginTop: 20,
                    backgroundColor: 'rgb(31, 31, 33)',
                    plotBackgroundColor: 'rgb(38, 38, 40)'
                },
                title: {
                    text: ''
                },
                xAxis: {
                    lineColor: '#656566',
                    tickWidth: 0,
                    minPadding: 0,
                    maxPadding: 0,
                    categories: dates,
                    labels: {
                        style: {
                          fontSize: '14px',
                          color: '#656566',
                        }
                    },
                },
                yAxis: {
                    gridLineDashStyle: 'solid',
                    gridLineWidth: 1,
                    gridLineColor: '#656566',
                    min: 0,
                    max: 100,
                    tickInterval: 20,
                    title: {
                        text: '',
                        style: {
                          color: '#656566'
                         }
                    },
                    labels: {
                        style: {
                          fontSize: '14px',
                          color: '#656566',
                        }
                    }
                },
                tooltip: {
                    useHTML: true,
                    borderWidth: 0,
                    style: {
                        padding: 0
                    }
                },
                legend: {
                    enabled: false,
                },
                credits: {
                    enabled: false
                },
                plotOptions: {
                    column: {
                        pointPadding: .2,
                        groupPadding: 0.07,
                        borderWidth: 0
                    }
                },
                series: values
            };

            scope.$watch('model', function(oldVal, newVal) {
                dates = data.map(function(item) {
                    return item.date.getFullYear();
                });

                values = data.columns.slice(1).map(function(id) {
                    return {
                      name: id,
                      color: data.colors[id],
                      data: data.map(function(d) {
                        return d[id];
                      })
                    };
                });

                config.xAxis.categories = dates;
                config.series = values;

                chart = new Highcharts.Chart(config);
            }, true);

        }
    }
});


