window.app.controller("CartController", ["$scope", "$location", "CartService", "LoginService", "localStorageService", function ($scope, $location, cartService, loginService, localStorageService) {

    $scope.cart = [];


    var cart = localStorageService.get("cart");
    if (!cart) {
        localStorageService.set("cart", $scope.cart);
    } else {
        $scope.cart = cart;
    }

    $scope.handleInit = function () {
        loginService.isAuth().then(function (response) {
            $scope.auth = response.data;
        });
    }

    $scope.back = function () {
        window.history.back();
    }

    $scope.handleRemove = function (product) {
        if ($scope.cart && $scope.cart.length) {
            var itemToUpdate = $scope.cart.find(function (item) {
                return item.Id === product.Id;
            });
            if (itemToUpdate) {
                if (itemToUpdate.Quantity - 1 === 0) {
                    $scope.cart = $scope.cart.filter(function (item) {
                        return item.Id !== product.Id;
                    });
                } else {
                    itemToUpdate.Quantity -= 1;
                }

                localStorageService.set("cart", $scope.cart);
            }
        }
    }

    $scope.getTotal = function () {
        if (!$scope.cart || !$scope.cart.length) {
            return 0;
        }
        var subTotals = _.map($scope.cart, function (item) {
            item.SubTotal = item.UnitPrice * item.Quantity;
            return item.SubTotal;
        });

        return _.reduce(subTotals, function (m, n) {
            return m + n;
        });
    };

}]);