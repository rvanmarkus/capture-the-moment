/**
 * @ngdoc controller
 * @name captureTheMomentApp.admin.user.list.detail.controller:UserDetailController
 * @description
 * Controller for the user detail page of the admin section
 */

(function () {
	'use strict';

	/**
	 * Register the edit controller as UserDetailController
	 */
	angular
		.module('captureTheMomentApp.admin.user.list.detail')
		.controller('UserDetailController', UserDetailController);

	/**
	 * @ngdoc function
	 * @name captureTheMomentApp.admin.user.list.detail.provider:UserDetailController
	 * @description
	 * Provider of the {@link captureTheMomentApp.admin.user.list.detail.controller:UserDetailController UserDetailController}
	 *
	 * @param {Service} $state The state service to use
	 * @param {User|Object} user The user data to use
	 * @param {Service} Auth The Auth service to use
	 * @returns {Service} {@link captureTheMomentApp.admin.user.list.detail.controller:UserDetailController UserDetailController}
	 */

	UserDetailController.$inject = ['$state', 'user', 'Auth'];

	function UserDetailController($state, user, Auth) {
		var vm = this;

		// switch to the edit state
		vm.edit = edit;
		// switch to the parent state
		vm.goBack = goBack;

		/**
		 * @ngdoc property
		 * @name user
		 * @propertyOf captureTheMomentApp.admin.user.list.detail.controller:UserDetailController
		 * @description
		 * the current user object
		 * @returns {User|Object} the current user object
		 */
		vm.user = user;

		/**
		 * @ngdoc property
		 * @name userRole
		 * @propertyOf captureTheMomentApp.admin.user.list.detail.controller:UserDetailController
		 * @description
		 * get role name of the displayed user
		 * @returns {String} Name of the user role of the currently displayed user
		 */
		vm.userRole = Auth.getRole(vm.user).name;

		/**
		 * @ngdoc property
		 * @name isRoot
		 * @propertyOf captureTheMomentApp.admin.user.list.detail.controller:UserDetailController
		 * @description
		 * check if the current displayed user has the root role
		 * @returns {Boolean} True if the currently displayed in user is root
		 */
		vm.isRoot = Auth.hasRole('root', vm.user);

		/**
		 * @ngdoc property
		 * @name currentIsRoot
		 * @propertyOf captureTheMomentApp.admin.user.list.detail.controller:UserDetailController
		 * @description
		 * check if the current logged in user has the root role
		 * @returns {Boolean} True if the currently logged in user is root
		 */
		vm.currentIsRoot = Auth.hasRole('root');

		/**
		 * @ngdoc function
		 * @name edit
		 * @methodOf captureTheMomentApp.admin.user.list.detail.controller:UserDetailController
		 * @description
		 * Open the edit state with the current user
		 */
		function edit() {
			$state.go('^.edit', {'id': vm.user._id});
		}

		/**
		 * @ngdoc function
		 * @name goBack
		 * @methodOf captureTheMomentApp.admin.user.list.detail.controller:UserDetailController
		 * @description
		 * Return to the parent state
		 */
		function goBack() {
			$state.go('^');
		}
	}
})();
