import { WebDevTecService, ITecThing } from '../components/webDevTec/webDevTec.service';
export namespace Moments {
  interface MainScope extends angular.IScope{
    showRecordDialog: Function
  }
  export class MainController {
    public awesomeThings: ITecThing[];
    public webDevTec: WebDevTecService;
    public classAnimation: string;
    public creationDate: number;
    private $mdUtil: any;
    private $mdSidenav: any;
    private $log;
    public $mdDialog;
    public twitter;

    /** @ngInject */
    constructor ($scope:MainScope, $timeout: ng.ITimeoutService, webDevTec: WebDevTecService, $mdUtil: any, $mdSidenav: angular.material.ISidenavService, $log: ng.ILogService, $mdDialog: ng.material.IDialogService, userServices, $templateCache:angular.ITemplateCacheService)  {
      this.awesomeThings = new Array();
      this.webDevTec = webDevTec;
      this.classAnimation = '';
      this.creationDate = 1443021830401;
      this.$mdUtil = $mdUtil;
      this.$mdSidenav = $mdSidenav;
      this.$log = $log;
      this.$mdDialog = $mdDialog;
      this.activate($timeout);

      this.user = userServices.getUser();

      $scope.showRecordDialog = function($event) {
        $mdDialog.show({
          targetEvent: $event,
          templateUrl: 'app/components/moments/recordDialog.html',
          controller: 'RecordDialogController',
          controllerAs: 'create',
          bindToController: true
        });
      }

    }

    /** @ngInject */
    activate($timeout: ng.ITimeoutService) {
      this.getWebDevTec();

      var self = this;

      $timeout(function() {
        self.classAnimation = 'rubberBand';
      }, 4000);
    }
    buildToggler(navID) {
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
    }

    getWebDevTec() {
      this.awesomeThings = this.webDevTec.tec;
    }
  }
}
