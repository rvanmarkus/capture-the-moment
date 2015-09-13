(function () {
	'use strict';

	/**
	 * Introduce the captureTheMomentApp.moment.service module.
	 * Register the moment resource as Moment, register the
	 * service as MomentService.
	 *
	 * @requires {captureTheMomentApp.resource}
	 */
	angular
		.module('captureTheMomentApp.moment.service', ['captureTheMomentApp.resource'])
		.factory('Moment', Moment)
		.service('MomentService', MomentService);

	// add Moment dependencies to inject
	Moment.$inject = ['Resource'];

	/**
	 * Moment resource constructor
	 */
	function Moment($resource) {
		// factory members
		var apiURL = '/api/moments';
		// public API
		return $resource(apiURL + '/:id/:controller');
	}

	// add MomentService dependencies to inject
	MomentService.$inject = ['Moment'];

	/**
	 * MomentService constructor
	 * AngularJS will instantiate a singleton by calling "new" on this function
	 *
	 * @param {$resource} Moment The resource provided by captureTheMomentApp.moment.resource
	 * @returns {Object} The service definition for the MomentService service
	 */
	function MomentService(Moment) {

		return {
			create: create,
			update: update,
			remove: remove
		};

		/**
		 * Save a new moment
		 *
		 * @param  {Object}   moment - momentData
		 * @param  {Function} callback - optional
		 * @return {Promise}
		 */
		function create(moment, callback) {
			var cb = callback || angular.noop;

			return Moment.create(moment,
				function (moment) {
					return cb(moment);
				},
				function (err) {
					return cb(err);
				}).$promise;
		}

		/**
		 * Remove a moment
		 *
		 * @param  {Object}   moment - momentData
		 * @param  {Function} callback - optional
		 * @return {Promise}
		 */
		function remove(moment, callback) {
			var cb = callback || angular.noop;

			return Moment.remove({id: moment._id},
				function (moment) {
					return cb(moment);
				},
				function (err) {
					return cb(err);
				}).$promise;
		}

		/**
		 * Create a new moment
		 *
		 * @param  {Object}   moment - momentData
		 * @param  {Function} callback - optional
		 * @return {Promise}
		 */
		function update(moment, callback) {
			var cb = callback || angular.noop;

			return Moment.update(moment,
				function (moment) {
					return cb(moment);
				},
				function (err) {
					return cb(err);
				}).$promise;
		}
	};
})();
