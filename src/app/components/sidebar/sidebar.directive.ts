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
  public menu;

  constructor($scope: ng.IScope, $timeout: ng.ITimeoutService, $mdSidenav: any, $log: ng.ILogService) {
    this.$mdSidenav = $mdSidenav;
    this.$log = $log;

    this.menu = [
      {
        title: 'Home',
        icon: 'start',
        type: 'link',
        state: '/'
      },
      {
        title: 'Moments',
        icon: 'replay',
        type: 'link',
        state: '/moments'
      },
      {
        title: 'Settings',
        icon: 'settings',
        type: 'link',
        state: '/settings'
      },
      {
        title: 'Logout',
        icon: 'logout',
        type: 'link',
        state: '/login'
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
