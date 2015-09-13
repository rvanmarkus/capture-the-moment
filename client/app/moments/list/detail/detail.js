(function () {
	'use strict';

	/**
	 * Introduce the captureTheMomentApp.moment.list.detail submodule
	 * and configure it.
	 *
   * @requires ui.router
	 * @requires angularMoment
	 */

	angular
		.module('captureTheMomentApp.moment.list.detail', [
			'ui.router',
			'angularMoment'
		])
		.config(configureMomentListDetail);

	// inject configMomentRoutes dependencies
	configureMomentListDetail.$inject = ['$stateProvider'];

	/**
	 * Route configuration function configuring the passed $stateProvider.
	 * Register the 'moment.detail' state with the detail template
	 * paired with the MomentDetailController as 'detail' for the
	 * 'sidenav' sub view.
	 * 'moment' is resolved as the moment with the id found in
	 * the state parameters.
	 *
	 * @param {$stateProvider} $stateProvider - The state provider to configure
	 */
	function configureMomentListDetail($stateProvider) {
		// The detail state configuration
		var detailState = {
			name: 'moment.list.detail',
			parent: 'moment.list',
			url: '/:id',
			authenticate: true,
			role: 'user',
			onEnter: onEnterMomentListDetail,
			views: {
				'detail@moment.list': {
					templateUrl: 'app/moments/list/detail/detail.html',
					controller: 'MomentDetailController',
					controllerAs: 'detail',
					resolve: {moment: resolveMomentFromArray}
				}
			}
		};

		$stateProvider.state(detailState);
	}

	// inject onMomentListDetailEnter dependencies
	onEnterMomentListDetail.$inject = ['$timeout', 'ToggleComponent'];

	/**
	 * Executed when entering the moment.list.detail state. Open the component
	 * registered with the component id 'moment.detailView'.
	 *
 	 * @params {$timeout} $timeout - The $timeout service to wait for view initialization
	 * @params {ToggleComponent} ToggleComponent - The service to toggle the detail view
	 */
	function onEnterMomentListDetail($timeout, ToggleComponent) {
		$timeout(showDetails, 0, false);

		function showDetails() {
			ToggleComponent('moment.detailView').open();
		}
	}

	// inject resolveMomentFromArray dependencies
	resolveMomentFromArray.$inject = ['moments', '$stateParams', '_'];

	/**
	 * Resolve dependencies for the moment.detail state
	 *
	 * @params {Array} moments - The array of moments
	 * @params {Object} $stateParams - The $stateParams to read the moment id from
	 * @returns {Object|null} The moment whose value of the _id property equals $stateParams._id
	 */
	function resolveMomentFromArray(moments, $stateParams, _) {
		return _.find(moments, {'_id': $stateParams.id});
	}

})();
