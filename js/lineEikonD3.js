angular.module('application')
.directive('lineEikonD3', function() {
    return {
        scope: {
            model: '<'
        },
        template: '<div class="d3-line-bar line-bar"><div id="canvas-svg"></div></div>',
        link: function(scope, element) {
            var $bar = element.find('.d3-line-bar');
            var bar = d3.select($bar[0]);
            var svg = bar.append('svg');

            var svg_height = svg.node().getBoundingClientRect().height;
            var svg_width = Math.round(svg.node().getBoundingClientRect().width);

            var WIDTH = 960, HEIGHT = 500;

            var config = {
                yAxisLabel: 'Price ($)',
                xAxisTimeFormat: '%d-%b-%y',
                xAxisData: 'date',
                yAxisData: 'close'
            }

            var data = [
                      {
                        "date": "1-May-12",
                        "close": "582.13"
                      },
                      {
                        "date": "30-Apr-12",
                        "close": "583.98"
                      },
                      {
                        "date": "27-Apr-12",
                        "close": "603.00"
                      },
                      {
                        "date": "26-Apr-12",
                        "close": "607.70"
                      },
                      {
                        "date": "25-Apr-12",
                        "close": "610.00"
                      },
                      {
                        "date": "24-Apr-12",
                        "close": "560.28"
                      },
                      {
                        "date": "23-Apr-12",
                        "close": "571.70"
                      },
                      {
                        "date": "20-Apr-12",
                        "close": "572.98"
                      },
                      {
                        "date": "19-Apr-12",
                        "close": "587.44"
                      },
                      {
                        "date": "18-Apr-12",
                        "close": "608.34"
                      },
                      {
                        "date": "17-Apr-12",
                        "close": "609.70"
                      },
                      {
                        "date": "16-Apr-12",
                        "close": "580.13"
                      },
                      {
                        "date": "13-Apr-12",
                        "close": "605.23"
                      },
                      {
                        "date": "12-Apr-12",
                        "close": "622.77"
                      },
                      {
                        "date": "11-Apr-12",
                        "close": "626.20"
                      },
                      {
                        "date": "10-Apr-12",
                        "close": "628.44"
                      },
                      {
                        "date": "9-Apr-12",
                        "close": "636.23"
                      },
                      {
                        "date": "5-Apr-12",
                        "close": "633.68"
                      },
                      {
                        "date": "4-Apr-12",
                        "close": "624.31"
                      },
                      {
                        "date": "3-Apr-12",
                        "close": "629.32"
                      },
                      {
                        "date": "2-Apr-12",
                        "close": "618.63"
                      },
                      {
                        "date": "30-Mar-12",
                        "close": "599.55"
                      },
                      {
                        "date": "29-Mar-12",
                        "close": "609.86"
                      },
                      {
                        "date": "28-Mar-12",
                        "close": "617.62"
                      },
                      {
                        "date": "27-Mar-12",
                        "close": "614.48"
                      },
                      {
                        "date": "26-Mar-12",
                        "close": "606.98"
                      },
                      {
                        "date": "23-Mar-12",
                        "close": "596.05"
                      },
                      {
                        "date": "22-Mar-12",
                        "close": "599.34"
                      },
                      {
                        "date": "21-Mar-12",
                        "close": "602.50"
                      },
                      {
                        "date": "20-Mar-12",
                        "close": "605.96"
                      },
                      {
                        "date": "19-Mar-12",
                        "close": "601.10"
                      },
                      {
                        "date": "16-Mar-12",
                        "close": "585.57"
                      },
                      {
                        "date": "15-Mar-12",
                        "close": "585.56"
                      },
                      {
                        "date": "14-Mar-12",
                        "close": "589.58"
                      },
                      {
                        "date": "13-Mar-12",
                        "close": "568.10"
                      },
                      {
                        "date": "12-Mar-12",
                        "close": "552.00"
                      },
                      {
                        "date": "9-Mar-12",
                        "close": "545.17"
                      },
                      {
                        "date": "8-Mar-12",
                        "close": "541.99"
                      },
                      {
                        "date": "7-Mar-12",
                        "close": "530.69"
                      },
                      {
                        "date": "6-Mar-12",
                        "close": "530.26"
                      },
                      {
                        "date": "5-Mar-12",
                        "close": "533.16"
                      },
                      {
                        "date": "2-Mar-12",
                        "close": "545.18"
                      },
                      {
                        "date": "1-Mar-12",
                        "close": "544.47"
                      },
                      {
                        "date": "29-Feb-12",
                        "close": "542.44"
                      },
                      {
                        "date": "28-Feb-12",
                        "close": "535.41"
                      },
                      {
                        "date": "27-Feb-12",
                        "close": "525.76"
                      },
                      {
                        "date": "24-Feb-12",
                        "close": "522.41"
                      },
                      {
                        "date": "23-Feb-12",
                        "close": "516.39"
                      },
                      {
                        "date": "22-Feb-12",
                        "close": "513.04"
                      },
                      {
                        "date": "21-Feb-12",
                        "close": "514.85"
                      },
                      {
                        "date": "17-Feb-12",
                        "close": "502.12"
                      },
                      {
                        "date": "16-Feb-12",
                        "close": "502.21"
                      },
                      {
                        "date": "15-Feb-12",
                        "close": "497.67"
                      },
                      {
                        "date": "14-Feb-12",
                        "close": "509.46"
                      },
                      {
                        "date": "13-Feb-12",
                        "close": "502.60"
                      },
                      {
                        "date": "10-Feb-12",
                        "close": "493.42"
                      },
                      {
                        "date": "9-Feb-12",
                        "close": "493.17"
                      },
                      {
                        "date": "8-Feb-12",
                        "close": "476.68"
                      },
                      {
                        "date": "7-Feb-12",
                        "close": "468.83"
                      },
                      {
                        "date": "6-Feb-12",
                        "close": "463.97"
                      },
                      {
                        "date": "3-Feb-12",
                        "close": "459.68"
                      },
                      {
                        "date": "2-Feb-12",
                        "close": "455.12"
                      },
                      {
                        "date": "1-Feb-12",
                        "close": "456.19"
                      },
                      {
                        "date": "31-Jan-12",
                        "close": "456.48"
                      },
                      {
                        "date": "30-Jan-12",
                        "close": "453.01"
                      },
                      {
                        "date": "27-Jan-12",
                        "close": "447.28"
                      },
                      {
                        "date": "26-Jan-12",
                        "close": "444.63"
                      },
                      {
                        "date": "25-Jan-12",
                        "close": "446.66"
                      },
                      {
                        "date": "24-Jan-12",
                        "close": "420.41"
                      },
                      {
                        "date": "23-Jan-12",
                        "close": "427.41"
                      },
                      {
                        "date": "20-Jan-12",
                        "close": "420.30"
                      },
                      {
                        "date": "19-Jan-12",
                        "close": "427.75"
                      },
                      {
                        "date": "18-Jan-12",
                        "close": "429.11"
                      },
                      {
                        "date": "17-Jan-12",
                        "close": "424.70"
                      },
                      {
                        "date": "13-Jan-12",
                        "close": "419.81"
                      },
                      {
                        "date": "12-Jan-12",
                        "close": "421.39"
                      },
                      {
                        "date": "11-Jan-12",
                        "close": "422.55"
                      },
                      {
                        "date": "10-Jan-12",
                        "close": "423.24"
                      },
                      {
                        "date": "9-Jan-12",
                        "close": "421.73"
                      },
                      {
                        "date": "6-Jan-12",
                        "close": "422.40"
                      },
                      {
                        "date": "5-Jan-12",
                        "close": "418.03"
                      },
                      {
                        "date": "4-Jan-12",
                        "close": "413.44"
                      },
                      {
                        "date": "3-Jan-12",
                        "close": "411.23"
                      },
                      {
                        "date": "30-Dec-11",
                        "close": "405.00"
                      },
                      {
                        "date": "29-Dec-11",
                        "close": "405.12"
                      },
                      {
                        "date": "28-Dec-11",
                        "close": "402.64"
                      },
                      {
                        "date": "27-Dec-11",
                        "close": "406.53"
                      },
                      {
                        "date": "23-Dec-11",
                        "close": "403.43"
                      },
                      {
                        "date": "22-Dec-11",
                        "close": "398.55"
                      },
                      {
                        "date": "21-Dec-11",
                        "close": "396.44"
                      },
                      {
                        "date": "20-Dec-11",
                        "close": "395.95"
                      },
                      {
                        "date": "19-Dec-11",
                        "close": "382.21"
                      },
                      {
                        "date": "16-Dec-11",
                        "close": "381.02"
                      },
                      {
                        "date": "15-Dec-11",
                        "close": "378.94"
                      },
                      {
                        "date": "14-Dec-11",
                        "close": "380.19"
                      },
                      {
                        "date": "13-Dec-11",
                        "close": "388.81"
                      },
                      {
                        "date": "12-Dec-11",
                        "close": "391.84"
                      },
                      {
                        "date": "9-Dec-11",
                        "close": "393.62"
                      },
                      {
                        "date": "8-Dec-11",
                        "close": "390.66"
                      },
                      {
                        "date": "7-Dec-11",
                        "close": "389.09"
                      },
                      {
                        "date": "6-Dec-11",
                        "close": "390.95"
                      },
                      {
                        "date": "5-Dec-11",
                        "close": "393.01"
                      },
                      {
                        "date": "2-Dec-11",
                        "close": "389.70"
                      },
                      {
                        "date": "1-Dec-11",
                        "close": "387.93"
                      },
                      {
                        "date": "30-Nov-11",
                        "close": "382.20"
                      },
                      {
                        "date": "29-Nov-11",
                        "close": "373.20"
                      },
                      {
                        "date": "28-Nov-11",
                        "close": "376.12"
                      },
                      {
                        "date": "25-Nov-11",
                        "close": "363.57"
                      },
                      {
                        "date": "23-Nov-11",
                        "close": "366.99"
                      },
                      {
                        "date": "22-Nov-11",
                        "close": "376.51"
                      },
                      {
                        "date": "21-Nov-11",
                        "close": "369.01"
                      },
                      {
                        "date": "18-Nov-11",
                        "close": "374.94"
                      },
                      {
                        "date": "17-Nov-11",
                        "close": "377.41"
                      },
                      {
                        "date": "16-Nov-11",
                        "close": "384.77"
                      },
                      {
                        "date": "15-Nov-11",
                        "close": "388.83"
                      },
                      {
                        "date": "14-Nov-11",
                        "close": "379.26"
                      },
                      {
                        "date": "11-Nov-11",
                        "close": "384.62"
                      },
                      {
                        "date": "10-Nov-11",
                        "close": "385.22"
                      },
                      {
                        "date": "9-Nov-11",
                        "close": "395.28"
                      },
                      {
                        "date": "8-Nov-11",
                        "close": "406.23"
                      },
                      {
                        "date": "7-Nov-11",
                        "close": "399.73"
                      },
                      {
                        "date": "4-Nov-11",
                        "close": "400.24"
                      },
                      {
                        "date": "3-Nov-11",
                        "close": "403.07"
                      },
                      {
                        "date": "2-Nov-11",
                        "close": "397.41"
                      },
                      {
                        "date": "1-Nov-11",
                        "close": "396.51"
                      },
                      {
                        "date": "31-Oct-11",
                        "close": "404.78"
                      },
                      {
                        "date": "28-Oct-11",
                        "close": "404.95"
                      },
                      {
                        "date": "27-Oct-11",
                        "close": "404.69"
                      },
                      {
                        "date": "26-Oct-11",
                        "close": "400.60"
                      },
                      {
                        "date": "25-Oct-11",
                        "close": "397.77"
                      },
                      {
                        "date": "24-Oct-11",
                        "close": "405.77"
                      },
                      {
                        "date": "21-Oct-11",
                        "close": "392.87"
                      },
                      {
                        "date": "20-Oct-11",
                        "close": "395.31"
                      },
                      {
                        "date": "19-Oct-11",
                        "close": "398.62"
                      },
                      {
                        "date": "18-Oct-11",
                        "close": "422.24"
                      },
                      {
                        "date": "17-Oct-11",
                        "close": "419.99"
                      },
                      {
                        "date": "14-Oct-11",
                        "close": "422.00"
                      },
                      {
                        "date": "13-Oct-11",
                        "close": "408.43"
                      },
                      {
                        "date": "12-Oct-11",
                        "close": "402.19"
                      },
                      {
                        "date": "11-Oct-11",
                        "close": "400.29"
                      },
                      {
                        "date": "10-Oct-11",
                        "close": "388.81"
                      },
                      {
                        "date": "7-Oct-11",
                        "close": "369.80"
                      },
                      {
                        "date": "6-Oct-11",
                        "close": "377.37"
                      },
                      {
                        "date": "5-Oct-11",
                        "close": "378.25"
                      },
                      {
                        "date": "4-Oct-11",
                        "close": "372.50"
                      },
                      {
                        "date": "3-Oct-11",
                        "close": "374.60"
                      },
                      {
                        "date": "30-Sep-11",
                        "close": "381.32"
                      },
                      {
                        "date": "29-Sep-11",
                        "close": "390.57"
                      },
                      {
                        "date": "28-Sep-11",
                        "close": "397.01"
                      },
                      {
                        "date": "27-Sep-11",
                        "close": "399.26"
                      },
                      {
                        "date": "26-Sep-11",
                        "close": "403.17"
                      },
                      {
                        "date": "23-Sep-11",
                        "close": "404.30"
                      },
                      {
                        "date": "22-Sep-11",
                        "close": "401.82"
                      },
                      {
                        "date": "21-Sep-11",
                        "close": "412.14"
                      },
                      {
                        "date": "20-Sep-11",
                        "close": "413.45"
                      },
                      {
                        "date": "19-Sep-11",
                        "close": "411.63"
                      },
                      {
                        "date": "16-Sep-11",
                        "close": "400.50"
                      },
                      {
                        "date": "15-Sep-11",
                        "close": "392.96"
                      },
                      {
                        "date": "14-Sep-11",
                        "close": "389.30"
                      },
                      {
                        "date": "13-Sep-11",
                        "close": "384.62"
                      },
                      {
                        "date": "12-Sep-11",
                        "close": "379.94"
                      },
                      {
                        "date": "9-Sep-11",
                        "close": "377.48"
                      },
                      {
                        "date": "8-Sep-11",
                        "close": "384.14"
                      },
                      {
                        "date": "7-Sep-11",
                        "close": "383.93"
                      },
                      {
                        "date": "6-Sep-11",
                        "close": "379.74"
                      },
                      {
                        "date": "2-Sep-11",
                        "close": "374.05"
                      },
                      {
                        "date": "1-Sep-11",
                        "close": "381.03"
                      },
                      {
                        "date": "31-Aug-11",
                        "close": "384.83"
                      },
                      {
                        "date": "30-Aug-11",
                        "close": "389.99"
                      },
                      {
                        "date": "29-Aug-11",
                        "close": "389.97"
                      },
                      {
                        "date": "26-Aug-11",
                        "close": "383.58"
                      },
                      {
                        "date": "25-Aug-11",
                        "close": "373.72"
                      },
                      {
                        "date": "24-Aug-11",
                        "close": "376.18"
                      },
                      {
                        "date": "23-Aug-11",
                        "close": "373.60"
                      },
                      {
                        "date": "22-Aug-11",
                        "close": "356.44"
                      },
                      {
                        "date": "19-Aug-11",
                        "close": "356.03"
                      },
                      {
                        "date": "18-Aug-11",
                        "close": "366.05"
                      },
                      {
                        "date": "17-Aug-11",
                        "close": "380.44"
                      },
                      {
                        "date": "16-Aug-11",
                        "close": "380.48"
                      },
                      {
                        "date": "15-Aug-11",
                        "close": "383.41"
                      },
                      {
                        "date": "12-Aug-11",
                        "close": "376.99"
                      },
                      {
                        "date": "11-Aug-11",
                        "close": "373.70"
                      },
                      {
                        "date": "10-Aug-11",
                        "close": "363.69"
                      },
                      {
                        "date": "9-Aug-11",
                        "close": "374.01"
                      },
                      {
                        "date": "8-Aug-11",
                        "close": "353.21"
                      },
                      {
                        "date": "5-Aug-11",
                        "close": "373.62"
                      },
                      {
                        "date": "4-Aug-11",
                        "close": "377.37"
                      },
                      {
                        "date": "3-Aug-11",
                        "close": "392.57"
                      },
                      {
                        "date": "2-Aug-11",
                        "close": "388.91"
                      },
                      {
                        "date": "1-Aug-11",
                        "close": "396.75"
                      },
                      {
                        "date": "29-Jul-11",
                        "close": "390.48"
                      },
                      {
                        "date": "28-Jul-11",
                        "close": "391.82"
                      },
                      {
                        "date": "27-Jul-11",
                        "close": "392.59"
                      },
                      {
                        "date": "26-Jul-11",
                        "close": "403.41"
                      },
                      {
                        "date": "25-Jul-11",
                        "close": "398.50"
                      },
                      {
                        "date": "22-Jul-11",
                        "close": "393.30"
                      },
                      {
                        "date": "21-Jul-11",
                        "close": "387.29"
                      },
                      {
                        "date": "20-Jul-11",
                        "close": "386.90"
                      },
                      {
                        "date": "19-Jul-11",
                        "close": "376.85"
                      },
                      {
                        "date": "18-Jul-11",
                        "close": "373.80"
                      },
                      {
                        "date": "15-Jul-11",
                        "close": "364.92"
                      },
                      {
                        "date": "14-Jul-11",
                        "close": "357.77"
                      },
                      {
                        "date": "13-Jul-11",
                        "close": "358.02"
                      },
                      {
                        "date": "12-Jul-11",
                        "close": "353.75"
                      },
                      {
                        "date": "11-Jul-11",
                        "close": "354.00"
                      },
                      {
                        "date": "8-Jul-11",
                        "close": "359.71"
                      },
                      {
                        "date": "7-Jul-11",
                        "close": "357.20"
                      },
                      {
                        "date": "6-Jul-11",
                        "close": "351.76"
                      },
                      {
                        "date": "5-Jul-11",
                        "close": "349.43"
                      },
                      {
                        "date": "1-Jul-11",
                        "close": "343.26"
                      },
                      {
                        "date": "30-Jun-11",
                        "close": "335.67"
                      },
                      {
                        "date": "29-Jun-11",
                        "close": "334.04"
                      },
                      {
                        "date": "28-Jun-11",
                        "close": "335.26"
                      },
                      {
                        "date": "27-Jun-11",
                        "close": "332.04"
                      },
                      {
                        "date": "24-Jun-11",
                        "close": "326.35"
                      },
                      {
                        "date": "23-Jun-11",
                        "close": "331.23"
                      },
                      {
                        "date": "22-Jun-11",
                        "close": "322.61"
                      },
                      {
                        "date": "21-Jun-11",
                        "close": "325.30"
                      },
                      {
                        "date": "20-Jun-11",
                        "close": "315.32"
                      },
                      {
                        "date": "17-Jun-11",
                        "close": "320.26"
                      },
                      {
                        "date": "16-Jun-11",
                        "close": "325.16"
                      },
                      {
                        "date": "15-Jun-11",
                        "close": "326.75"
                      },
                      {
                        "date": "14-Jun-11",
                        "close": "332.44"
                      },
                      {
                        "date": "13-Jun-11",
                        "close": "326.60"
                      },
                      {
                        "date": "10-Jun-11",
                        "close": "325.90"
                      },
                      {
                        "date": "9-Jun-11",
                        "close": "331.49"
                      },
                      {
                        "date": "8-Jun-11",
                        "close": "332.24"
                      },
                      {
                        "date": "7-Jun-11",
                        "close": "332.04"
                      },
                      {
                        "date": "6-Jun-11",
                        "close": "338.04"
                      },
                      {
                        "date": "3-Jun-11",
                        "close": "343.44"
                      },
                      {
                        "date": "2-Jun-11",
                        "close": "346.10"
                      },
                      {
                        "date": "1-Jun-11",
                        "close": "345.51"
                      },
                      {
                        "date": "31-May-11",
                        "close": "347.83"
                      },
                      {
                        "date": "27-May-11",
                        "close": "337.41"
                      },
                      {
                        "date": "26-May-11",
                        "close": "335.00"
                      },
                      {
                        "date": "25-May-11",
                        "close": "336.78"
                      },
                      {
                        "date": "24-May-11",
                        "close": "332.19"
                      },
                      {
                        "date": "23-May-11",
                        "close": "334.40"
                      },
                      {
                        "date": "20-May-11",
                        "close": "335.22"
                      },
                      {
                        "date": "19-May-11",
                        "close": "340.53"
                      },
                      {
                        "date": "18-May-11",
                        "close": "339.87"
                      },
                      {
                        "date": "17-May-11",
                        "close": "336.14"
                      },
                      {
                        "date": "16-May-11",
                        "close": "333.30"
                      },
                      {
                        "date": "13-May-11",
                        "close": "340.50"
                      },
                      {
                        "date": "12-May-11",
                        "close": "346.57"
                      },
                      {
                        "date": "11-May-11",
                        "close": "347.23"
                      },
                      {
                        "date": "10-May-11",
                        "close": "349.45"
                      },
                      {
                        "date": "9-May-11",
                        "close": "347.60"
                      },
                      {
                        "date": "6-May-11",
                        "close": "346.66"
                      },
                      {
                        "date": "5-May-11",
                        "close": "346.75"
                      },
                      {
                        "date": "4-May-11",
                        "close": "349.57"
                      },
                      {
                        "date": "3-May-11",
                        "close": "348.20"
                      },
                      {
                        "date": "2-May-11",
                        "close": "346.28"
                      },
                      {
                        "date": "29-Apr-11",
                        "close": "350.13"
                      },
                      {
                        "date": "28-Apr-11",
                        "close": "346.75"
                      },
                      {
                        "date": "27-Apr-11",
                        "close": "350.15"
                      },
                      {
                        "date": "26-Apr-11",
                        "close": "350.42"
                      },
                      {
                        "date": "25-Apr-11",
                        "close": "353.01"
                      },
                      {
                        "date": "21-Apr-11",
                        "close": "350.70"
                      },
                      {
                        "date": "20-Apr-11",
                        "close": "342.41"
                      },
                      {
                        "date": "19-Apr-11",
                        "close": "337.86"
                      },
                      {
                        "date": "18-Apr-11",
                        "close": "331.85"
                      },
                      {
                        "date": "15-Apr-11",
                        "close": "327.46"
                      },
                      {
                        "date": "14-Apr-11",
                        "close": "332.42"
                      },
                      {
                        "date": "13-Apr-11",
                        "close": "336.13"
                      },
                      {
                        "date": "12-Apr-11",
                        "close": "332.40"
                      },
                      {
                        "date": "11-Apr-11",
                        "close": "330.80"
                      },
                      {
                        "date": "8-Apr-11",
                        "close": "335.06"
                      },
                      {
                        "date": "7-Apr-11",
                        "close": "338.08"
                      },
                      {
                        "date": "6-Apr-11",
                        "close": "338.04"
                      },
                      {
                        "date": "5-Apr-11",
                        "close": "338.89"
                      },
                      {
                        "date": "4-Apr-11",
                        "close": "341.19"
                      },
                      {
                        "date": "1-Apr-11",
                        "close": "344.56"
                      },
                      {
                        "date": "31-Mar-11",
                        "close": "348.51"
                      },
                      {
                        "date": "30-Mar-11",
                        "close": "348.63"
                      },
                      {
                        "date": "29-Mar-11",
                        "close": "350.96"
                      },
                      {
                        "date": "28-Mar-11",
                        "close": "350.44"
                      },
                      {
                        "date": "25-Mar-11",
                        "close": "351.54"
                      },
                      {
                        "date": "24-Mar-11",
                        "close": "344.97"
                      },
                      {
                        "date": "23-Mar-11",
                        "close": "339.19"
                      },
                      {
                        "date": "22-Mar-11",
                        "close": "341.20"
                      },
                      {
                        "date": "21-Mar-11",
                        "close": "339.30"
                      },
                      {
                        "date": "18-Mar-11",
                        "close": "330.67"
                      },
                      {
                        "date": "17-Mar-11",
                        "close": "334.64"
                      },
                      {
                        "date": "16-Mar-11",
                        "close": "330.01"
                      },
                      {
                        "date": "15-Mar-11",
                        "close": "345.43"
                      },
                      {
                        "date": "14-Mar-11",
                        "close": "353.56"
                      },
                      {
                        "date": "11-Mar-11",
                        "close": "351.99"
                      },
                      {
                        "date": "10-Mar-11",
                        "close": "346.67"
                      },
                      {
                        "date": "9-Mar-11",
                        "close": "352.47"
                      },
                      {
                        "date": "8-Mar-11",
                        "close": "355.76"
                      },
                      {
                        "date": "7-Mar-11",
                        "close": "355.36"
                      },
                      {
                        "date": "4-Mar-11",
                        "close": "360.00"
                      },
                      {
                        "date": "3-Mar-11",
                        "close": "359.56"
                      },
                      {
                        "date": "2-Mar-11",
                        "close": "352.12"
                      },
                      {
                        "date": "1-Mar-11",
                        "close": "349.31"
                      },
                      {
                        "date": "28-Feb-11",
                        "close": "353.21"
                      },
                      {
                        "date": "25-Feb-11",
                        "close": "348.16"
                      },
                      {
                        "date": "24-Feb-11",
                        "close": "342.88"
                      },
                      {
                        "date": "23-Feb-11",
                        "close": "342.62"
                      },
                      {
                        "date": "22-Feb-11",
                        "close": "338.61"
                      },
                      {
                        "date": "18-Feb-11",
                        "close": "350.56"
                      },
                      {
                        "date": "17-Feb-11",
                        "close": "358.30"
                      },
                      {
                        "date": "16-Feb-11",
                        "close": "363.13"
                      },
                      {
                        "date": "15-Feb-11",
                        "close": "359.90"
                      },
                      {
                        "date": "14-Feb-11",
                        "close": "359.18"
                      },
                      {
                        "date": "11-Feb-11",
                        "close": "356.85"
                      },
                      {
                        "date": "10-Feb-11",
                        "close": "354.54"
                      },
                      {
                        "date": "9-Feb-11",
                        "close": "358.16"
                      },
                      {
                        "date": "8-Feb-11",
                        "close": "355.20"
                      },
                      {
                        "date": "7-Feb-11",
                        "close": "351.88"
                      },
                      {
                        "date": "4-Feb-11",
                        "close": "346.50"
                      },
                      {
                        "date": "3-Feb-11",
                        "close": "343.44"
                      },
                      {
                        "date": "2-Feb-11",
                        "close": "344.32"
                      },
                      {
                        "date": "1-Feb-11",
                        "close": "345.03"
                      },
                      {
                        "date": "31-Jan-11",
                        "close": "339.32"
                      },
                      {
                        "date": "28-Jan-11",
                        "close": "336.10"
                      },
                      {
                        "date": "27-Jan-11",
                        "close": "343.21"
                      },
                      {
                        "date": "26-Jan-11",
                        "close": "343.85"
                      },
                      {
                        "date": "25-Jan-11",
                        "close": "341.40"
                      },
                      {
                        "date": "24-Jan-11",
                        "close": "337.45"
                      },
                      {
                        "date": "21-Jan-11",
                        "close": "326.72"
                      },
                      {
                        "date": "20-Jan-11",
                        "close": "332.68"
                      },
                      {
                        "date": "19-Jan-11",
                        "close": "338.84"
                      },
                      {
                        "date": "18-Jan-11",
                        "close": "340.65"
                      },
                      {
                        "date": "14-Jan-11",
                        "close": "348.48"
                      },
                      {
                        "date": "13-Jan-11",
                        "close": "345.68"
                      },
                      {
                        "date": "12-Jan-11",
                        "close": "344.42"
                      },
                      {
                        "date": "11-Jan-11",
                        "close": "341.64"
                      },
                      {
                        "date": "10-Jan-11",
                        "close": "342.46"
                      },
                      {
                        "date": "7-Jan-11",
                        "close": "336.12"
                      },
                      {
                        "date": "6-Jan-11",
                        "close": "333.73"
                      },
                      {
                        "date": "5-Jan-11",
                        "close": "334.00"
                      },
                      {
                        "date": "4-Jan-11",
                        "close": "331.29"
                      },
                      {
                        "date": "3-Jan-11",
                        "close": "329.57"
                      }
                    ]

            var Y_AXIS_LABEL = config.yAxisLabel;

            var X_DATA_PARSE = d3.time.format(config.xAxisTimeFormat).parse;

            var Y_DATA_PARSE = function(n) {return +n};

            var X_AXIS_COLUMN = config.xAxisData;

            var Y_AXIS_COLUMN = config.yAxisData;

            var margin = {
                top: 20,
                right: 20,
                bottom: 30,
                left: 50
            }, width = WIDTH - margin.left - margin.right, height = HEIGHT - margin.top - margin.bottom;

            var x = d3.time.scale().range([ 0, width ]);

            var y = d3.scale.linear().range([ height, 0 ]);

            var xAxis = d3.svg.axis().scale(x).orient("bottom");

            var yAxis = d3.svg.axis().scale(y).orient("left");

            var line = d3.svg.line().interpolate("linear").x(function(d) {
                return x(d.x_axis);
            }).y(function(d) {
                return y(d.y_axis);
            });

            var svg = d3.select("#canvas-svg").append("svg").attr("width", width + margin.left + margin.right).attr("height", height + margin.top + margin.bottom).append("g").attr("transform", "translate(" + margin.left + "," + margin.top + ")");

            var drawD3Document = function(data) {
                data.forEach(function(d) {
                    d.x_axis = X_DATA_PARSE(d[X_AXIS_COLUMN]);
                    d.y_axis = Y_DATA_PARSE(d[Y_AXIS_COLUMN]);
                });
                x.domain(d3.extent(data, function(d) {
                    return d.x_axis;
                }));
                y.domain(d3.extent(data, function(d) {
                    return d.y_axis;
                }));
                svg.append("g").attr("class", "x axis").attr("transform", "translate(0," + height + ")").call(xAxis);
                svg.append("g").attr("class", "y axis").call(yAxis).append("text").attr("transform", "rotate(-90)").attr("y", 6).attr("dy", ".71em").style("text-anchor", "end").text(Y_AXIS_LABEL);
                svg.append("path").datum(data).attr("class", "line").attr("d", line);
            };

            drawD3Document(data)
        }
    }
});