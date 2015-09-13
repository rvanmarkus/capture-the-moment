(function () {
	'use strict';

	/**
	 * Introduce the captureTheMomentApp.moment module
	 * and configure it.
	 *
	 * @requires ui.router
	 * @requires ngResource
	 * @requires captureTheMomentApp.moment.main
	 * @requires captureTheMomentApp.moment.list
	 * @requires captureTheMomentApp.moment.create
	 */
	angular
		.module('captureTheMomentApp.moment', [
			'ngResource',
			'ui.router',
			'captureTheMomentApp.moment.main',
			'captureTheMomentApp.moment.list',
			'captureTheMomentApp.moment.create'
		])
		.config(configMomentRoutes);

	// inject configMomentRoutes dependencies
	configMomentRoutes.$inject = ['$urlRouterProvider', '$stateProvider'];

	/**
	 * Route configuration function configuring the passed $stateProvider.
	 * Register the abstract moment state with the moment template
	 * paired with the MomentController as 'index'.
	 * The injectable 'moments' is resolved as a list of all moments
	 * and can be injected in all sub controllers.
	 *
	 * @param {$stateProvider} $stateProvider - The state provider to configure
	 */
	function configMomentRoutes($urlRouterProvider, $stateProvider) {
		// The moment state configuration
		var momentState = {
			name: 'moment',
			url: '/moments',
			abstract: true,
			templateUrl: 'app/moments/moment.html',
			controller: 'MomentController',
			controllerAs: 'index'
		};

		$urlRouterProvider.when('/moment', '/moment/');
		$stateProvider.state(momentState);
	}

})();
