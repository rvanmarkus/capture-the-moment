/**
 * Module for registering broadcast updates to clients when
 * the Moment model changes. Exports the
 * [register function]{@link moment:socket~registerMomentSockets}
 * to register the model schema events on the socket instance.
 * @module {function} moment:socket
 * @requires {@link moment:model}
 */
'use strict';

/**
 * The Moment model instance
 * @type {moment:model~Moment}
 */
var Moment = require('./moment.model').model;

// export the function to register all socket broadcasts
exports.register = registerMomentSockets;

/**
 * Register Moment model change events on the passed socket
 * @param {socket.io} socket - The socket object to register the Moment model events on
 */
function registerMomentSockets(socket) {
	Moment.schema.post('save', function (doc) {
		onSave(socket, doc);
	});

	Moment.schema.post('remove', function (doc) {
		onRemove(socket, doc);
	});
}

/**
 * Emit a Moment save event on a socket object: 'moment:save'
 * @param {socket.io} socket - The socket object to emit the Moment save event on
 * @param {MogooseDocument} doc - The saved document that triggered the event
 * @param {function} cb - The callback function
 */
function onSave(socket, doc, cb) {
	socket.emit('moment:save', doc);
}

/**
 * Emit a Moment remove event on a socket object: 'moment:remove'
 * @param {socket.io} socket - The socket object to emit the Moment remove event on
 * @param {MogooseDocument} doc - The removed document that triggered the event
 * @param {function} cb - The callback function
 */
function onRemove(socket, doc, cb) {
	socket.emit('moment:remove', doc);
}
