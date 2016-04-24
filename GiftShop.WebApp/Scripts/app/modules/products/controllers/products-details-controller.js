window.app.controller("ProductDetailsController", ["$scope", "$location", "$routeParams", "LoginService", "ProductsService", "localStorageService", function ($scope, $location, $routeParams, loginService, productsService, localStorageService) {

    $scope.productModel = {};

    $scope.cart = [];

    $scope.data = {
        quantity: 1
    };

    $scope.handleAddToCart = function () {
        var newItem = { Id: $scope.productModel.ProductId, Name: $scope.productModel.Name, Quantity: 1, UnitPrice: $scope.productModel.Price };
        $scope.cart = localStorageService.get("cart");
        if (!$scope.cart) {
            $scope.cart = [];
            $scope.cart.push(newItem);
        } else {
            var existItem = $scope.cart.find(function (item) {
                return item.Id === $scope.productModel.ProductId;
            });
            if (existItem) {
                existItem.Quantity += $scope.data.quantity;
            } else {
                $scope.cart.push(newItem);
            }
        }
        localStorageService.set("cart", $scope.cart);
        $location.url("/products");
    }

    $scope.handleInit = function () {
        loginService.isAuth().then(function (response) {
            $scope.auth = response.data;
            if ($scope.auth) {
                if ($routeParams && $routeParams.id) {
                    productsService.fetchProductById({
                        productId: $routeParams.id
                    }).then(onProductIsLoad);
                }
            }
        });
    };

    $scope.back = function () {
        window.history.back();
    }

    function onProductIsLoad(response) {
        $scope.productModel = response.data;
        $scope.productModel.Photo = window.app.root + 'Content/app/' + $scope.productModel.Photo;
        $scope.productModel.CompanyPhoto = window.app.root + 'Content/app/' + $scope.productModel.CompanyPhoto;
    }


}]);