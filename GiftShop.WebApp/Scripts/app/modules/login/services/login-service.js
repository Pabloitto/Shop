window.app.factory("LoginService", function ($http) {

    function isAuth() {
        return $http.get("/Home/IsAuth");
    }

    function signIn(account, password) {
        return $http.post("/Home/SignIn", {
            account: account,
            password: password
        });
    }

    function signOut() {
        return $http.post("/Home/SignOut");
    }

    return {
        isAuth: isAuth,
        signOut: signOut,
        signIn: signIn
    }
});