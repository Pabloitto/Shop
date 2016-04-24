window.app.factory("AccountService", function ($http) {

    function saveAccount(options) {
        return $http.post("/Account/SaveAccount", options);
    }

    function deleteAccount(options) {
        return $http.post("/Account/DeleteAccount", options);
    }

    function fetchAccounts(options) {
        return $http.get("/Account/GetAccounts");
    }

    function fetchAccountById(options) {
        return $http.get("/Account/GetAccount?accountId=" + options.accountId);
    }

    function fetchAccountTypes() {
        return $http.get("/Account/GetAccountTypes");
    }


    return {
        saveAccount: saveAccount,
        deleteAccount: deleteAccount,
        fetchAccounts: fetchAccounts,
        fetchAccountById: fetchAccountById,
        fetchAccountTypes: fetchAccountTypes
    }
});