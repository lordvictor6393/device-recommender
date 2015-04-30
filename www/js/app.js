// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
angular.module('starter', ['ionic'])

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
            templateUrl: 'view/main-page.html'
        })
        .state('tab', {
            url: '/tab',
            abstract: true,
            templateUrl: 'view/tabs.html'
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
            templateUrl: 'view/resultList.html'
        })
        .state('deviceDetails', {
            url: '/deviceDetails',
            templateUrl: 'view/deviceDetails.html'
        });

        $urlRouterProvider.otherwise('main');
})

.factory('dataService', function($http) {
        var data1;
        return {
            getDetails: function(sku) {
                return $http.get("http://api.remix.bestbuy.com/v1/products(sku=" + sku + ")?apiKey=bnzyqjavujrnqzqbrqbe43na&format=json");
            },
            getLaptops: function() {
                return $http.get('data/laptops.json');
            },
            getTablets: function () {
                return $http.get('data/tablets.json');
            },
            getSmartPhones: function () {
                return $http.get('data/smartphones.json');
            }
        }
    })
.controller('mainController', function($scope, $state, dataService, $ionicPopup, $timeout) {
    $scope.mainClass = 'bar-calm';
    $scope.actions = action;
    $scope.rateSmartphones = {};
    $scope.rateTablets = {};
    $scope.rateLaptops = {};
    $scope.label = ['Very Low', 'Low', 'Medium Low', 'Medium', 'Medium High', 'High', 'Very High'];

        var deviceType = '';

        var map = [
            { n1:0, n2:1, n3:2 }, // Very Low 	(VL)
            { n1:1, n2:2, n3:3 }, // Low		(L)
            { n1:2, n2:3, n3:4 }, // Medium Low	(ML)
            { n1:3, n2:4, n3:5 }, // Medium		(M)
            { n1:4, n2:5, n3:6 }, // Medium High(MH)
            { n1:5, n2:6, n3:7 }, // High		(H)
            { n1:6, n2:7, n3:8 }  // Very High  (VH)
        ];

        //console.log('ready');
    $scope.setDeviceType = function(newDevType) {
        deviceType = newDevType;
        $scope.rateLaptops = $scope.rateSmartphones = $scope.rateTablets = {};
    };

    $scope.showAlert = function() {
        var alertPopup = $ionicPopup.alert({
            title: 'Don\'t eat that!',
            template: 'It might taste good'
        });
        alertPopup.then(function(res) {
            console.log('Thank you for not eating my delicious ice cream cone');
        });
    };

    $scope.process = function() {
        var userChoice = {};
        $scope.user = userChoice;
        var rateSource;
        if(deviceType === 'smartphones') rateSource = $scope.rateSmartphones;
        else if(deviceType === 'tablets') rateSource = $scope.rateTablets;
        else rateSource = $scope.rateLaptops;
        var missed = [];
        /*for(var userRate1 in rateSource) {

            while(true)
        }*/
        for(var userRate in rateSource) {
            userChoice[userRate] = map[rateSource[userRate] - 1];
        }
        //console.log(userChoice);
        var response;
        if(deviceType === 'smartphones') response = dataService.getSmartPhones();
        else if(deviceType === 'tablets') response = dataService.getTablets();
        else response = dataService.getLaptops();

        //console.log(response);
        response.success(function (data) {
            var ans = [];
            var compatibility = [];
            for(var i = 0; i < data.length; i++) {
                var TFNs = decode(data[i], deviceType);
                //console.log(TFNs);
                var deviceCapability = getDeviceCapability(TFNs, deviceType);
                //console.log(deviceCapability);

                var result = 0;
                for(var attr in deviceCapability) {
                    result += getEFNC(deviceCapability[attr], userChoice[attr]);
                    //console.log('partial: ' + result);
                }
                //console.log(result);
                compatibility.push({sku: data[i].sku, score: result, name: data[i].name, price: data[i].price});
            }
            compatibility.sort(function(a,b){return a.score - b.score});
            console.log(compatibility);
            $scope.deviceList = compatibility;
            $state.go('resultList');
        });
    };

    $scope.showDetails = function (data) {
        var details = dataService.getDetails(data.sku);
        details.success(function(response1) {
            response1.products[0].realName = data.name;
            $scope.deviceDetails = response1.products[0];
            console.log(response1.products[0]);
            $state.go('deviceDetails');
        });
    };
});
