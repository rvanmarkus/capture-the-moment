/** @ngInject */
export function acmeNavbar(): ng.IDirective {

  return {
    restrict: 'E',
    scope: {
      creationDate: '='
    },
    templateUrl: 'app/components/navbar/navbar.html',
    controller: NavbarController,
    controllerAs: 'vm',
    bindToController: true

  };
}

/** @ngInject */
export class NavbarController {
  public relativeDate: string;
  public creationDate: number;
  private $mdSidenav : angular.material.ISidenavService;

  constructor(moment: moment.MomentStatic, $mdSidenav: angular.material.ISidenavService, userServices) {
    this.relativeDate = moment(this.creationDate).fromNow();
    this.$mdSidenav = $mdSidenav;
    this.userServices = userServices;
  }

  toggleSidebar(){
    this.$mdSidenav('left').toggle();
  }
}
