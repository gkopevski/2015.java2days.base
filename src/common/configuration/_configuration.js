(function () {
    'use strict';

    angular.module('common.configuration', []);

    angular.module('common.configuration')
        .provider('moduleProvider', function moduleProviderProvider() {
            this.modules = [];

            this.register = function (module) {
                this.modules.push(module);
            };

            this.$get = function () {
                var that = this;
                return {
                    'get': function (moduleName) {
                        for (var i = 0; i < that.modules.length; i++) {
                            if (that.modules[i].name === moduleName) {
                                return that.modules[i];
                            }
                        }
                    },
                    'getAll': function () {
                        return that.modules;
                    },
                    'set': function (module) {
                        for (var i = 0; i < that.modules.length; i++) {
                            if (that.modules[i].name === module.name) {
                                that.modules[i] = module;
                                return;
                            }
                        }
                    }
                };
            };
        });

}());