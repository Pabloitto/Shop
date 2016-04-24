window.app.directive("navigationBar", ["LoginService", "localStorageService", function (loginService, localStorageService) {
    return {
        restrict: 'E',
        templateUrl: "../Scripts/app/modules/layout/directives/navigation/navigation-template.html",
        scope: {
            navOptions: '='
        },
        link: function (scope, element, attrs) {

            var cart = localStorageService.get("cart");

            scope.count = 0;

            loginService.isAuth().then(function (response) {
                scope.auth = response.data;
            });

            if (cart) {
                var quantities = _.map(cart, function (item) {
                    return item.Quantity;
                });
                scope.count = _.reduce(quantities, function (m, n) {
                    return m + n;
                }) || 0;
            }

        }
    };
}]);