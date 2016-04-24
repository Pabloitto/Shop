window.app.directive("tabMenu", [function () {
    return {
        restrict: 'E',
        templateUrl: "../Scripts/app/modules/layout/directives/tab-menu/tab-menu-template.html",
        scope: {
            tabMenuOptions: '='
        },
        link: function (scope, element, attrs) {

            scope.visible = true;

            scope.menu = [
                { id : 'home' , label: "Home", href: "#home", isActive: false },
                { id : 'products' , label: "Products", href: "#products", isActive: false }
            ];

            if (scope.tabMenuOptions && scope.tabMenuOptions.defaultView) {
                var defaultView = scope.menu.find(function (menuItem) { return menuItem.id === scope.tabMenuOptions.defaultView; });
                defaultView.isActive = true;
            }

            scope.setActive = function (menuItem) {
                scope.menu.forEach(function (menuItem) { menuItem.isActive = false; });
                menuItem.isActive = true;
            }

        }
    };
}]);