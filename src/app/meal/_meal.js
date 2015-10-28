(function () {
    'use strict';

    angular.module('java2days.meal', []);

    angular.module('java2days.meal')
        .config(function config($stateProvider,moduleProviderProvider) {
            $stateProvider
                .state('meal', {
                    url: '/meal',
                    title: 'Meal',
                    views: {
                        'content': {
                            templateUrl: 'meal/meal.tpl.html',
                            controller: 'MealController'
                        }
                    }
                });

            var module = {
                'name': 'meal',
                'available':true
            };
            moduleProviderProvider.register(module);
        });
}());