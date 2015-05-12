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

.config(function($stateProvider, $urlRouterProvider) {
    $stateProvider
        .state('main', {
            url: '/main',
            templateUrl: 'view/main-page.html'//,
            //controller: 'mainController'
        })
        .state('tab', {
            url: '/tab',
            abstract: true,
            templateUrl: 'view/tabs.html',
            controller: 'tabController'
        })
        .state('tab.laptop', {
            url: '/laptop',
            views: {
                'tab-laptop': {
                    templateUrl: 'view/tab-laptop.html'//,
                    //controller: 'LaptopCtrl'
                }
            }
        })
        .state('tab.tablet', {
            url: '/tablet',
            views: {
                'tab-tablet': {
                    templateUrl: 'view/tab-tablet.html'//,
                    //controller: 'TabletCtrl'
                }
            }
        })
        .state('tab.smartPhone', {
            url: '/smartPhone',
            views: {
                'tab-smartPhone': {
                    templateUrl: 'view/tab-smartPhone.html'//,
                    //controller: 'SmartPhoneCtrl'
                }
            }
        })
        .state('resultList', {
            url: '/resultList',
            templateUrl: 'view/resultList.html',
            controller: 'resultController'
        })
        .state('deviceDetails', {
            url: '/deviceDetails',
            templateUrl: 'view/deviceDetails.html',
            controller: 'detailController'
        });

        $urlRouterProvider.otherwise('main');
});
