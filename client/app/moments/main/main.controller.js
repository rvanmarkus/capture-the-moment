(function () {
	'use strict';

	/**
	 * Register the list controller as MomentMainController
	 */

	angular
		.module('captureTheMomentApp.moment.main')
		.controller('MomentMainController', MomentMainController);

	// add MomentMainController dependencies to inject
	MomentMainController.$inject = ['$state'];

	/**
	 * MomentMainController constructor
	 */
	function MomentMainController($state) {
		var vm = this;
		// switch to the list state
		vm.showList = showList;

		/**
		 * Activate the moment.list state
		 */
		function showList() {
			$state.go('moment.list');
		}
	}

})();
