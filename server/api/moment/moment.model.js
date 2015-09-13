/**
 * An module for defining and initializing the Moment model.
 * Exporting the Moment model definition, schema and model instance.
 * @module {Object} moment:model
 * @property {Object} definition - The [definition object]{@link moment:model~MomentDefinition}
 * @property {MongooseSchema} schema - The [mongoose model schema]{@link moment:model~MomentSchema}
 * @property {MongooseModel} model - The [mongoose model]{@link moment:model~Moment}
 */
'use strict';

var mongoose = require('mongoose');
var requestContext = require('mongoose-request-context');
var createdModifiedPlugin = require('mongoose-createdmodified').createdModifiedPlugin;

/**
 * The Moment model definition
 * @type {Object}
 * @property {String} name - The name of this moment
 * @property {String} info - Details about this moment
 * @property {Boolean} active - Flag indicating this moment is active
 */
var MomentDefinition = {
	name: { type: String, index: true },

	mediaref: {
		type: String,
		required: true
	},
	mediadate: {
		type: Date
	},
	created: {
		type: Date,
		default: Date.now
	},
	user: {
		type: mongoose.Schema.Types.ObjectId,
		ref: 'User'
	},
	meta: {
		votes: Number,
		favs:  Number
	},
	hashtags: {
		type: mongoose.Schema.Types.Mixed
	}
};

/**
 * The Moment model schema
 * @type {MongooseSchema}
 */
var MomentSchema = new mongoose.Schema(MomentDefinition);

/**
 * Attach security related plugins
 */
MomentSchema.plugin(createdModifiedPlugin);

MomentSchema.plugin(requestContext, {
	propertyName: 'modifiedBy',
	contextPath: 'request:acl.user.name'
});

/**
 * Validations
 */
MomentSchema
	.path('name')
	.validate(validateUniqueName, 'The specified name is already in use.');

/**
 *  The registered mongoose model instance of the Moment model
 *  @type {Moment}
 */
var Moment = mongoose.model('Moment', MomentSchema);

module.exports = {

	/**
	 * The Moment model definition object
	 * @type {Object}
	 * @see moment:MomentModel~MomentDefinition
	 */
	definition: MomentDefinition,

	/**
	 * The Moment model schema
	 * @type {MongooseSchema}
	 * @see moment:model~MomentSchema
	 */
	schema: MomentSchema,

	/**
	 * The Moment model instance
	 * @type {moment:model~Moment}
	 */
	model: Moment

};

/**
 * Validate the uniqueness of the given name
 *
 * @api private
 * @param {String} value - The username to check for uniqueness
 * @param {Function} respond - The callback function
 */
function validateUniqueName(value, respond) {
	// jshint validthis: true
	var self = this;

	// check for uniqueness of user name
	this.constructor.findOne({name: value}, function (err, moment) {
		if (err) {
			throw err;
		}

		if (moment) {
			// the searched name is my name or a duplicate
			return respond(self.id === moment.id);
		}

		respond(true);
	});
}
