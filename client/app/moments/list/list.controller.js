(function () {
	'use strict';

	/**
	 * Register the list controller as MomentListController
	 */
	angular
		.module('captureTheMomentApp.moment.list')
		.controller('MomentListController', MomentListController);

	// add MomentListController dependencies to inject
	MomentListController.$inject = ['$scope', 'socket', '$state', 'moments', 'ToggleComponent'];

	/**
	 * MomentListController constructor
	 *
	 * @param {Object} $scope - The current scope
	 * @param {Object} socket - The socket service to register to
	 * @param {$state} $state - The $state to activate routing states on
	 * @param {Array} moments - The list of moments resolved for this route
	 * @param {Service} ToggleComponent - The service for switching the detail view
	 */
	function MomentListController($scope, socket, $state, moments, ToggleComponent) {
		var vm = this;

		// the array of moments
		vm.moments = moments;
		// toggle detail view
		vm.toggleDetails = toggleDetails;

		// initialize the controller
		activate();

		/**
		 * Register socket updates and unsync on scope $destroy event
		 */
		function activate() {
			socket.syncUpdates('moment', vm.moments);
			$scope.$on('$destroy', unsyncMomentUpdates);

			function unsyncMomentUpdates() {
				socket.unsyncUpdates('moment');
			}
		}

		/**
		 * Toggle the detail view
		 */
		function toggleDetails() {
			ToggleComponent('moment.detailView').toggle();
		}
	}

})();
