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
                templateUrl: 'general/menu/mainMenu.tpl.html',
                controller: function ($scope,
                                      $state,
                                      Mainmenu) {


                    $scope.mainMenuItemsSorted = [];

                    Mainmenu.get().then(
                        function (response) {
                            sortItems(response.data);
                        },
                        function (error) {
                        });

                    function sortItems(menuItemList) {
                        var sortedOrder = $rules.instant('Main_menu.order').split(',');
                        var menuItemIndex;
                        var index;
                        for (index in sortedOrder) {
                            for (menuItemIndex in menuItemList) {
                                if (menuItemList[menuItemIndex].name === sortedOrder[index]) {
                                    $scope.mainMenuItemsSorted.push(menuItemList[menuItemIndex]);
                                    break;
                                }
                            }
                        }
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