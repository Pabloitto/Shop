window.app.controller("ProductsCatalogController", ["$scope", "$location", "$routeParams", "LoginService", "ProductsService", function ($scope, $location, $routeParams, loginService, productsService) {

    $scope.categories = [];

    $scope.productModel = {};

    $scope.fileUploaderPhotoOptions = {
        action: '/Products/UploadFile',
        onUpload: function (response) {
            $scope.productModel.Photo = response;
        }
    };

    $scope.fileUploaderCompanyPhotoOptions = {
        action: '/Products/UploadFile',
        onUpload: function (response) {
            $scope.productModel.CompanyPhoto = response;
        }
    };

    $scope.handleInit = function () {
        loginService.isAuth().then(function (response) {
            $scope.auth = response.data;
            if ($scope.auth) {
                if ($routeParams && $routeParams.id) {
                    productsService.fetchProductById({
                        productId: $routeParams.id
                    }).then(onProductIsLoad);
                }

                productsService.fetchCategories()
                               .then(onCategoriesLoad);
            }
        });
    };

    $scope.handleSave = function () {
        productsService.saveProduct($scope.productModel).then(onSave);
    };

    $scope.handleCancel = clean;

    $scope.handleReturn = function () {
        clean();
        $location.url('/products');
    };

    function onSave(response) {
        var success = response.data;
        alert(success);
        clean();
    }

    function onCategoriesLoad(response) {
        $scope.categories = response.data;
    }

    function onProductIsLoad(response) {
        $scope.productModel = response.data;
        $scope.fileUploaderPhotoOptions.loadFile($scope.productModel.Photo);
        $scope.fileUploaderCompanyPhotoOptions.loadFile($scope.productModel.CompanyPhoto);
    }

    function clean() {
        $scope.productModel = {};
        $scope.$broadcast("clean");
    }


}]);