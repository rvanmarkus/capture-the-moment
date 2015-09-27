/** @ngInject */
export class SettingsController {
  private $log;
  private $mdToast;
  public settings;
  public $mdDialog;
  private userServices;
  private $scope: ng.IScope;


  /** @ngInject */
  constructor($scope: ng.IScope, $timeout: ng.ITimeoutService, $log: ng.ILogService, $mdToast: any, $mdDialog: ng.material.IDialogService, userServices, $firebaseAuth) {
    this.userServices = userServices;
    this.$mdToast = $mdToast;
    this.$scope = $scope;
    this.$log = $log;
    this.user = userServices.getUser();
    console.log(this.user.settings);
    $scope.settings = this.user.settings;

    
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
    $scope.showSimpleToast = function(obj) {
      console.log("first- " + obj.name + " : ", obj.state);
      $mdToast.show(
        $mdToast.simple().content(obj.name + " is now set as " + obj.state).hideDelay(1500)
      );
    };

    $scope.deleteHistory = function() {
      console.log('delete history clicked')
    };

    $scope.reportError = function() {
      console.log('button for report error clicked')
    }
    

  }

  logout() {
    this.$mdToast.show(this.$mdToast.simple().content('HIHIHIH').hideDelay(2500));
    this.userServices.ref.unauth();
  }
}
