/**
 * Module for the controller definition of the moment api.
 * The MomentController is handling /api/moments requests.
 * @module {moment:controller~MomentController} moment:controller
 * @requires {@link ParamController}
 */
'use strict';

module.exports = MomentController;

var ParamController = require('../../lib/controllers/param.controller');

/**
 * The Moment model instance
 * @type {moment:model~Moment}
 */
var Moment = require('./moment.model').model;

/**
 * MomentController constructor
 * @classdesc Controller that handles /api/moments route requests
 * for the moment api.
 * Uses the 'momentId' parameter and the 'momentParam' request property
 * to operate with the [main moment API Model]{@link moment:model~Moment} model.
 * @constructor
 * @inherits ParamController
 * @see moment:model~Moment
 */
function MomentController(router) {
	ParamController.call(this, Moment,  router);

	// modify select only properties
	// this.select = ['-__v'];

	// omit properties on update
	// this.omit = ['hashedPassword'];

	// property to return (maybe a virtual getter of the model)
	// this.defaultReturn = 'profile';
}

// define properties for the MomentController here
MomentController.prototype = {

	/**
	 * Set our own constructor property for instanceof checks
	 * @private
	 */
	constructor: MomentController

};

// inherit from ParamController
MomentController.prototype = Object.create(ParamController.prototype);

