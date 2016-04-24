window.app.controller("AccountController", ["$scope", "$location", "AccountService", function ($scope, $location, accountService) {

    $scope.accountModel = {};
    $scope.accountTypes = [];

    $scope.handleInit = function () {
        accountService.fetchAccountTypes()
                      .then(onAccountTypesLoad);
    }

    $scope.handleSave = function () {
        accountService.saveAccount($scope.accountModel)
                      .then(onSave);
    }

    $scope.handleCancel = clean;

    $scope.handleReturn = function () {
        clean();
        $location.url('/login');
    }

    function onSave(response) {
        var success = response.data;
        clean();
        $location.url("/login");
    }

    function onAccountTypesLoad(response) {
        $scope.accountTypes = response.data;
    }

    function clean() {
        $scope.accountModel = {};
        $scope.$broadcast("clean");
    }

}]);