(function () {
    'use strict';

    angular.module('java2days.meal', []);

    angular.module('java2days.meal')
        .config(function config($stateProvider) {
            $stateProvider
                .state('meal', {
                    url: '/meal',
                    title: 'Meal',
                    templateUrl: 'app/meal/meal.tpl.html',
                    controller: 'MealController'
                });
        });
}());