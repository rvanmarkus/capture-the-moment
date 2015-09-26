import {convertFloat32ToInt16} from '../../main/util.services'

interface recordDialogScope extends ng.IScope {
  closeDialog: Function;
  hashtags: Array;
}
/** @ngInject */
export class recordMomentDialogController {
  private getUserMediaProvider;
  private audioContext;
  private client;
  private $scope;
  private outputStream;
  private $mdDialog;
  private $mdToast;
  private user;
  private emomentsRef;

  constructor($scope:recordDialogScope, $mdDialog:ng.material.IDialogService, userMediaProvider, audioContext, $timeout, $firebaseAuth, $mdToast: any, userServices){
    this.$mdToast = $mdToast;
    this.audioContext = audioContext;
    this.getUserMediaProvider = userMediaProvider;
    this.$scope = $scope;
    this.$mdDialog = $mdDialog;



    this.recordUserMedia();
    this.$scope.hashtags = [];

    this.user = userServices.getUser();
    this.emomentsRef = userServices.emomentsRef;
  }

  public postEmoment() {
    let timestamp = new Date().getTime();
    this.emomentsRef.push({
      profilePicture: this.user.profileImageURL,
      title: 'sddsaf',
      hashtags: this.$scope.hashtags,
      timestamp: timestamp
    });
    this.$scope.closeDialog();
    this.$mdToast.show(
      this.$mdToast.simple().content('Emoment successfully posted!').hideDelay(2500);
    );
  }

  public closeDialog(){
    this.$mdDialog.cancel();
  }

  public recordUserMedia(){
    var client = new BinaryClient('ws://192.168.178.20:9001');

    var onAudio = (e) => {
      if(!window.outputStream || !window.outputStream.writable)
        return;
      var left = e.inputBuffer.getChannelData(0);
      window.outputStream.write(convertFloat32ToInt16(left));
    }

    client.on('stream', (stream, meta) => {

      // collect stream data
      var parts = [];
      stream.on('data', (data) =>{
        this.$scope.currentMedia = data;
        this.$scope.$apply();
        console.log(data);
        parts.push(data);
      });
      // when finished, set it as the background image
      stream.on('end', function(){
        //var url = (window.URL || window.webkitURL).createObjectURL(new Blob(parts));

        console.dir(new Blob(parts));

      });
    });


    client.on('open',()=> {
        window.outputStream = client.createStream();
      console.log('connection opened');



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
        filter.frequency.value = 0;
        filter.type = 'highpass';

        var gain = this.audioContext.createGain();
        gain.gain.value = 0;

        source.connect(filter);
        filter.connect(gain);
        gain.connect(this.audioContext.destination);



        //console.log('audio stream opened');
        //var audioInput = this.audioContext.createMediaStreamSource(stream);
        //var bufferSize = 2048;
        //console.log('audio stream created');
        //
        //var recorder = this.audioContext.createScriptProcessor(bufferSize, 1, 1);
        //recorder.onaudioprocess = processAudio;
        //
        //function processAudio(e) {
        //  var left = e.inputBuffer.getChannelData(0);
        //  window.outputStream.write(convertFloat32ToInt16(left));
        //  console.log('data');
        //}
        //
        //audioInput.connect(recorder);
        //recorder.connect(this.audioContext.destination)


      }, function(err) {
        console.log(err)
      });
    });
  }
}
function convertFloat32ToInt16(buffer) {
  var l = buffer.length;
  var buf = new Int16Array(l);
  while (l--) {
    buf[l] = Math.min(1, buffer[l])*0x7FFF;
  }
  return buf.buffer;
}
