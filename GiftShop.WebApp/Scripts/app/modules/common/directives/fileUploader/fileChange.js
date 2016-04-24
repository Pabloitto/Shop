window.app.directive("fileChange", function () {
    return {
        restrict: 'A',
        scope: {
            fileChangeOptions: '=fileChangeOptions'
        },
        link: function (scope, element, attrs) {
            scope.$watch(scope.fileChangeOptions, function () {
                if (scope.fileChangeOptions && scope.fileChangeOptions.onChange &&
                                   angular.isFunction(scope.fileChangeOptions.onChange)) {
                    element.off('change').on('change', scope.fileChangeOptions.onChange);
                }
            });

        }
    };
});