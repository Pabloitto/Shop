window.app.controller("HomeController", ["$scope", "$location", "LoginService", "ProductsService", function ($scope, $location, loginService,productsService) {

    var MAX_RECORDS = 8;

    $scope.products = [];
    $scope.tabOptions = {
        defaultView: "home"
    }

    $scope.handleSeeDetails = function (productId) {
        $location.url('/products/details/' + productId);
    }


    $scope.handleInit = function () {
        loginService.isAuth().then(function (response) {
            $scope.auth = response.data;
            if ($scope.auth) {
                productsService.fetchProducts()
                   .then(onProductsLoad);
            }
        });
    }

    function onProductsLoad(response) {
        $scope.products = response.data.splice(0, MAX_RECORDS).map(function (item) {
            item.Photo = window.app.root + 'Content/app/' + item.Photo;
            item.CompanyPhoto = window.app.root + 'Content/app/' + item.CompanyPhoto;
            return item;
        });
    }

}]);