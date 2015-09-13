(function () {
	'use strict';

	/**
	 * Introduce the captureTheMomentApp.moment.list.edit module
	 * and configure it.
	 *
	 * @requires 'ui.router',
	 * @requires 'ngMaterial',
	 * @requires captureTheMomentApp.mongooseError
	 * @requires captureTheMomentApp.moment.service
	 */

	angular
		.module('captureTheMomentApp.moment.list.edit', [
			'ui.router',
			'ngMaterial',
			'captureTheMomentApp.mongooseError',
			'captureTheMomentApp.moment.service'
		])
		.config(configureMomentListEdit);

	// inject configMomentListEdit dependencies
	configureMomentListEdit.$inject = ['$stateProvider'];

	/**
	 * Route configuration function configuring the passed $stateProvider.
	 * Register the moment.list.edit state with the edit template
	 * paired with the MomentEditController as 'edit' for the
	 * 'detail@moment.list' view.
	 * 'moment' is resolved as the moment with the id found in
	 * the state parameters.
	 *
	 * @param {$stateProvider} $stateProvider - The state provider to configure
	 */
	function configureMomentListEdit($stateProvider) {
		// The edit state configuration.
		var editState = {
			name: 'moment.list.edit',
			parent: 'moment.list',
			url: '/edit/:id',
			authenticate: true,
			role: 'user',
			onEnter: onEnterMomentListEdit,
			views: {
				'detail@moment.list': {
					templateUrl: 'app/moments/list/edit/edit.html',
					controller: 'MomentEditController',
					controllerAs: 'edit',
					resolve: {moment: resolveMomentFromArray}
				}
			}
		};

		$stateProvider.state(editState);
	}

	// inject onMomentListEditEnter dependencies
	onEnterMomentListEdit.$inject = ['$timeout', 'ToggleComponent'];

	/**
	 * Executed when entering the moment.list.detail state. Open the component
	 * registered with the component id 'moment.detailView'.
	 *
	 * @params {$timeout} $timeout - The $timeout service to wait for view initialization
	 * @params {ToggleComponent} ToggleComponent - The service to toggle the detail view
	 */
	function onEnterMomentListEdit($timeout, ToggleComponent) {
		$timeout(showDetails, 0, false);

		function showDetails() {
			ToggleComponent('moment.detailView').open();
		}
	}

	// inject resolveMomentDetailRoute dependencies
	resolveMomentFromArray.$inject = ['moments', '$stateParams', '_'];

	/**
	 * Resolve dependencies for the moment.list.edit state. Get the moment
	 * from the injected Array of moments by using the '_id' property.
	 *
	 * @params {Array} moments - The array of moments
	 * @params {Object} $stateParams - The $stateParams to read the moment id from
	 * @params {Object} _ - The lodash service to find the requested moment
	 * @returns {Object|null} The moment whose value of the _id property equals $stateParams._id
	 */
	function resolveMomentFromArray(moments, $stateParams, _) {
		//	return Moment.get({id: $stateParams.id}).$promise;
		return _.find(moments, {'_id': $stateParams.id});
	}

})();
