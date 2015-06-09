// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
angular.module('starter', ['ionic', 'productControllers', 'productServices', 'angular-tour'])

.run(function($ionicPlatform) {
  $ionicPlatform.ready(function() {
    // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
    // for form inputs)
    if(window.cordova && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
    }
    if(window.StatusBar) {
      StatusBar.styleDefault();
    }
  });
})

.config(function($stateProvider, $urlRouterProvider, $ionicConfigProvider) {
    $ionicConfigProvider.tabs.position('top');
    $stateProvider
        .state('main', {
            url: '/main',
            templateUrl: 'view/main-page.html',
            controller: 'mainController'
        })
        .state('tab', {
            url: '/tab',
            //abstract: true,
            templateUrl: 'view/tabs.html',
            controller: 'tabController'
        })
        /***LAPTOP STATES***/
        .state('tab.laptopBrands', {
            url: '/laptopBrands',
            views: {
                'tab-laptop': {
                    templateUrl: 'view/brands.html',
                    controller: 'laptopBrandController'
                }
            }
        })
        .state('tab.laptopRates', {
            url: '/laptopRates',
            views: {
                'tab-laptop': {
                    templateUrl: 'view/rates.html',
                    controller: 'laptopRatesController'
                }
            }
        })
        .state('tab.laptopResults', {
            url: '/laptopResults',
            views: {
                'tab-laptop': {
                    templateUrl: 'view/results.html',
                    controller: 'laptopResultController'
                }
            }
        })
        .state('tab.laptopDetails', {
            url: '/laptopDetails',
            views: {
                'tab-laptop': {
                    templateUrl: 'view/details.html',
                    controller: 'detailController'
                }
            }
        })
        /***TABLET STATES***/
        .state('tab.tabletBrands', {
            url: '/tabletBrands',
            views: {
                'tab-tablet': {
                    templateUrl: 'view/brands.html',
                    controller: 'tabletBrandController'
                }
            }
        })
        .state('tab.tabletRates', {
            url: '/tabletRates',
            views: {
                'tab-tablet': {
                    templateUrl: 'view/rates.html',
                    controller: 'tabletRatesController'
                }
            }
        })
        .state('tab.tabletResults', {
            url: '/tabletResults',
            views: {
                'tab-tablet': {
                    templateUrl: 'view/results.html',
                    controller: 'tabletResultController'
                }
            }
        })
        .state('tab.tabletDetails', {
            url: '/tabletDetails',
            views: {
                'tab-tablet': {
                    templateUrl: 'view/details.html',
                    controller: 'detailController'
                }
            }
        })
        /***SMARTPHONE STATES***/
        .state('tab.smartphoneBrands', {
            url: '/smartphoneBrands',
            views: {
                'tab-smartphone': {
                    templateUrl: 'view/brands.html',
                    controller: 'smartphoneBrandController'
                }
            }
        })
        .state('tab.smartphoneRates', {
            url: '/smartphoneRates',
            views: {
                'tab-smartphone': {
                    templateUrl: 'view/rates.html',
                    controller: 'smartphoneRatesController'
                }
            }
        })
        .state('tab.smartphoneResults', {
            url: '/smartphoneResults',
            views: {
                'tab-smartphone': {
                    templateUrl: 'view/results.html',
                    controller: 'smartphoneResultController'
                }
            }
        })
        .state('tab.smartphoneDetails', {
            url: '/smartphoneDetails',
            views: {
                'tab-smartphone': {
                    templateUrl: 'view/details.html',
                    controller: 'detailController'
                }
            }
        });

        $urlRouterProvider.otherwise('main');
});
