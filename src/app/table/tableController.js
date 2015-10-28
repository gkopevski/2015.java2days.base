(function () {
    'use strict';

    angular.module('java2days.table')
        .controller('TableController',
        function ($scope,moduleProvider) {

            $scope.title = 'Title!';

            $scope.meal = moduleProvider.get('meal').available;

        });

}());