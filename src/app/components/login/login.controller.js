var LoginController = (function () {
    function LoginController($scope, $firebaseAuth, $location) {
        this.ref = new Firebase('https://emoment.firebaseio.com');
        this.usersRef = this.ref.child('users');
        this.authObj = $firebaseAuth(this.ref);
        this.location = $location;
    }
    LoginController.prototype.authenticate = function () {
        var _this = this;
        this.authObj.$authWithOAuthPopup('twitter').then(function (authData) {
            _this.twitter = authData.twitter;
            _this.authData = authData;
            _this.usersRef.set({
                uid: _this.authData.uid,
                username: _this.twitter.username,
                displayName: _this.twitter.displayName,
                profileImageURL: _this.twitter.profileImageURL
            });
            _this.location.path('/');
        }).catch(function (error) {
            console.error("Authentication failed:", error);
        });
    };
    LoginController.prototype.unauthenticate = function () {
        this.ref.unauth();
        console.log('logged out');
    };
    return LoginController;
})();
exports.LoginController = LoginController;
