'use strict';

// Moments controller
angular.module('moments').controller('MomentsController', ['$scope', '$stateParams', '$location', 'Authentication', 'Moments', 'audioContext','getUserMedia',
    function($scope, $stateParams, $location, Authentication, Moments, audioContext, getUserMedia) {
        $scope.authentication = Authentication;

      $scope.startStreamingMicrophone = function() {
        var client = new BinaryClient('ws://localhost:9001');
        client.on('open', function(){
          $scope.stream = client.createStream();
        });

        var onAudio = function(e) {
          if(!$scope.stream  || !$scope.stream.writable)
            return;

          var left = e.inputBuffer.getChannelData(0);

          $scope.stream .write(convertFloat32ToInt16(left));
        };


        getUserMedia({
          audio: true
        }).then(function(stream) {
          var audioInput = audioContext.createMediaStreamSource(stream);
          var bufferSize = 2048;

          var recorder = audioContext.createScriptProcessor(bufferSize, 1, 1);

          recorder.onaudioprocess = onAudio;

          audioInput.connect(recorder);

          recorder.connect(audioContext.destination);

          // mic in
          var source = audioContext.createMediaStreamSource(stream);
          var filter = audioContext.createBiquadFilter();
          filter.frequency.value = 200;
          filter.type = 'highpass';

          var gain = audioContext.createGain();
          gain.gain.value = 0;

          source.connect(filter);
          filter.connect(gain);
          gain.connect(audioContext.destination);

          $scope.hz = filter.frequency;
          $scope.gain = gain.gain;
          $scope.$apply();
        }, function(err) {
          console.log(err)
        });
      }


        // Create new Moment
        $scope.create = function() {
        	// Create new Moment object
            var moment = new Moments({
                name: this.name
            });

            // Redirect after save
            moment.$save(function(response) {
                $location.path('moments/' + response._id);
            }, function(errorResponse) {
				$scope.error = errorResponse.data.message;
			});

            // Clear form fields
            this.name = '';
        };

        // Remove existing Moment
        $scope.remove = function(moment) {
            if (moment) {
                moment.$remove();

                for (var i in $scope.moments) {
                    if ($scope.moments[i] === moment) {
                        $scope.moments.splice(i, 1);
                    }
                }
            } else {
                $scope.moment.$remove(function() {
                    $location.path('moments');
                });
            }
        };




      // Update existing Moment
        $scope.update = function() {
            var moment = $scope.moment;

            moment.$update(function() {
                $location.path('moments/' + moment._id);
            }, function(errorResponse) {
				$scope.error = errorResponse.data.message;
			});
        };

        // Find a list of Moments
        $scope.find = function() {
            $scope.moments = Moments.query();
        };

        // Find existing Moment
        $scope.findOne = function() {
            $scope.moment = Moments.get({
                momentId: $stateParams.momentId
            });
        };
    }
]);
