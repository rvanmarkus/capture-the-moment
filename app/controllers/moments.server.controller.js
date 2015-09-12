'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
	Moment = mongoose.model('Moment'),
	_ = require('lodash');

/**
 * Get the error message from error object
 */
var getErrorMessage = function(err) {
	var message = '';

	if (err.code) {
		switch (err.code) {
			case 11000:
			case 11001:
				message = 'Moment already exists';
				break;
			default:
				message = 'Something went wrong';
		}
	} else {
		for (var errName in err.errors) {
			if (err.errors[errName].message) message = err.errors[errName].message;
		}
	}

	return message;
};

/**
 * Create a Moment
 */
exports.create = function(req, res) {
	var moment = new Moment(req.body);
	moment.user = req.user;

	moment.save(function(err) {
		if (err) {
			return res.send(400, {
				message: getErrorMessage(err)
			});
		} else {
			res.jsonp(moment);
		}
	});
};

/**
 * Show the current Moment
 */
exports.read = function(req, res) {
	res.jsonp(req.moment);
};

/**
 * Update a Moment
 */
exports.update = function(req, res) {
	var moment = req.moment;

	moment = _.extend(moment, req.body);

	moment.save(function(err) {
		if (err) {
			return res.send(400, {
				message: getErrorMessage(err)
			});
		} else {
			res.jsonp(moment);
		}
	});
};

/**
 * Delete an Moment
 */
exports.delete = function(req, res) {
	var moment = req.moment;

	moment.remove(function(err) {
		if (err) {
			return res.send(400, {
				message: getErrorMessage(err)
			});
		} else {
			res.jsonp(moment);
		}
	});
};

/**
 * List of Moments
 */
exports.list = function(req, res) {
	Moment.find().sort('-created').populate('user', 'displayName').exec(function(err, moments) {
		if (err) {
			return res.send(400, {
				message: getErrorMessage(err)
			});
		} else {
			res.jsonp(moments);
		}
	});
};

/**
 * Moment middleware
 */
exports.momentByID = function(req, res, next, id) {
	Moment.findById(id).populate('user', 'displayName').exec(function(err, moment) {
		if (err) return next(err);
		if (!moment) return next(new Error('Failed to load Moment ' + id));
		req.moment = moment;
		next();
	});
};

/**
 * Moment authorization middleware
 */
exports.hasAuthorization = function(req, res, next) {
	if (req.moment.user.id !== req.user.id) {
		return res.send(403, 'User is not authorized');
	}
	next();
};
