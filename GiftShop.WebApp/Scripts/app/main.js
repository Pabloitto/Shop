window.app = function () {
    var module = angular.module('GiftShop', ['ngRoute', 'LocalStorageModule']);

    module.config(function ($routeProvider, localStorageServiceProvider) {

        localStorageServiceProvider.setPrefix('GiftShop');

        localStorageServiceProvider.setStorageType('localStorage');

        $routeProvider
            .when('/login', {
                templateUrl: '/Scripts/app/modules/login/views/login.html',
                controller: 'LoginController'
            })
            .when('/home', {
                templateUrl: '/Scripts/app/modules/home/views/home.html',
                controller: 'HomeController'
            })
            .when('/products', {
                templateUrl: '/Scripts/app/modules/products/views/products-list.html',
                controller: 'ProductsController'
            })
            .when('/products/add', {
                templateUrl: '/Scripts/app/modules/products/views/products.html',
                controller: 'ProductsCatalogController'
            })
            .when('/products/add/:id', {
                templateUrl: '/Scripts/app/modules/products/views/products.html',
                controller: 'ProductsCatalogController'
            })
            .when('/products/details/:id', {
                templateUrl: '/Scripts/app/modules/products/views/products-detail.html',
                controller: 'ProductDetailsController'
            })
            .when('/cart', {
                templateUrl: '/Scripts/app/modules/cart/views/add-cart.html',
                controller: 'CartController'
            })
            .when('/account', {
                 templateUrl: '/Scripts/app/modules/account/views/add-account.html',
                 controller: 'AccountController'
             })
            .otherwise({
                redirectTo: '/login'
            });
    });

    return module;
}();
