'use strict';

angular.module('moments').factory('audioContext', function() {

  return new AudioContext();
}).factory('getUserMedia', function($window) {
  return function(opts) {
    return new Promise(function(resolve, reject) {
      $window.navigator.webkitGetUserMedia(opts, resolve, reject);
    });
  };
});
