'use strict';

describe('Controller: MomentItemsController', function () {

	// load the controller's module
	beforeEach(module('captureTheMomentApp.moment.items'));

	var controller;
	var scope;

	// Initialize the controller and a mock scope
	beforeEach(inject(function ($controller, $rootScope) {
		scope = $rootScope.$new();
		controller = $controller('MomentItemsController', {
			// $scope: scope
		});
	}));

	it('object should exist', function () {
		Should.exist(controller);
		controller.should.be.an.instanceof(Object);
	});

});
