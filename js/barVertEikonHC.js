angular.module('application')
.directive('barVertEikonHs', function($window) {
    return {
        scope: {
            model: '<'
        },
        template: '<div class="hs-line-bar">' +
                    '<div class="hs-container"></div>' +
                  '</div>',
        link: function(scope, element, attr) {
            var chartContainer = element.find('.hs-container')[0];
            var data;
            var countries;
            var chart;
            var sales = [
                {
                    name: 'Sales',
                    data: []
                }
            ];

            var config = {
                chart: {
                    renderTo: chartContainer,
                    type: 'column',
                    marginTop: 20,
                    backgroundColor: 'rgb(31, 31, 33)',
                    plotBackgroundColor: 'rgb(38, 38, 40)'
                },
                title: {
                    text: '',
                },
                xAxis: {
                    lineColor: '#656566',
                    tickWidth: 0,
                    gridLineColor: '#656566',
                    labels: {
                      style: {
                          fontSize: '14px',
                          color: '#656566',
                         }
                      },
                    categories: countries
                },
                yAxis: {
                    gridLineDashStyle: 'solid',
                    gridLineWidth: 1,
                    gridLineColor: '#656566',
                    tickInterval: 200000,
                    title: {
                        text: '',
                        style: {
                          color: '#656566'
                         }
                    },
                    labels: {
                      // // allow to format currency label
                      // formatter: function() {
                      //           return '$'+Highcharts.numberFormat(this.value, 0, '', ',');
                      //       },
                      style: {
                          fontSize: '14px',
                          color: '#656566',
                         }
                      }
                    },
                legend: {
                    enabled: false,
                },
                credits: {
                    enabled: false
                },
                tooltip: {
                    useHTML: true,
                    borderWidth: 0,
                    style: {
                        padding: 0
                    }
                },
                plotOptions: {
                    column: {
                        pointPadding: -0.12,
                        groupPadding: 0.43,
                        borderColor: "transparent",
                    },
                },
                series: sales
            };

            scope.$watch('model', function(oldVal, newVal) {
                data = scope.model.filter(function(value) {
                    return value.selected;
                });

                countries = data.map(function(item) {
                    return item.country;
                });

                sales[0].data = data.map(function(item) {
                    return {
                        name: item.country,
                        color: item.color,
                        y: item.sales
                    }
                });

                config.xAxis.categories = countries;
                config.series = sales;

                chart = new Highcharts.Chart(config);
            }, true);

        }
    }
});


