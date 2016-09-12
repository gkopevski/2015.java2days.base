(function () {
    'use strict';
    angular.module('common.data', [])
        .config(function config(moduleProviderProvider) {
            var module = {
                'name': 'data'
            };
            moduleProviderProvider.register(module);
        }).service('Services', function ($http, SERVICE_ENDPOINT) {

        var generateURL = function (service) {
            return SERVICE_ENDPOINT + service;
        };

        this.get = function (service, params) {
            if (typeof params === 'undefined') {
                params = {};
            }
            var url = generateURL(service);
            return $http({method: 'GET', url: url, cache: true, params: params});
        };

        return this;

    });
}());