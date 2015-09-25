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
        icon: 'add_circle',
        link: '/'
      },
      {
        title: 'Moments',
        icon: 'settings_backup_restore',
        link: '#/moments'
      },
      {
        title: 'Settings',
        icon: 'settings',
        link: '#/settings'
      },
      {
        title: 'Logout',
        icon: 'account_circle',
        link: '#/login'
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