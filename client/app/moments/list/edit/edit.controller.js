/**
 * @ngdoc controller
 * @name captureTheMomentAppmoment.list.edit.controller:MomentEditController
 * @description
 * Controller of the moment edit page of the admin section
 */

(function () {
	'use strict';

	/**
	 * Register the edit controller as MomentEditController
	 */

	angular
		.module('captureTheMomentApp.moment.list.edit')
		.controller('MomentEditController', MomentEditController);

	/**
	 * @ngdoc function
	 * @name captureTheMomentAppmoment.list.edit.provider:MomentEditController
	 * @description
	 * Provider of the {@link captureTheMomentAppmoment.list.edit.controller:MomentEditController MomentEditController}
	 * @param {Service} $state The state service to use
	 * @param {Service} $stateParams The stateParams service to use
	 * @param {Service} $mdDialog The dialog service to use
	 * @param {Service} Toast The Toast service to use
	 * @param {Service} MomentService The MomentService to use
	 * @param {Resource} moment The moment data to use
	 */

	MomentEditController.$inject = ['$state', '$stateParams', '$mdDialog', 'Toast', 'MomentService', 'moment'];

	function MomentEditController($state, $stateParams, $mdDialog, Toast, MomentService, moment) {
		var vm = this;

		// defaults
		vm.moment = angular.copy(moment, vm.moment);
		vm.displayName = moment.name;

		// view model bindings
		vm.update = update;
		vm.remove = remove;
		vm.goBack = goBack;
		vm.showList = showList;

		/**
		 * Open the detail state with the current moment
		 *
		 */
		function goBack() {
			$state.go('^.detail', {id: vm.moment._id});
		}

		/**
		 * Open the moment list state
		 *
		 */
		function showList() {
			$state.go('^');
		}
		/**
		 * Updates a moment by using the MomentService save method
		 * @param {Form} [form]
		 */
		function update(form) {
			// refuse to work with invalid data
			if (!vm.moment._id || form && !form.$valid) {
				return;
			}

			MomentService.update(vm.moment)
				.then(updateMomentSuccess)
				.catch(updateMomentCatch);

			function updateMomentSuccess(updatedMoment) {
				// update the display name after successful save
				vm.displayName = updatedMoment.name;
				Toast.show({text: 'Moment ' + vm.displayName + ' updated'});
				if (form) {
					form.$setPristine();
				}
			}

			function updateMomentCatch(err) {
				Toast.show({
					type: 'warn',
					text: 'Error while updating Moment ' + vm.displayName,
					link: {state: $state.$current, params: $stateParams}
				});

				if (form && err) {
					form.setResponseErrors(err.data);
				}
			}
		}

		/**
		 * Show a dialog to ask the moment if she wants to delete the current selected moment.
		 * @param {AngularForm} form - The form to pass to the remove handler
		 * @param {$event} ev - The event to pass to the dialog service
		 */
		function remove(form, ev) {
			var confirm = $mdDialog.confirm()
				.title('Delete moment ' + vm.displayName + '?')
				.content('Do you really want to delete moment ' + vm.displayName + '?')
				.ariaLabel('Delete moment')
				.ok('Delete moment')
				.cancel('Cancel')
				.targetEvent(ev);

			$mdDialog.show(confirm)
				.then(performRemove);

			/**
			 * Removes a moment by using the MomentService remove method
			 * @api private
			 */
			function performRemove() {
				MomentService.remove(vm.moment)
					.then(deleteMomentSuccess)
					.catch(deleteMomentCatch);

				function deleteMomentSuccess() {
					Toast.show({type: 'success', text: 'Moment ' + vm.displayName + ' deleted'});
					vm.showList();
				}

				function deleteMomentCatch(err) {
					Toast.show({
						type: 'warn',
						text: 'Error while deleting moment ' + vm.displayName,
						link: {state: $state.$current, params: $stateParams}
					});

					if (form && err) {
						form.setResponseErrors(err, vm.errors);
					}
				}
			}
		}
	}
})();
