window.app.factory("ProductsService", function ($http) {

    function saveProduct(options) {
        return $http.post("/Products/SaveProduct", options);
    }

    function deleteProduct(options) {
        return $http.post("/Products/DeleteProduct", options);
    }

    function fetchProducts(options) {
        return $http.get("/Products/GetProducts");
    }

    function fetchProductById(options) {
        return $http.get("/Products/GetProductById?productId=" + options.productId);
    }

    function fetchCategories() {
        return $http.get("/Categories/GetCategories");
    }


    return {
        saveProduct: saveProduct,
        deleteProduct : deleteProduct,
        fetchProducts: fetchProducts,
        fetchProductById: fetchProductById,
        fetchCategories: fetchCategories
    }
});