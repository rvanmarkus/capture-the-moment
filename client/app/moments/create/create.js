(function () {
	'use strict';

	/**
	 * Introduce the captureTheMomentApp.moment.create module
	 * and configure it.
	 *
	 * @requires ui.router
	 * @requires ngMessages
	 * @requires ngMaterial
	 * @requires {captureTheMomentApp.mongooseError}
	 * @requires {captureTheMomentApp.remoteUnique}
	 * @requires {captureTheMomentApp.moment.service}
	 */

	angular
		.module('captureTheMomentApp.moment.create', [
			'ui.router',
			'ngMessages',
			'ngMaterial',
			'captureTheMomentApp.mongooseError',
			'captureTheMomentApp.remoteUnique',
			'captureTheMomentApp.moment.service'
		])
		.config(configureMomentCreateRoutes);

	// inject configMoment.CreateRoutes dependencies
	configureMomentCreateRoutes.$inject = ['$stateProvider'];

	/**
	 * Route configuration function configuring the passed $stateProvider.
	 * Register the 'moment.list.create' state. The onEnterMomentListCreateView
	 * function will be called when entering the state and open a modal dialog
	 * with the app/moments/create/create.html template loaded.
	 *
	 * @param {$stateProvider} $stateProvider - The state provider to configure
	 */
	function configureMomentCreateRoutes($stateProvider) {
		var  createListState = {
			name: 'moment.list.create',
			parent: 'moment.list',
			url: '/create',
			authenticate: true,
			role: 'user',
			onEnter: onEnterMomentListCreateView
		};

		$stateProvider.state(createListState);
	}

	/**
	 * Function that executes when entering the moment.list.create state.
	 * Open the create dialog
	 */

	onEnterMomentListCreateView.$inject = ['$rootScope', '$state', '$mdDialog'];

	function onEnterMomentListCreateView($rootScope, $state, $mdDialog) {
		var unregisterListener = $rootScope.$on('$stateChangeStart', onStateChange);

		$mdDialog.show({
			controller: 'MomentCreateController',
			controllerAs: 'create',
			templateUrl: 'app/moments/create/create.html',
			clickOutsideToClose: false
		}).then(transitionTo, transitionTo);

		/**
		 * Function executed when resolving or rejecting the
		 * dialog promise.
		 *
		 * @param {*} answer - The result of the dialog callback
		 * @returns {promise}
		 */
		function transitionTo(answer) {
			return $state.transitionTo('moment.list.create');
		}

		/**
		 * Function executed when changing the state.
		 * Closes the create dialog
		 */
		function onStateChange() {
			unregisterListener();
			$mdDialog.hide();

		}
	}

})();
