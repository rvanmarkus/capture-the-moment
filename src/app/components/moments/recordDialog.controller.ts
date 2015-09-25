import {convertFloat32ToInt16} from '../../main/util.services'

interface recordDialogScope extends ng.IScope {
  closeDialog: Function;
  hashtags: Array;
}
/** @ngInject */
export class recordMomentDialogController {
  private getUserMediaProvider;
  private audioContext;

  constructor($scope:recordDialogScope, $mdDialog:ng.material.IDialogService, userMediaProvider, audioContext){
    $scope.closeDialog=()=>{
      $mdDialog.cancel();
    };

    this.audioContext = audioContext;
    this.getUserMediaProvider = userMediaProvider;
    this.recordUserMedia();

    $scope.hashtags = [];
    $scope.closeDialog=()=>{
      $mdDialog.cancel();
    }
  }

  public recordUserMedia(){
    var client = new BinaryClient('ws://localhost:9001');
    client.on('open', function(){
      this.stream = client.createStream();
    });

    var onAudio = function(e) {
      if(!this.stream  || !this.stream.writable)
        return;

      var left = e.inputBuffer.getChannelData(0);

      this.stream.write(convertFloat32ToInt16(left));
    };


    this.getUserMediaProvider({
      audio: true
    }).then((stream) => {
      var audioInput = this.audioContext.createMediaStreamSource(stream);
      var bufferSize = 2048;

      var recorder = this.audioContext.createScriptProcessor(bufferSize, 1, 1);
      recorder.onaudioprocess = onAudio;
      audioInput.connect(recorder);
      recorder.connect(this.audioContext.destination);

      // mic in
      var source = this.audioContext.createMediaStreamSource(stream);
      var filter = this.audioContext.createBiquadFilter();
      filter.frequency.value = 200;
      filter.type = 'highpass';

      var gain = this.audioContext.createGain();
      gain.gain.value = 0;

      source.connect(filter);
      filter.connect(gain);
      gain.connect(this.audioContext.destination);

    }, function(err) {
      console.log(err)
    });

  }
}
