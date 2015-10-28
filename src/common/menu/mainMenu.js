(function () {
    'use strict';
    angular.module('lgi.commons.menu', [])
        .config(function config(moduleProviderProvider) {
            var module = {
                'name': 'menu'
            };
            moduleProviderProvider.register(module);
        })
        .directive('menu', function () {
            return {
                restrict: 'EA',
                replace: false,
                templateUrl: 'general/menu/mainMenu.tpl.html',
                controller: function ($scope,
                                      $log,
                                      $rootScope,
                                      $state,
                                      $translate,
                                      SecurityService,
                                      $timeout,
                                      Messages,
                                      $rules,
                                      Mainmenu,
                                      dataModules,
                                      config,
                                      SiteCatalyst,
                                      logDebug,
                                      VersionFactory) {

                    $log.debug('Navigation Controller initialization');

                    $scope.deviceTypeIsAndroid = deviceTypeIsAndroid;

                    VersionFactory.getVersion().then(function (version) {
                        $scope.appVersion = version;
                    })

                    function onConfirm(buttonIndex) {
                        $scope.buttonDisabled = false;
                        if (buttonIndex === 2) {                         
                            dataModules.cancelAllServices();
                            dataModules.clearCache();
                            SecurityService.logout();
                        }
                    }

                    $scope.$parent.myScrollOptions = {
                        'menuList': {
                            probeType: 3,
                            tap: 'myTap'
                        }
                    };
                    
                    $scope.showLanguage = $rules.instant('Lanuguages.show');
                    $scope.buttonDisabled = false; 
                    $scope.logout = function () {  
                         if ($scope.buttonDisabled){
                            return false;
                        }
                        $scope.buttonDisabled = true;     
                           $log.debug('Logout pressed');
                           $translate([
                            'SignoutModal.confirmation',
                            'SignoutModal.confirmationTitle',
                            'SignoutModal.buttonTitles'
                        ]).then(proceed, proceed);

                        function proceed(translations) {
                          $timeout(function(){
                            Messages.confirm(
                                translations['SignoutModal.confirmationTitle'], // title
                                translations['SignoutModal.confirmation'], // message
                                onConfirm, // callback to invoke with index of button pressed
                                translations['SignoutModal.buttonTitles'] // buttonLabels                                            
                            );
                            return;                          
                           },300);                          
                        }
                    };
                    $scope.mainMenuItemsSorted = [];

                    Mainmenu.get().then(
                        function (response) {
                            sortItems(response.data);
                        },
                        function (error) {
                            logDebug('Error loading menu: ' + JSON.stringify(error));
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
                        for (var menuItem in $scope.mainMenuItemsSorted) {
                            if ($scope.mainMenuItemsSorted[menuItem].name === 'notifications') {
                                $scope.mainMenuItemsSorted[menuItem].showNumber = true;
                            }
                        }
                    }

                    $scope.openNoInformationAvailableProducts = function () {
                        Messages.alert('Products.noInfoTitle', // title
                            'Products.noInfoBody', // message
                            undefined,
                            'MyModal.close'
                        );
                    };

                    $scope.openNoInformationAvailableUsage = function () {
                        Messages.alert('Products.noInfoTitle', // title
                            'MobileUsage.noInfoBodyUsage', // message
                            undefined,
                            'MyModal.close'
                        );
                    };

                    var representation = $rules.instant('Contact.representation');
                    var contactUsUrl;

                    $scope.navigate = function (stateName, param) {
                        switch (stateName) {
                            case 'home.contact.options':
                                $state.go('home.contact.options');
                                /*
                                 if (representation === 'internal') {
                                 $state.go('home.contact.options');
                                 }
                                 if (representation === 'external') {
                                 if (config.getSelectedCountry() === 'IE') {
                                 $state.go('home.chat');
                                 } else {
                                 contactUsUrl = $translate.instant('Contact_Page.URL');
                                 $translate('Splash.back').then(function (value) {
                                 window.open(contactUsUrl, '_blank', 'location=yes,closebuttoncaption=' + value);
                                 });
                                 }
                                 }
                                 */
                                break;
                            case 'home.usage.myusage':
                                var parsedParam = JSON.parse(param);
                                if ($scope.status === 'CLOSED') {
                                    $scope.openNoInformationAvailableUsage();
                                }
                                $state.go('home.usage.myusage', parsedParam);
                                break;

                            case 'home.products':
                                if ($scope.status === 'CLOSED') {
                                    $scope.openNoInformationAvailableProducts();
                                }
                                $state.go('home.products');
                                break;

                            case 'logout':
                                $scope.logout();
                                break;

                            default :
                                $state.go(stateName);
                                break;

                        }


                        $rootScope.toggleMenu();
                    };
                }
            };

        });
}());