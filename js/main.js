;(function() {
    'use strict';

    angular.module('application', [])
        .controller('appCtrl', function($scope) {
            $scope.model = [
                {id: '1', 'country': 'Jordan',      'sales': 90000,   color: '#FF9736', selected: true},
                {id: '2', 'country': 'Lebanon',     'sales': 150000,  color: '#AF13F1', selected: true},
                {id: '3', 'country': 'Iran',        'sales': 190000,  color: '#7CE343', selected: true},
                {id: '4', 'country': 'Oman',        'sales': 134000,  color: '#397EBD', selected: true},
                {id: '5', 'country': 'Saudi Arabia','sales': 780000,  color: '#F94D18', selected: true},
                {id: '6', 'country': 'UAE',         'sales':  850000, color: '#FFE336', selected: true},
                {id: '7', 'country': 'Tunisia',     'sales': 320000,  color: '#8A8A8A', selected: true},

                {id: '8', 'country': 'Kuwait',        'sales': 540000,  color: '#34495e', selected: false},
                {id: '9', 'country': 'Iraq',        'sales':  954000, color: '#ecf0f1', selected: false},
                {id: '10', 'country': 'Bahrain',     'sales': 436500,  color: '#27ae60', selected: false}
            ];
        })


})();



