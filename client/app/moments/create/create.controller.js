/**
 * @ngdoc controller
 * @name captureTheMomentApp.moment.create.controller:MomentCreateController
 * @description
 * Controller of the moment create page of the admin section
 */

(function () {
	'use strict';

	/**
	 * Register the create controller as MomentCreateController
	 */

	angular
		.module('captureTheMomentApp.moment.create')
		.controller('MomentCreateController', MomentCreateController);

	/**
	 * @ngdoc function
	 * @name captureTheMomentApp.moment.create.provider:MomentCreateController
	 * @description
	 * Provider of the {@link captureTheMomentApp.moment.create.controller:MomentCreateController MomentCreateController}
	 *
	 * @param {Service} Auth The Auth service to use
	 * @param {Service} $mdDialog The mdDialog service to use
	 * @param {Service} Moment The Moment resource
	 * @param {Service} MomentService The Moment service to use
	 * @param {Service} Toast The Toast service to use
	 * @returns {Service} {@link captureTheMomentApp.moment.create.controller:MomentCreateController MomentCreateController}
	 */

	MomentCreateController.$inject = ['$mdDialog', 'Moment', 'MomentService', 'Toast'];

	function MomentCreateController($mdDialog, Moment, MomentService, Toast) {
		var vm = this;

		/**
		 * @ngdoc property
		 * @name moment
		 * @propertyOf captureTheMomentApp.moment.create.controller:MomentCreateController
		 * @description
		 * The new moment data
		 *
		 * @returns {Object} The moment data
		 */
		vm.moment = new Moment();

		// view model bindings (documented below)
		vm.create = createMoment;
		vm.close = hideDialog;
		vm.cancel = cancelDialog;

		/**
		 * @ngdoc function
		 * @name createMoment
		 * @methodOf captureTheMomentApp.moment.create.controller:MomentCreateController
		 * @description
		 * Create a new moment by using the MomentService create method
		 *
		 * @param {form} [form] The form to gather the information from
		 */
		function createMoment(form) {
			// refuse to work with invalid data
			if (vm.moment._id || (form && !form.$valid)) {
				return;
			}

			MomentService.create(vm.moment)
				.then(createMomentSuccess)
				.catch(createMomentCatch);

			function createMomentSuccess(newMoment) {
				Toast.show({
					type: 'success',
					text: 'Moment ' + newMoment.name + ' has been created',
					link: {state: 'moment.list.detail', params: {id: newMoment._id}}
				});
				vm.close();
			}

			function createMomentCatch(err) {
				if (form && err) {
					form.setResponseErrors(err);
				}

				Toast.show({
					type: 'warn',
					text: 'Error while creating a new Moment'
				});
			}
		}

		/**
		 * @ngdoc function
		 * @name hide
		 * @methodOf captureTheMomentApp.moment.create.controller:MomentCreateController
		 * @description
		 * Hide the dialog
		 */
		function hideDialog() {
			$mdDialog.hide();
		}

		/**
		 * @ngdoc function
		 * @name cancel
		 * @methodOf captureTheMomentApp.moment.create.controller:MomentCreateController
		 * @description
		 * Cancel the dialog
		 */
		function cancelDialog() {
			$mdDialog.cancel();
		}
	}
})();
