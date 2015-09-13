/* jshint unused:false */
'use strict';

var should = require('should');

var moment = require('./moment.model');
var momentDefinition = moment.definition;
var momentSchema= moment.schema;
var Moment = moment.model;

var momentData = [
	{
		name: 'Dog',
		info: 'Hello, this is dog.',
		active: true
	}, {
		name: 'Bugs Bunny',
		info: 'Famous Bunny.',
		active: true
	}, {
		name: 'Nyan Cat',
		info: 'No comment.',
		active: false
	}
];

// Clear all moments
function cleanup(done) {
	Moment.remove().exec().then(function () { done();	});
}

describe('Moment Model', function () {

	// Clear moments before testing
	before(cleanup);

	// Clear moments after testing
	after(cleanup);

// Check test conditions for moment tests
	it('should start with no moments', function (done) {
		Moment.find({}, function (err, moments) {
			moments.should.have.length(0);
			done(err);
		});
	});

	describe('basic crud operations', function () {

		var momentModel = new Moment(momentData[0]);

		// Clear moments after running this suite
		after(cleanup);

		it('should insert a new moment', function (done) {
			momentModel.save(function (err, moment) {
				moment.should.have.properties(momentModel);
				done(err);
			});
		});

		it('should insert a list of moments', function (done) {
			Moment.create(momentData, function (err, moment) {
				// slice err argument
				Array.prototype.slice.call(arguments, 1)
					.should.have.lengthOf(momentData.length);
				done(err);
			});
		});


		it('should find a moment by _id property', function (done) {
			Moment.findById(momentModel._id, function (err, moment) {
				moment.should.have.properties(momentData[0]);
				done(err);
			});
		});

		it('should update a moment', function (done) {
			momentModel.name = 'foo';
			momentModel.save(function (err) { done(err);	});
		});

		it('should remove a moment', function (done) {
			momentModel.remove(function (err) { done(err); });
		});
	}); // crud
});
