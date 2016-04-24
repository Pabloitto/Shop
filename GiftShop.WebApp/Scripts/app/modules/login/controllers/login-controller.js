window.app.controller("LoginController", ["$scope", "$location", "LoginService", function ($scope, $location, loginService) {

    $scope.loginModel = {
        account: "",
        password : ""
    }

    $scope.signIn = function () {
        if ($scope.loginModel.account && $scope.loginModel.password) {
            loginService.signIn($scope.loginModel.account, $scope.loginModel.password)
                        .then(function (response) {
                            var auth = response.data;
                            if (auth === true) {
                                $location.url('/home');
                            } else {
                                $scope.errors = "Please, verify your credentials";
                            }
                        });
        } else {
            $scope.errors = "Please, verify your credentials";
        }
    }

    $scope.handleInit = function () {
        loginService.signOut();
    }
   

}]);