(function () {
	'use strict';

	/**
	 * Introduce the captureTheMomentApp.moment.list module
	 * and configure it.
	 * @requires ui.router
	 * @requires ngMaterial
	 * @requires captureTheMomentApp.socket
	 * @requires captureTheMomentApp.mainMenu,
	 * @requires captureTheMomentApp.toggleComponent,
	 * @requires captureTheMomentApp.moment.list.detail
	 * @requires captureTheMomentApp.moment.list.edit
	 * @requires captureTheMomentApp.moment.list.items
	 */

	angular
		.module('captureTheMomentApp.moment.list', [
			'ngMaterial',
			'ui.router',
			'captureTheMomentApp.socket',
			'captureTheMomentApp.mainMenu',
			'captureTheMomentApp.toggleComponent',
			'captureTheMomentApp.moment.list.detail',
			'captureTheMomentApp.moment.list.edit',
			'captureTheMomentApp.moment.list.items'
		])
		.config(configMomentListRoutes);

	// inject configMomentListRoutes dependencies
	configMomentListRoutes.$inject = ['$stateProvider', 'mainMenuProvider'];

	/**
	 * Route configuration function configuring the passed $stateProvider.
	 * Register the moment.list state with the list template fpr the
	 * 'main' view paired with the MomentListController as 'list'.
	 *
	 * @param {$stateProvider} $stateProvider - The state provider to configure
	 */
	function configMomentListRoutes($stateProvider, mainMenuProvider) {
		// The list state configuration
		var listState = {
			name: 'moment.list',
			parent: 'moment',
			url: '/list',
			authenticate: true,
			role: 'user',
			resolve: {
				moments:  resolveMoments
			},
			views: {

				// target the unnamed view in the moment state
				'@moment': {
					templateUrl: 'app/moments/list/list.html',
					controller: 'MomentListController',
					controllerAs: 'list'
				},

				// target the content view in the moment.list state
				'content@moment.list': {
					templateUrl: 'app/moments/list/items/items.html',
					controller: 'MomentItemsController',
					controllerAs: 'items'
				}
			}
		};

		$stateProvider.state(listState);

		mainMenuProvider.addSubMenuItem('moment.main', {
			name: 'Moments List',
			state: listState.name
		});
	}

	// inject resolveMoments dependencies
	resolveMoments.$inject = ['Moment'];

	/**
	 * Resolve dependencies for the moment.list state
	 *
	 * @params {Moment} Moment - The service to query moments
	 * @returns {Promise} A promise that, when fullfilled, returns an array of moments
	 */
	function resolveMoments(Moment) {
		return Moment.query().$promise;
	}

})();
