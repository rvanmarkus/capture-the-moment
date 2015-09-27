/** @ngInject */
export function runBlock($rootScope, $state, $log: ng.ILogService, userServices) {
  $log.debug('runBlock end');
  // Listen to '$locationChangeSuccess', not '$stateChangeStart'
  $rootScope.$on('$locationChangeSuccess', function() {
    // console.log(userServices.userIsLoggedIn);
    if(! userServices.userIsLoggedIn() && $state.name != 'login'){
      $state.go('login')
    }
  })
}
