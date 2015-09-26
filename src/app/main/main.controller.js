var Moments;
(function (Moments) {
    var MainController = (function () {
        function MainController($scope, $timeout, webDevTec, toastr, $mdUtil, $mdSidenav, $log, $mdDialog, $firebaseAuth) {
            this.awesomeThings = new Array();
            this.webDevTec = webDevTec;
            this.classAnimation = '';
            this.creationDate = 1443021830401;
            this.toastr = toastr;
            this.$mdUtil = $mdUtil;
            this.$mdSidenav = $mdSidenav;
            this.$log = $log;
            this.$mdDialog = $mdDialog;
            this.activate($timeout);
            var ref = new Firebase('https://emoment.firebaseio.com');
            this.twitter = ref.getAuth().twitter;
            $scope.showRecordDialog = function ($event) {
                $mdDialog.show({
                    targetEvent: $event,
                    templateUrl: '/app/components/moments/recordDialog.html',
                    controller: 'RecordDialogController',
                    controllerAs: 'create'
                });
            };
        }
        MainController.prototype.activate = function ($timeout) {
            this.getWebDevTec();
            var self = this;
            $timeout(function () {
                self.classAnimation = 'rubberBand';
            }, 4000);
        };
        MainController.prototype.buildToggler = function (navID) {
            var debounceFn;
            debounceFn = this.$mdUtil.debounce(function () {
                var $log = this.$log;
                this.$mdSidenav(navID)
                    .toggle()
                    .then(function () {
                    $log.debug("toggle " + navID + " is done");
                });
            }, 200);
            return debounceFn;
        };
        MainController.prototype.showToastr = function () {
            this.toastr.info('Fork <a href="https://github.com/Swiip/generator-gulp-angular" target="_blank"><b>generator-gulp-angular</b></a>');
            this.classAnimation = '';
        };
        MainController.prototype.getWebDevTec = function () {
            this.awesomeThings = this.webDevTec.tec;
        };
        return MainController;
    })();
    Moments.MainController = MainController;
})(Moments = exports.Moments || (exports.Moments = {}));
