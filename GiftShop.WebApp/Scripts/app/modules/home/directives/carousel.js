window.app.directive("carousel", [function () {
    return {
        restrict: 'E',
        templateUrl: "../Scripts/app/modules/home/directives/carousel-template.html",
        scope: {
            carouselOptions: '='
        },
        link: function (scope, element, attrs) {
            element.find('.carousel').carousel({
                interval: 3000
            });
        }
    };
}]);