/** @ngInject */
export function emSidebar(): ng.IDirective {

  return {
    restrict: 'E',
    scope: {
      creationDate: '=',
      menu: '&'
    },
    templateUrl: 'app/components/sidebar/sidebar.html',
    controller: SidebarController,
    controllerAs: 'vm',
    bindToController: true
  };

}
/** @ngInject */
class SidebarController {
  private $mdSidenav;
  private $log;
  public menu: Array;

  constructor($scope: ng.IScope, $timeout: ng.ITimeoutService, $mdSidenav: any, $log: ng.ILogService) {
    this.$mdSidenav = $mdSidenav;
    this.$log = $log;

    this.menu = [
      {
        title: 'Start',
        icon:'start',
        link : ''
      },
      {
        title: 'Moments',
        icon: 'replay',
        link : ''

      }
    ]
  }

  public close = function () {
    this.$mdSidenav('left').close()
      .then(function () {
        this.$log.debug("close LEFT is done");
      });
  };

}
