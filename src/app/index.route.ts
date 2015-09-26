import {Moments} from './main/main.controller';
import {LoginController} from './components/login/login.controller';
import {ListsController} from './components/moments/lists.controller';

/** @ngInject */
export function routerConfig($stateProvider: ng.ui.IStateProvider, $urlRouterProvider: ng.ui.IUrlRouterProvider, $locationProvider) {


  $locationProvider.html5Mode({
    enabled: true,
    requireBase: false
  });

  $stateProvider
    .state('home', {
      url: '/',
      templateUrl: 'app/main/main.html',
      controller: Moments.MainController,
      controllerAs: 'main',

    })
    .state('moments', {
      url: '/moments',
      templateUrl: 'app/components/moments/fullList.html',
      controller: ListsController,
      controllerAs: 'fl',
      bindToController: true,
    })
    .state('settings', {
      url: '/settings',
      templateUrl: 'app/components/settings/settings.html',
      controller: 'SettingsController',
      controllerAs: 'settings'
    })
    .state('login', {
      url: '/login',
      templateUrl: 'app/components/login/login.html',
      controller: LoginController,
      controllerAs: 'login',
      bindToController: true
    });
  $urlRouterProvider.otherwise('/');
}
