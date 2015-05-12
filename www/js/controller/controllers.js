/**
 * Created by Victor on 30/04/2015.
 */
angular.module('productControllers', [])
.controller('tabController', function($scope, $state, dataService, $ionicPopup, $timeout) {
    $scope.mainClass = 'bar-calm';
    $scope.actions = action;
    $scope.rateSmartphones = {};
    $scope.rateTablets = {};
    $scope.rateLaptops = {};
    $scope.label = ['Very Low', 'Low', 'Medium Low', 'Medium', 'Medium High', 'High', 'Very High'];

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
        dataService.setDevType(newDevType);
        $scope.rateLaptops = $scope.rateSmartphones = $scope.rateTablets = {};
    };

    /*$scope.showAlert = function() {
        var alertPopup = $ionicPopup.alert({
            title: 'Don\'t eat that!',
            template: 'It might taste good'
        });
        alertPopup.then(function(res) {
            console.log('Thank you for not eating my delicious ice cream cone');
        });
    };*/

    $scope.process = function() {
        var userChoice = {};
        $scope.user = userChoice;
        var rateSource;
        var deviceType = dataService.getDevType();
        if(deviceType === 'smartphones') rateSource = $scope.rateSmartphones;
        else if(deviceType === 'tablets') rateSource = $scope.rateTablets;
        else rateSource = $scope.rateLaptops;
        for(var userRate in rateSource) {
            userChoice[userRate] = map[rateSource[userRate] - 1];
        }
        dataService.setUserRate(userChoice);
        //console.log(userChoice);
        $state.go('resultList');
    };
})

.controller('resultController', function($scope, $state, dataService) {
    var response;
    var deviceType = dataService.getDevType();
    var userChoice = dataService.getUserRate();
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
        $scope.showDetails = function(data) {
            dataService.setDeviceData(data);
            $state.go('deviceDetails');

        };
    });
})

.controller('detailController', function($scope, dataService) {
    var data = dataService.getDeviceData();
    var details = dataService.getDetails(data.sku);
    details.success(function(response1) {
        response1.products[0].realName = data.name;
        $scope.deviceDetails = response1.products[0];
        console.log(response1.products[0]);
    });
});