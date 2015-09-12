'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
	Schema = mongoose.Schema;

/**
 * Moment Schema
 */
var MomentSchema = new Schema({
	name: {
		type: String,
		default: '',
		required: 'Please fill Moment name',
		trim: true
	},
  comments: [{ body: String, date: Date, user: {type: Schema.ObjectId, ref: 'User'} }],
	created: {
		type: Date,
		default: Date.now
	},
	user: {
		type: Schema.ObjectId,
		ref: 'User'
	},
  meta: {
    votes: Number,
    favs:  Number
  }
});

mongoose.model('Moment', MomentSchema);
