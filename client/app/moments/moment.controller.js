(function () {
	'use strict';

	// register the controller as MomentController
	angular
		.module('captureTheMomentApp.moment')
		.controller('MomentController', MomentController);

	// add MomentController dependencies to inject
	// MomentController.$inject = [];

	/**
	 * MomentController constructor. Main controller for the captureTheMomentApp.moment
	 * module.
	 *
	 * @param {$scope} $scope - The scope to listen for events
	 * @param {socket.io} socket - The socket to register updates
	 */
	function MomentController() {
		// var vm = this;
	}

})();
