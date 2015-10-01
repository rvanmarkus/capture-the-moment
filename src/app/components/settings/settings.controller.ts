/** @ngInject */
export class SettingsController {
  private $log;
  private $mdToast;
  public settings;
  public $mdDialog;
  private userServices;
  private $scope: ng.IScope;


  /** @ngInject */
  constructor($scope: ng.IScope, $timeout: ng.ITimeoutService, $log: ng.ILogService, $mdToast: any, $mdDialog: ng.material.IDialogService, userServices, $firebaseAuth, $firebaseObject) {
    this.userServices = userServices;
    this.$mdToast = $mdToast;
    this.$scope = $scope;
    this.$log = $log;
    this.user = userServices.getUser();
    $scope.userSettings = userServices.syncUserSettings();
    console.log('userSettings: ' + $scope.userSettings);
    $scope.userSettings.$bindTo($scope, 'settingsObj').then(function() {
      console.log('settingsObj should be bound: ' + $scope.settingsObj);
      console.log($scope.settingsObj);
    });
    $scope.showTermsAndConditions = function($event) {
      $mdDialog.show(
        $mdDialog.alert()
          .parent(angular.element(document.querySelector('#popupContainer')))
          .clickOutsideToClose(true)
          .title('Terms & Conditions')
          .content('awle  khfaowrihgae rkngaow  eihaoeri jvawelk fnawoe')
          .ariaLabel('Terms And Conditions')
          .ok('Confirm')
          .targetEvent($event)
      );
    };

    $scope.onChange = function(key, value) {
      console.log(key + " : " value);
      $mdToast.show(
        $mdToast.simple().content(key + " is now set as " + value).hideDelay(1500)
      );
    };

    $scope.deleteHistory = function() {
      console.log('delete history clicked')
    };

    $scope.reportError = function() {
      console.log('button for report error clicked')
    };

    $scope.logout = function() {
      $mdToast.show(
          $mdToast.simple().content('HIHIHIH').hideDelay(2500)
      );
      userServices.logout();

    };
  }

}
