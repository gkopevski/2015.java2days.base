(function () {
    'use strict';

    angular.module('java2days.table')
        .controller('TableController',
        function ($scope,moduleProvider) {

            $scope.starter = moduleProvider.get('starter').available;
            $scope.meal = moduleProvider.get('meal').available;
            $scope.dessert = moduleProvider.get('dessert').available;

        });

}());