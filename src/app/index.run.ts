/** @ngInject */
export function runBlock($rootScope, userServices, $state, $log: ng.ILogService) {
  $log.debug('runBlock end');
  // Listen to '$locationChangeSuccess', not '$stateChangeStart'
  $rootScope.$on('$locationChangeSuccess', function() {
    console.log( userServices.userIsLoggedIn());
    if(! userServices.userIsLoggedIn() && $state.name != 'login'){
      $state.go('login')
    }
  })
}
