var LoginController = (function () {
    function LoginController($scope, $firebaseObject) {
        var ref = new Firebase('https://emoment.firebaseio.com');
        ref.authWithOAuthPopup("twitter", function (error, authData) {
            if (error) {
                console.log("Login Failed!", error);
            }
            else {
                console.log("Authenticated successfully with payload:", authData);
                console.log('Handle: ' + authData.twitter.username);
            }
        });
    }
    return LoginController;
})();
exports.LoginController = LoginController;
