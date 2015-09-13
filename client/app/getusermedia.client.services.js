'use strict';

angular.module('captureTheMomentApp').factory('audioContext', function() {
  return new AudioContext();
}).factory('getUserMedia', function($window) {
  return function(opts) {
    return new Promise(function(resolve, reject) {
      $window.navigator.webkitGetUserMedia(opts, resolve, reject);
    });
  };
});
function convertFloat32ToInt16(buffer) {
  var l = buffer.length;
  var buf = new Int16Array(l);
  while (l--) {
    buf[l] = Math.min(1, buffer[l])*0x7FFF;
  }
  return buf.buffer;
}
