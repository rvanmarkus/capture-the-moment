/**
 * @ngdoc controller
 * @name captureTheMomentApp.main.controller:MainController
 * @description
 * Controls mainly nothing currently
 */

(function () {
	'use strict';

	// register the controller as MainController
	angular
		.module('captureTheMomentApp.main')
		.controller('MainController', MainController);

	/**
	 * @ngdoc function
	 * @name captureTheMomentApp.main.provider:MainController
	 * @description
	 * Provider of the {@link captureTheMomentApp.main.controller:MainController MainController}
	 *
	 * @param {Service} $scope The scope service to use
	 * @param {Service} $http The http service to use
	 */

	// MainController.$inject = [];

	function MainController() {
		var vm = this;
	}

})();
