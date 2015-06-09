/**
 * Created by Victor on 30/04/2015.
 */
angular.module('productServices', [])
.factory('dataService', function($http) {
    var userChoice = [];
    var deviceData = '';
    var brands = {};
    return {
        setLanguage: function (newLanguage) {
            window.localStorage['language'] = newLanguage;
        },
        getLanguage: function () {
            return window.localStorage['language'] || 'english';
        },

        setClass: function (newClass) {
            window.localStorage['appTheme'] = newClass;
        },
        getTheme: function () {
            return window.localStorage['appTheme'] || 'calm';
        },
        getClass: function() {
            var cls = window.localStorage['appTheme'] || 'calm';
            return {
                checkbox: 'checkbox-' + cls,
                button: 'button-' + cls,
                tab: 'tabs-' + cls,
                bar: 'bar-' + cls,
                range: 'range-' + cls
            };
        },

        setBrands: function (brandsConfig) {
            brands = brandsConfig;
        },
        getBrands: function () {
            return brands;
        },

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