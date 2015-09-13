	/**
	 * @ngdoc overview
	 * @name captureTheMomentApp.admin.user.list.items
	 * @requires ui.router
	 * @requires components/listImage
	 *
	 * @description
	 * The `captureTheMomentApp.admin.user.list.items` module which provides:
	 *
	 * - {@link captureTheMomentApp.admin.user.list.items.controller:UserItemsController UserItemsController}
	 */

(function () {
	'use strict';

	angular
		.module('captureTheMomentApp.admin.user.list.items', [
			'ui.router',
			'captureTheMomentApp.listImage'
		]);

})();
