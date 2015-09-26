var util_services_1 = require('../../main/util.services');
var recordMomentDialogController = (function () {
    function recordMomentDialogController($scope, $mdDialog, userMediaProvider, audioContext) {
        this.closeDialog = function () {
            $mdDialog.cancel();
        };
        this.audioContext = audioContext;
        this.getUserMediaProvider = userMediaProvider;
        this.recordUserMedia();
        $scope.hashtags = [];
    }
    recordMomentDialogController.prototype.recordUserMedia = function () {
        var _this = this;
        var client = new BinaryClient('ws://localhost:9001');
        client.on('open', function () {
            this.stream = client.createStream();
        });
        var onAudio = function (e) {
            if (!this.stream || !this.stream.writable)
                return;
            var left = e.inputBuffer.getChannelData(0);
            this.stream.write(util_services_1.convertFloat32ToInt16(left));
        };
        this.getUserMediaProvider({
            audio: true
        }).then(function (stream) {
            var audioInput = _this.audioContext.createMediaStreamSource(stream);
            var bufferSize = 2048;
            var recorder = _this.audioContext.createScriptProcessor(bufferSize, 1, 1);
            recorder.onaudioprocess = onAudio;
            audioInput.connect(recorder);
            recorder.connect(_this.audioContext.destination);
            var source = _this.audioContext.createMediaStreamSource(stream);
            var filter = _this.audioContext.createBiquadFilter();
            filter.frequency.value = 200;
            filter.type = 'highpass';
            var gain = _this.audioContext.createGain();
            gain.gain.value = 0;
            source.connect(filter);
            filter.connect(gain);
            gain.connect(_this.audioContext.destination);
        }, function (err) {
            console.log(err);
        });
    };
    return recordMomentDialogController;
})();
exports.recordMomentDialogController = recordMomentDialogController;
