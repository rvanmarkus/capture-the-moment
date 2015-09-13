/* jshint unused:false */
'use strict';

var should = require('should');
var app = require('../../app');
var request = require('supertest');
var momentModel = require('./moment.model');

// Clear all moments
function cleanup(done) {
	momentModel.model.remove().exec().then(function () { done();	});
}

describe('/api/moments', function () {

	var moment;

	// reset moment before each test
	beforeEach(function () {
		moment = {
			name: 'Dog',
			info: 'Hello, this is dog.',
			active: true
		};
	});

	// Clear moments before each test
	beforeEach(cleanup);

	// Clear moments after each test
	afterEach(cleanup);

	describe('GET', function () {

		it('should respond with JSON array', function (done) {
			request(app)
				.get('/api/moments')
				.set('Accept', 'application/json')
				.expect(200)
				.expect('Content-Type', /json/)
				.end(function (err, res) {
					if (err) {
						return done(err);
					}
					res.body.should.be.instanceof(Array);
					done();
				});
		});

		it('should respond with an error for a malformed moment id parameter', function (done) {
			request(app)
				.get('/api/moments/malformedid')
				.set('Accept', 'application/json')
				.expect(400)
				.expect('Content-Type', /json/)
				.end(done);
		});

		it('should respond with an not found error for a not existing moment id', function (done) {
			request(app)
				.get('/api/moments/cccccccccccccccccccccccc')
				.set('Accept', 'application/json')
				.expect(404)
				.expect('Content-Type', /json/)
				.end(done);
		});

		it('should return a moment for its id', function (done) {
			momentModel.model(moment).save(function (err, doc) {
				request(app)
					.get('/api/moments/' + doc._id)
					.set('Accept', 'application/json')
					.expect(200)
					.expect('Content-Type', /json/)
					.end(function (err, res) {
						if (err) {
							return done(err);
						}
						res.body.should.be.an.Object.and.have.properties(moment);
						res.body._id.should.exist;
						done();
					});
			});
		});

	});

	describe('POST', function () {

		it('should create a new moment and respond with 201 and the created moment', function (done) {
			request(app)
				.post('/api/moments')
				.set('Accept', 'application/json')
				.send(moment)
				.expect(201)
				.expect('Content-Type', /json/)
				.end(function (err, res) {
					if (err) {
						return done(err);
					}
					res.body.should.be.an.Object.and.have.properties(moment);
					res.body._id.should.exist;
					done();
				});
		});

	});

	describe('PUT', function () {

		it('should return an error if attempting a put without an id', function (done) {
			request(app)
				.put('/api/moments')
				.set('Accept', 'application/json')
				.send(moment)
				.expect(404)
				.end(done);
		});

		it('should respond with an not found error for a not existing moment id', function (done) {
			request(app)
				.put('/api/moments/cccccccccccccccccccccccc')
				.set('Accept', 'application/json')
				.expect(404)
				.expect('Content-Type', /json/)
				.end(done);
		});

		it('should update a moment and respond with the updated moment', function (done) {
			request(app)
				.post('/api/moments')
				.set('Accept', 'application/json')
				.send(moment)
				.end(function (err, res) {
					if (err) {
						return done(err);
					}
					moment.name = 'Cat';
					// check if id is stripped on update
					moment._id = 'malformed id string';
					request(app)
						.put('/api/moments/' + res.body._id)
						.set('Accept', 'application/json')
						.send(moment)
						.expect(200)
						.expect('Content-Type', /json/)
						.end(function (err, res) {
							if (err) {
								return done(err);
							}
							res.body.should.be.an.Object.and.have.property('name', moment.name);
							done();
						});
				});
		});

	});

	describe('DELETE', function () {

		it('should return an error if attempting a delete without an id', function (done) {
			request(app)
				.delete('/api/moments')
				.set('Accept', 'application/json')
				.expect(404)
				.end(done);
		});

		it('should respond with an not found error for a not existing moment id', function (done) {
			request(app)
				.delete('/api/moments/cccccccccccccccccccccccc')
				.set('Accept', 'application/json')
				.expect(404)
				.expect('Content-Type', /json/)
				.end(done);
		});

		it('should delete a moment and respond with 204', function (done) {
			request(app)
				.post('/api/moments')
				.set('Accept', 'application/json')
				.send(moment)
				.end(function (err, res) {
					if (err) {
						return done(err);
					}
					request(app)
						.delete('/api/moments/' + res.body._id)
						.set('Accept', 'application/json')
						.expect(204)
						.end(done);
				});
		});
	});
});
