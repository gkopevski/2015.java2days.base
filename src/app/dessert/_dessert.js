(function () {
    'use strict';

    angular.module('java2days.dessert', []);

    angular.module('java2days.dessert')
        .config(function config($stateProvider,moduleProviderProvider) {
            $stateProvider
                .state('dessert', {
                    url: '/dessert',
                    title: 'Dessert',
                    views: {
                        'content': {
                            templateUrl: 'dessert/dessert.tpl.html',
                            controller: 'DessertController'
                        }
                    }
                });

            var module = {
                'name': 'dessert',
                'available':true
            };
            moduleProviderProvider.register(module);
        });
}());