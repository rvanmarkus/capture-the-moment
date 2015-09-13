(function () {
	'use strict';

	/**
	 * Introduce the captureTheMomentApp.moment.main module
	 * and configure it.
	 *
	 * @requires ui.router
	 * @requires captureTheMomentApp.mainMenu
	 */

	angular
		.module('captureTheMomentApp.moment.main', [
			'ui.router',
			'captureTheMomentApp.mainMenu'
		])
		.config(configMomentMainRoutes);

	// inject configMomentMainRoutes dependencies
	configMomentMainRoutes.$inject = ['$stateProvider', 'mainMenuProvider'];

	/**
	 * Route configuration function configuring the passed $stateProvider.
	 * Register the moment.main state with the list template for the
	 * 'main' view paired with the MomentMainController as 'main'.
	 *
	 * @param {$stateProvider} $stateProvider - The state provider to configure
	 * @param {mainMenuProvider} mainMenuProvider - The service to pass navigation information to
	 */
	function configMomentMainRoutes($stateProvider, mainMenuProvider) {
		// The main state configuration
		var mainState = {
			name: 'moment.main',
			parent: 'moment',
			url: '/',
			authenticate: true,
			role: 'user',
			views: {
				'@moment': {
					templateUrl: 'app/moments/main/main.html',
					controller: 'MomentMainController',
					controllerAs: 'main'
				}
			}
		};

		$stateProvider.state(mainState);

		mainMenuProvider.addMenuItem({
			name: 'Moments',
			state: mainState.name,
			role: 'user'
		});
	}

})();
