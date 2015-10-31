(function () {
    'use strict';

    angular.module('java2days.table')
        .controller('TableController',
        function ($scope, moduleProvider) {

            $scope.starter = moduleProvider.get('starter') === undefined ? false : moduleProvider.get('starter').available;
            $scope.meal = moduleProvider.get('meal') === undefined ? false : moduleProvider.get('meal').available;
            $scope.dessert = moduleProvider.get('dessert') === undefined ? false : moduleProvider.get('dessert').available;

        });

}());