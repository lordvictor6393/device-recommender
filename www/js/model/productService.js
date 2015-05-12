/**
 * Created by Victor on 30/04/2015.
 */
angular.module('productServices', [])
.factory('dataService', function($http) {
    var deviceType = '';
    var userChoice = [];
    var deviceData = '';
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
        },

        setDevType: function (newDeviceType) {
            deviceType = newDeviceType;
        },
        getDevType: function () {
            return deviceType;
        },

        setUserRate: function (userRates) {
            userChoice = userRates;
        },
        getUserRate: function () {
            return userChoice;
        },

        setDeviceData: function(data) {
            deviceData = data;
        },
        getDeviceData: function() {
            return deviceData;
        }
    }
});