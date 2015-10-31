(function () {
    'use strict';

    angular.module('java2days.starter', []);

    angular.module('java2days.starter')
        .config(function config($stateProvider,moduleProviderProvider) {
            $stateProvider
                .state('starter', {
                    url: '/starter',
                    title: 'Starter',
                    views: {
                        'content': {
                            templateUrl: 'starter/starter.tpl.html',
                            controller: 'StarterController'
                        }
                    }
                });

            var module = {
                'name': 'starter',
                'available':true
            };
            moduleProviderProvider.register(module);
        });
}());