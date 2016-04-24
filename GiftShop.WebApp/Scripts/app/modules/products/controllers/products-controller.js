window.app.controller("ProductsController", ["$scope", "$location", "ProductsService", "LoginService", function ($scope, $location, productsService, loginService) {

    var data = [];

    $scope.products = [];
    $scope.categories = [];

    $scope.tabOptions = {
        defaultView: "products"
    }

    $scope.handleInit = render;

    $scope.handleSeeDetails = function (productId) {
        $location.url('/products/details/' + productId);
    }

    $scope.handleFilter = function (category) {
        if (category === -1) {
            $scope.products = data;
            return;
        }
        $scope.products = data.filter(function (item) {
            return item.CategoryId == category.CategoryId;
        });
    }

    $scope.handleEditProduct = function (productId) {
        $location.url('/products/add/' + productId);
    }

    $scope.handleDeleteProduct = function (productId) {
        productsService.deleteProduct({
            productId: productId
        }).then(onDeleteProduct);
    }

    $scope.handleCreteNewProduct = function () {
        $location.url('/products/add');
    }

    function render() {
        loginService.isAuth().then(function (response) {
            $scope.auth = response.data;
            if ($scope.auth) {

                productsService.fetchCategories()
                              .then(onCategoriesLoad);

                productsService.fetchProducts()
                               .then(onProductsLoad);
            }
        });
    }

    function onCategoriesLoad(response) {
        $scope.categories = response.data;
    }

    function onProductsLoad(response) {
        data = response.data.map(function (item) {
            item.Photo = window.app.root + 'Content/app/' + item.Photo;
            item.CompanyPhoto = window.app.root + 'Content/app/' + item.CompanyPhoto;
            return item;
        });
        $scope.products = data;
    }

    function onDeleteProduct(response) {
        var success = response.data;
        if (success) {
            render();
        }
    }

}]);