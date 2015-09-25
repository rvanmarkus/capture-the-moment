function acmeNavbar() {
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
exports.acmeNavbar = acmeNavbar;
var NavbarController = (function () {
    function NavbarController(moment, $mdSidenav) {
        this.relativeDate = moment(this.creationDate).fromNow();
        this.$mdSidenav = $mdSidenav;
    }
    NavbarController.prototype.toggleSidebar = function () {
        this.$mdSidenav('left').toggle();
    };
    return NavbarController;
})();
exports.NavbarController = NavbarController;
