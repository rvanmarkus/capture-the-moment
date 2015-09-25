var main_controller_1 = require('./main/main.controller');
var login_controller_1 = require('./components/login/login.controller');
function routerConfig($stateProvider, $urlRouterProvider, $locationProvider) {
    $locationProvider.html5Mode({
        enabled: true,
        requireBase: false
    });
    $stateProvider
        .state('home', {
        url: '/',
        templateUrl: 'app/main/main.html',
        controller: main_controller_1.Moments.MainController,
        controllerAs: 'main'
    })
        .state('moments', {
        url: '/moments',
        templateUrl: 'app/components/moments/fullList.html',
        controller: '',
        controllerAs: 'fl',
        bindToController: true
    })
        .state('settings', {
        url: '/settings',
        templateUrl: 'app/components/settings/settings.html',
        controller: '',
        controllerAs: 'fl',
        bindToController: true
    })
        .state('login', {
        url: '/login',
        templateUrl: 'app/components/login/login.html',
        controller: login_controller_1.LoginController,
        controllerAs: 'login',
        bindToController: true
    });
    $urlRouterProvider.otherwise('/');
}
exports.routerConfig = routerConfig;
