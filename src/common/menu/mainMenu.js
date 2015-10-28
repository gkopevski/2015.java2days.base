(function () {
    'use strict';
    angular.module('common.menu', [])
        .config(function config(moduleProviderProvider) {
            var module = {
                'name': 'menu'
            };
            moduleProviderProvider.register(module);
        }).factory('Mainmenu', function ($http) {
            return {
                get: function () {
                    var url = 'assets/bundles/mainMenuItems.json';
                    var promise = $http({method: 'GET', url: url, cache: true});
                    return promise;
                }
            };
        }).directive('menu', function () {
            return {
                restrict: 'EA',
                replace: false,
                templateUrl: 'menu/mainMenu.tpl.html',
                controller: function ($scope,
                                      $state,
                                      Mainmenu) {

                    $scope.mainMenuItemsSorted = [];

                    Mainmenu.get().then(
                        function (response) {
                            sortItems(response.data);
                        },
                        function (error) {
                            console.log(JSON.stringify(error));
                        });

                    function sortItems(menuItemList) {
                        $scope.mainMenuItemsSorted = menuItemList;
                    };

                    $scope.navigate = function (stateName, param) {
                        switch (stateName) {
                            default :
                                $state.go(stateName);
                                break;
                        }
                    };
                }
            };

        });
}());