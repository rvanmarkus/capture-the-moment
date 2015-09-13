/**
 * Module for handling moment requests.
 * Initializing the [MomentController]{@link moment:controller~MomentController}
 * and configuring the express router to handle the moment api
 * for /api/moments routes. All Routes are registered after the
 * [request parameters]{@link moment:parameters} have been
 * added to the router instance.
 * Exports the configured express router for the moment api routes
 * @module {express.Router} moment
 * @requires {@link module:middleware}
 * @requires {@link moment:controller~MomentController}
 */
'use strict';

var router = require('express').Router();
var contextService = require('request-context');
var middleware = require('../../lib/middleware');
var MomentController = require('./moment.controller');
var auth = require('../../lib/auth/auth.service');

// Export the configured express router for the moment api routes
module.exports = router;

/**
 * The api controller
 * @type {moment:controller~MomentController}
 */
var controller = new MomentController(router);

// register moment route parameters, uncomment if needed
// var registerMomentParameters = require('./moment.params');
// registerMomentParameters(router);

// add context for auth sensitive resources
var addRequestContext = contextService.middleware('request');

// add the authenticated user to the created acl context
var addUserContext = auth.addAuthContext('request:acl.user');

// check if the request is made by an authenticated user with at least the user role
var isAuthenticated = auth.hasRole('user');

// apply auth middleware to all routes
router.route('*').all(addRequestContext, isAuthenticated, addUserContext);

// register moment routes
router.route('/')
	.get(controller.index)
	.post(controller.create);

router.route('/' + controller.paramString)
	.get(controller.show)
	.delete(controller.destroy)
	.put(controller.update)
	.patch(controller.update);
