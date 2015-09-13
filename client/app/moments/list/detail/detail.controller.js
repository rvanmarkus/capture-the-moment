(function () {
	'use strict';

	/**
	 * Register the edit controller as MomentDetailController
 	 */

	angular
		.module('captureTheMomentApp.moment.list.detail')
		.controller('MomentDetailController', MomentDetailController);

	// add MomentDetailController dependencies to inject
	MomentDetailController.$inject = ['$state', 'moment'];

	/**
	 * MomentDetailController constructor
	 */
	function MomentDetailController($state, moment) {
		var vm = this;

		// the current moment to display
		vm.moment = moment;
		// switch to the edit state
		vm.edit = edit;
		// switch to the parent state
		vm.goBack = goBack

		/**
		 * Open the edit state with the current moment
		 *
		 */
		function edit() {
			$state.go('^.edit', {'id': vm.moment._id});
		}

		/**
		 * Return to the parent state
		 *
		 */
		function goBack() {
			$state.go('^');
		}
	}
})();
