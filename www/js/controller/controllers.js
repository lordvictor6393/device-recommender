/**
 * Created by Victor on 30/04/2015.
 */
angular.module('productControllers', [])
.controller('mainController', function ($scope, dataService, $ionicActionSheet, $timeout, $ionicModal) {

    $scope.showOptions = function () {
        var hideOptions = $ionicActionSheet.show({
            buttons: [
                { text: labels[dataService.getLanguage()].changeLanguage },
                { text: labels[dataService.getLanguage()].changeTheme }
            ],
            titleText: '<div style="text-align=center;">Options</div>',
            cancelText: 'Cancel',
            buttonClicked: function (index) {
                console.log(index + 'button clicked');
                if(index === 0) $scope.optionModal.show();
                if(index === 1) $scope.themeModal.show();
            }
        });

        $timeout(function () {
            hideOptions();
        }, 2000);

    };

    $ionicModal.fromTemplateUrl('./view/options.html', {
        scope: $scope,
        animation: 'slide-in-up'
    }).then(function(modal) {
        $scope.optionModal = modal;
    });

    $ionicModal.fromTemplateUrl('./view/theme.html', {
        scope: $scope,
        animation: 'slide-in-up'
    }).then(function(modal) {
        $scope.themeModal = modal;
    });

    $scope.labels = labels[dataService.getLanguage()];
    $scope.language = dataService.getLanguage();
    $scope.changeLanguage = function (language) {
        console.log("language " + language);
        dataService.setLanguage(language);
        $scope.labels = labels[language];
        $scope.optionModal.hide();
    };
    $scope.closeOptModal = function () { $scope.optionModal.hide(); };

    $scope.mainClass = dataService.getClass();
    $scope.themes = [
        { value: 'positive', name: 'Positive' },
        { value: 'calm', name: 'Calm' },
        { value: 'balanced', name: 'Balanced' },
        { value: 'energized', name: 'Energized' },
        { value: 'assertive', name: 'Assertive' },
        { value: 'royal', name: 'Royal' },
        { value: 'dark', name: 'Dark' }
    ];
    $scope.theme = dataService.getTheme();
    $scope.changeTheme = function (theme) {
        var prev = dataService.getClass().bar;
        dataService.setClass(theme);
        $scope.mainClass = dataService.getClass();
        var cur = dataService.getClass().bar;
        $scope.themeModal.hide();
        window.location.reload();
    };
    $scope.closeThmModal = function () { $scope.themeModal.hide(); };
})
.controller('tabController', function($scope, $state, dataService, $ionicLoading, $timeout) {
    var cls = dataService.getClass();
    $scope.mainClass = cls;
    $scope.labels = labels[dataService.getLanguage()];
    $scope.label = ['Very Low', 'Low', 'Medium Low', 'Medium', 'Medium High', 'High', 'Very High'];
})
/********** LAPTOP CONTROLLERS **********/
.controller('laptopBrandController', function ($scope, $state, dataService) {
    $scope.mainClass = dataService.getClass();
    $scope.labels = labels[dataService.getLanguage()];

    var brands = {};
    var laptopsBrands = [];

    $scope.viewTitle = 'Brands';

    dataService.getLaptops()
        .then( function (response) {
            var data = response.data;
            for (var i = 0; i < data.length; i++) if(!brands[data[i].brand]) {
                brands[data[i].brand] = true;
                laptopsBrands.push(data[i].brand);
            }
            $scope.brandsList = laptopsBrands;
            $scope.brands = brands;
        });

    $scope.selectAll = function () {
        console.log('state: ' + $scope.checkAll);
        $scope.checkAll = true;
        for (var brand in brands) if(brands.hasOwnProperty(brand)) brands[brand] = true;
    };

    $scope.updateSelectAll = function () {
        var checked = 0;
        for (var brand in brands) if(brands.hasOwnProperty(brand)) checked += ($scope.brands[brand] ? 1 : 0);
        $scope.checkAll = (checked === $scope.brandsList.length);
    };

    $scope.saveBrands = function () {
        dataService.setBrands($scope.brands);
        $state.go('tab.laptopRates');
    };
})
.controller('laptopRatesController', function ($scope, $state, $ionicLoading, $timeout, dataService) {
    $scope.mainClass = dataService.getClass();
    $scope.labels = labels[dataService.getLanguage()];

    var rates = {};
    var userChoice = {};

    $scope.viewTitle = 'Laptops';
    $scope.actions = getActions(dataService.getLanguage()).laptops;

    for(var i = 0; i < $scope.actions.length; i++) rates[$scope.actions[i].id] = 4;
    $scope.rates = rates;

    var show = function() {
        $ionicLoading.show({
            template: '<div class="container">' +
            '<div class="cube">' +
            '<div class="side side1"></div>' +
            '<div class="side side2"></div>' +
            '<div class="side side3"></div>' +
            '<div class="side side4"></div>' +
            '<div class="side side5"></div>' +
            '<div class="side side6"></div>' +
            '</div>' +
            '</div>' +
            '<div style="text-align: center; margin: 150px auto 0px auto; font-size: 20px;">' + labels[dataService.getLanguage()].processing + '</div>',
            animation: 'fade-in',
            showBackdrop: true,
            maxWidth: 200
        });
    };

    $scope.process = function() {
        show();
        $scope.user = userChoice;
        var rateSource = $scope.rates;
        for(var userRate in rateSource) {
            if(rateSource.hasOwnProperty(userRate)) userChoice[userRate] = map[rateSource[userRate] - 1];
        }
        dataService.setUserRate(userChoice);
        //console.log(userChoice);
        $timeout(function () {
            $state.go('tab.laptopResults');
            $ionicLoading.hide();
        }, 3000);

    };
})
.controller('laptopResultController', function ($scope, $state, dataService) {
    $scope.mainClass = dataService.getClass();
    $scope.labels = labels[dataService.getLanguage()];

    var response = dataService.getLaptops();

    response.success(function (data) {
        var brands = dataService.getBrands();
        var userChoice = dataService.getUserRate();
        var compatibility = [];
        for(var i = 0; i < data.length; i++) {
            var brandSelected = false;
            for(var brand in brands) {
                if(brands.hasOwnProperty(brand) && data[i].brand === brand && brands[brand]) {
                    brandSelected = true;
                }
            }
            if(brandSelected) {
                var TFNs = decode(data[i], 'laptops');
                var deviceCapability = getDeviceCapability(TFNs, 'laptops');
                var result = 0;
                for(var attr in deviceCapability) {
                    result += getEFNC(deviceCapability[attr], userChoice[attr]);
                }
                compatibility.push({sku: data[i].sku, score: result, name: data[i].name, price: data[i].price, local: data[i]});
            }
        }
        compatibility.sort(function(a,b){return a.score - b.score});
        console.log(compatibility);
        $scope.deviceList = compatibility;
        $scope.showDetails = function(data) {
            dataService.setDeviceData(data);
            $state.go('tab.laptopDetails');
        };
    });
})
/********** TABLET CONTROLLERS **********/
.controller('tabletBrandController', function ($scope, $state, dataService) {
    $scope.mainClass = dataService.getClass();
    $scope.labels = labels[dataService.getLanguage()];

    var brands = {};
    var tabletsBrands = [];
    var checkAll = true;

    $scope.viewTitle = 'Brands';

    dataService.getTablets()
        .then( function (response) {
            var data = response.data;
            for (var i = 0; i < data.length; i++) if(!brands[data[i].brand]) {
                brands[data[i].brand] = true;
                tabletsBrands.push(data[i].brand);
            }
            $scope.brandsList = tabletsBrands;
            $scope.brands = brands;
        });

    $scope.checkAll = checkAll;

    $scope.selectAll = function () {
        $scope.checkAll = !checkAll;
        for (var brand in brands) if(brands.hasOwnProperty(brand)) brands[brand] = !checkAll;
        $scope.brands = brands;
        checkAll = !checkAll;
    };

    $scope.saveBrands = function () {
        dataService.setBrands($scope.brands);
        $state.go('tab.tabletRates');
    };
})
.controller('tabletRatesController', function ($scope, $state, $ionicLoading, $timeout, dataService) {
    $scope.mainClass = dataService.getClass();
    $scope.labels = labels[dataService.getLanguage()];

    var rates = {};
    var userChoice = {};

    $scope.viewTitle = 'Tablet';

    $scope.actions = getActions(dataService.getLanguage()).tablets;

    for(var i = 0; i < $scope.actions.length; i++) rates[$scope.actions[i].id] = 4;
    $scope.rates = rates;

    var show = function() {
        $ionicLoading.show({
            template: '<div class="container">' +
            '<div class="cube">' +
            '<div class="side side1"></div>' +
            '<div class="side side2"></div>' +
            '<div class="side side3"></div>' +
            '<div class="side side4"></div>' +
            '<div class="side side5"></div>' +
            '<div class="side side6"></div>' +
            '</div>' +
            '</div>' +
            '<div style="text-align: center; margin: 150px auto 0px auto; font-size: 20px;">' + labels[dataService.getLanguage()].processing + '</div>',
            animation: 'fade-in',
            showBackdrop: true,
            maxWidth: 200
        });
    };

    $scope.process = function() {
        show();
        $scope.user = userChoice;
        var rateSource = $scope.rates;
        for(var userRate in rateSource) {
            if(rateSource.hasOwnProperty(userRate)) userChoice[userRate] = map[rateSource[userRate] - 1];
        }
        dataService.setUserRate(userChoice);
        //console.log(userChoice);
        $timeout(function () {
            $state.go('tab.tabletResults');
            $ionicLoading.hide();
        }, 3000);

    };
})
.controller('tabletResultController', function ($scope, $state, dataService) {
    $scope.mainClass = dataService.getClass();
    $scope.labels = labels[dataService.getLanguage()];

    var response = dataService.getTablets();

    response.success(function (data) {
        var brands = dataService.getBrands();
        var userChoice = dataService.getUserRate();
        var compatibility = [];
        for(var i = 0; i < data.length; i++) {
            var brandSelected = false;
            for(var brand in brands) {
                if(brands.hasOwnProperty(brand) && data[i].brand === brand && brands[brand]) {
                    brandSelected = true;
                }
            }
            if(brandSelected) {
                var TFNs = decode(data[i], 'tablets');
                var deviceCapability = getDeviceCapability(TFNs, 'tablets');
                var result = 0;
                for (var attr in deviceCapability) {
                    result += getEFNC(deviceCapability[attr], userChoice[attr]);
                }
                compatibility.push({sku: data[i].sku, score: result, name: data[i].name, price: data[i].price, local: data[i]});
            }
        }
        compatibility.sort(function(a,b){return a.score - b.score});
        console.log(compatibility);
        $scope.deviceList = compatibility;
        $scope.showDetails = function(data) {
            dataService.setDeviceData(data);
            $state.go('tab.tabletDetails');
        };
    });
})
/********** SMARTPHONE CONTROLLERS **********/
.controller('smartphoneBrandController', function ($scope, $state, dataService) {
    $scope.mainClass = dataService.getClass();
    $scope.labels = labels[dataService.getLanguage()];

    var brands = {};
    var smartphonesBrands = [];
    var checkAll = true;

    $scope.viewTitle = 'Brands';

    dataService.getSmartPhones()
        .then( function (response) {
            var data = response.data;
            for (var i = 0; i < data.length; i++) if(!brands[data[i].brand]) {
                brands[data[i].brand] = true;
                smartphonesBrands.push(data[i].brand);
            }
            $scope.brandsList = smartphonesBrands;
            $scope.brands = brands;
        });

    $scope.checkAll = checkAll;

    $scope.selectAll = function () {
        $scope.checkAll = !checkAll;
        for (var brand in brands) if(brands.hasOwnProperty(brand)) brands[brand] = !checkAll;
        $scope.brands = brands;
        checkAll = !checkAll;
    };

    $scope.saveBrands = function () {
        dataService.setBrands($scope.brands);
        $state.go('tab.smartphoneRates');
    };
})
.controller('smartphoneRatesController', function ($scope, $state, $ionicLoading, $timeout, dataService) {
    $scope.mainClass = dataService.getClass();
    $scope.labels = labels[dataService.getLanguage()];

    var rates = {};
    var userChoice = {};

    $scope.viewTitle = 'Smart Phones';
    $scope.actions = getActions(dataService.getLanguage()).smartphones;

    for(var i = 0; i < $scope.actions.length; i++) rates[$scope.actions[i].id] = 4;
    $scope.rates = rates;

    var show = function() {
        $ionicLoading.show({
            template: '<div class="container">' +
            '<div class="cube">' +
            '<div class="side side1"></div>' +
            '<div class="side side2"></div>' +
            '<div class="side side3"></div>' +
            '<div class="side side4"></div>' +
            '<div class="side side5"></div>' +
            '<div class="side side6"></div>' +
            '</div>' +
            '</div>' +
            '<div style="text-align: center; margin: 150px auto 0 auto; font-size: 20px;">' + labels[dataService.getLanguage()].processing + '</div>',
            animation: 'fade-in',
            showBackdrop: true,
            maxWidth: 200
        });
    };

    $scope.process = function() {
        show();
        $scope.user = userChoice;
        var rateSource = $scope.rates;
        for(var userRate in rateSource) {
            if(rateSource.hasOwnProperty(userRate)) userChoice[userRate] = map[rateSource[userRate] - 1];
        }
        dataService.setUserRate(userChoice);
        //console.log(userChoice);
        $timeout(function () {
            $state.go('tab.smartphoneResults');
            $ionicLoading.hide();
        }, 3000);

    };
})
.controller('smartphoneResultController', function ($scope, $state, dataService) {
    $scope.mainClass = dataService.getClass();
    $scope.labels = labels[dataService.getLanguage()];

    var response = dataService.getSmartPhones();

    response.success(function (data) {
        var brands = dataService.getBrands();
        var userChoice = dataService.getUserRate();
        var compatibility = [];
        for(var i = 0; i < data.length; i++) {
            var brandSelected = false;
            for(var brand in brands) {
                if(brands.hasOwnProperty(brand) && data[i].brand === brand && brands[brand]) {
                    brandSelected = true;
                }
            }
            if(brandSelected) {
                var TFNs = decode(data[i], 'smartphones');
                var deviceCapability = getDeviceCapability(TFNs, 'smartphones');
                var result = 0;
                for (var attr in deviceCapability) {
                    result += getEFNC(deviceCapability[attr], userChoice[attr]);
                }
                compatibility.push({sku: data[i].sku, score: result, name: data[i].name, price: data[i].price, local: data[i]});
            }
        }
        compatibility.sort(function(a,b){return a.score - b.score});
        console.log(compatibility);
        $scope.deviceList = compatibility;
        $scope.showDetails = function(data) {
            dataService.setDeviceData(data);
            $state.go('tab.smartphoneDetails');
        };
    });
})

.controller('detailController', function($scope, dataService) {
    $scope.mainClass = dataService.getClass();
    $scope.labels = labels[dataService.getLanguage()];

    var data = dataService.getDeviceData();
    var details = dataService.getDetails(data.sku);

    $scope.viewTitle = 'Details';

    details.success(function(response1) {
        response1.products[0].realName = data.name;
        response1.products[0].local = data.local;
        $scope.deviceDetails = response1.products[0];
        console.log(response1.products[0]);
    });
});