var SettingsController = (function () {
    function SettingsController($scope, $timeout, $log, $mdToast, $mdDialog, $firebaseAuth, $location) {
        this.$mdToast = $mdToast;
        this.$scope = $scope;
        this.$log = $log;
        this.location = $location;
        this.settings = [
            {
                name: 'Notifications',
                state: true
            },
            {
                name: 'Capture on startup',
                state: false
            }
        ];
        var ref = new Firebase('https://emoment.firebaseio.com');
        this.twitter = ref.getAuth().twitter;
        console.log(this.settings);
        $scope.showTermsAndConditions = function ($event) {
            $mdDialog.show($mdDialog.alert()
                .parent(angular.element(document.querySelector('#popupContainer')))
                .clickOutsideToClose(true)
                .title('Terms & Conditions')
                .content('awle  khfaowrihgae rkngaow  eihaoeri jvawelk fnawoe')
                .ariaLabel('Terms And Conditions')
                .ok('Confirm')
                .targetEvent($event));
        };
        $scope.showSimpleToast = function (obj) {
            console.log("first- " + obj.name + " : ", obj.state);
            $mdToast.show($mdToast.simple().content(obj.name + " is now set as " + obj.state).hideDelay(1500));
        };
        $scope.deleteHistory = function () {
            console.log('delete history clicked');
        };
        $scope.reportError = function () {
            console.log('button for report error clicked');
        };
        $scope.logout = function () {
            ref.unauth();
            this.location.path('/');
            console.log('logged out');
        };
    }
    return SettingsController;
})();
exports.SettingsController = SettingsController;
