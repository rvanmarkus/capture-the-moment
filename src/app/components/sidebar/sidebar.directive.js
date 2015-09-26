function emSidebar() {
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
exports.emSidebar = emSidebar;
var SidebarController = (function () {
    function SidebarController($scope, $timeout, $mdSidenav, $log) {
        this.$mdSidenav = $mdSidenav;
        this.$log = $log;
        this.menu = [
            {
                title: 'Home',
                icon: 'album',
                link: '/'
            },
            {
                title: 'Moments',
                icon: 'settings_backup_restore',
                link: '/moments'
            },
            {
                title: 'Settings',
                icon: 'settings',
                link: '/settings'
            },
            {
                title: 'Logout',
                icon: 'account_circle',
                link: '/login'
            }
        ];
    }
    SidebarController.prototype.toggleSidebar = function () {
        this.$mdSidenav('left').toggle();
    };
    return SidebarController;
})();
