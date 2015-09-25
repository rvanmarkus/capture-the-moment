import {Moments} from './main/main.controller';

/** @ngInject */
export function routerConfig($stateProvider: ng.ui.IStateProvider, $urlRouterProvider: ng.ui.IUrlRouterProvider) {

  $stateProvider
    .state('home', {
      url: '/',
      templateUrl: 'app/main/main.html',
      controller: Moments.MainController,
      controllerAs: 'main'
    })
    .state('moments', {
      url: '/moments',
      templateUrl: 'app/components/moments/fullLlist.html',
      controller: 'FullListController',
      controllerAs: 'fl',
      bindToController: true
    });

  $urlRouterProvider.otherwise('/');
}
