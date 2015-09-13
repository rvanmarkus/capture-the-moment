(function () {
	'use strict';

	/**
	 * Register the list controller as MomentItemsController
	 */

	angular
		.module('captureTheMomentApp.moment.list.items')
		.controller('MomentItemsController', MomentItemsController);

	// add MomentItemsController dependencies to inject
	MomentItemsController.$inject = ['$state'];

	/**
	 * MomentItemsController constructor
	 */
	function MomentItemsController($state) {
		var vm = this;

		// the selected item id
		var curMomentId = null;

		// check if this item is selected
		vm.isSelected = isSelected;
		// switch to the detail state
		vm.showInDetails = showInDetails;

		/**
		 * Check if the passed item is the current selected item
		 *
		 * @param {Object} moment - The object to check for selection
		 */
		function isSelected(moment) {
			return curMomentId === moment._id;
		}

		/**
		 * Open the detail state with the selected item
		 *
		 * @param {Object} moment - The moment to edit
		 */
		function showInDetails(moment) {
			curMomentId = moment._id;
			$state.go('moment.list.detail', {'id': curMomentId});
		}
	}

})();
