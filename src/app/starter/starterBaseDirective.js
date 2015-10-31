(function () {
    'use strict';
    angular.module('java2days.starter')
        .directive('starterLink', function () {
        return {
            restrict: 'EA',
            replace: false,
            scope: {
                status: '@'
            },
            controller: ['$scope', '$state', function ($scope, $state) {
                $scope.goTo = function (target) {
                    $state.go(target);
                };
                $scope.showLink = function () {
                    return true;
                };
                $scope.link ='StarterLink';
            }],
            templateUrl: 'starter/starterBase.tpl.html'
        };
    });
}());