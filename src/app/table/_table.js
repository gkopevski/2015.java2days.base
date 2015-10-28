(function () {
    'use strict';

    angular.module('java2days.table', []);


    angular.module('java2days.table')
        .config(function ($stateProvider, moduleProviderProvider) {
            $stateProvider
                .state('table', {
                    url: '/table',
                    title: 'Table',
                    views: {
                        'content': {
                            templateUrl: 'table/table.tpl.html',
                            controller: 'TableController'
                        }
                    }
                });

            var module = {
                'name': 'table'
            };
            moduleProviderProvider.register(module);
        });
}());