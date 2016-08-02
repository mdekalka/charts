(function() {
    angular.module('application').service('dataSvc', function() {
        var parseTime = d3.time.format("%Y-%m-%d").parse;

        var data = [
            {date: parseTime('2004-01-01'),'Jordan':63.4, 'Lebanon': 62.7, 'Oman': 77.5, 'Iran': 72.2, 'Saudi Arabia': 71.0, 'UAE': 33.8, 'Tunisia': 36.9, 'Kuwait': 51.9, 'Iraq': 80.3, 'Bahrain': 80.2},
            {date: parseTime('2005-01-01'),'Jordan':58.0, 'Lebanon': 59.9, 'Oman': 81.9, 'Iran': 67.7, 'Saudi Arabia': 55.1, 'UAE': 48.8, 'Tunisia': 52.3, 'Kuwait': 53.5, 'Iraq': 54.7, 'Bahrain': 53.3},
            {date: parseTime('2006-01-01'),'Jordan':62.7, 'Lebanon': 59.1, 'Oman': 61.9, 'Iran': 34.6, 'Saudi Arabia': 46.8, 'UAE': 48.6, 'Tunisia': 44.9, 'Kuwait': 77.0, 'Iraq': 81.1, 'Bahrain': 78.5},
            {date: parseTime('2007-01-01'),'Jordan':41.1, 'Lebanon': 41.6, 'Oman': 82.2, 'Iran': 68.0, 'Saudi Arabia': 54.0, 'UAE': 56.3, 'Tunisia': 38.5, 'Kuwait': 64.5, 'Iraq':66.7 , 'Bahrain': 55.4},
            {date: parseTime('2008-01-01'),'Jordan':64.2, 'Lebanon': 65.1, 'Oman': 52.7, 'Iran': 72.4, 'Saudi Arabia': 62.0, 'UAE': 49.3, 'Tunisia': 48.8, 'Kuwait': 54.7, 'Iraq': 72.6, 'Bahrain':55.4 },
            {date: parseTime('2009-01-01'),'Jordan':45.3, 'Lebanon': 35.1, 'Oman': 77.0, 'Iran': 43.1, 'Saudi Arabia': 49.6, 'UAE': 45.8, 'Tunisia': 55.0, 'Kuwait': 80.6, 'Iraq': 80.2, 'Bahrain':55.8 },
            {date: parseTime('2010-01-01'),'Jordan':34.1, 'Lebanon': 53.2, 'Oman': 54.5, 'Iran': 34.4, 'Saudi Arabia': 52.7, 'UAE': 47.2, 'Tunisia': 45.3, 'Kuwait': 72.6, 'Iraq': 77.4, 'Bahrain': 52.1},
            {date: parseTime('2011-01-01'),'Jordan':45.1, 'Lebanon': 52.3, 'Oman': 78.9, 'Iran': 52.4, 'Saudi Arabia': 43.2, 'UAE': 55.9, 'Tunisia': 51.1, 'Kuwait': 60.0, 'Iraq':  57.5, 'Bahrain': 68.7},
            {date: parseTime('2012-01-01'),'Jordan':53.1, 'Lebanon': 52.1, 'Oman': 83.9, 'Iran': 23.4, 'Saudi Arabia': 56.8, 'UAE': 61.2, 'Tunisia': 47.7, 'Kuwait': 82.9, 'Iraq': 77.4, 'Bahrain': 67.7},
            ]
            data.columns = ["date", "Jordan", "Lebanon", "Oman", "Iran", "Saudi Arabia", "UAE", "Tunisia", "Kuwait", "Iraq", "Bahrain"]
            data.colors = {
                        "Jordan": '#FF9736',
                        "Lebanon": '#1abc9c',
                        "Oman": '#AF13F1',
                        "Iran": '#7CE343',
                        'Saudi Arabia': '#397EBD',
                        'UAE': '#F94D18',
                        'Tunisia': '#FFE336',
                        'Kuwait': '#34495e',
                        'Iraq': '#ecf0f1',
                        'Bahrain': '#27ae60'
                    }
        this.getData = function() { return data; }
    })
})();