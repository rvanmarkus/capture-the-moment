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

  constructor(moment: moment.MomentStatic, $mdSidenav: angular.material.ISidenavService) {
    this.relativeDate = moment(this.creationDate).fromNow();
    this.$mdSidenav = $mdSidenav;
  }

  toggleSidebar(){
    this.$mdSidenav('left').toggle();
  }
}
