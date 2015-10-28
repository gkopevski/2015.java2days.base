(function () {
    'use strict';

    //this variable is replaced with all necessary modules generated from grunt
    var moduleDependencies = JSON.parse('@@moduleDependencies');

    var java2days = angular.module('java2days', []);
    var modules = [
        'ui.router',
        'ngAnimate',
        'templates-app',
        'templates-common'
    ];
    for (var index = 0, module; module = modules[index]; index++) {
        angular.module('java2days').requires.push(module);
    }
    for (var j = 0, module; module = moduleDependencies[j]; j++) {
        angular.module('java2days').requires.push(module);
    };

    angular.module('java2days').config([
            '$urlRouterProvider',
            '$stateProvider',
            function ($urlRouterProvider) {
                $urlRouterProvider.otherwise('/table');
            }
        ]
    ).run(
        [function () {
        }]
    );

}());
