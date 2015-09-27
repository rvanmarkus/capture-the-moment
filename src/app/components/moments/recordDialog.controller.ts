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
  private beatgridSyncIsStarted;
  private beatgridHistoryStack;

  public static BEATGRID_STARTED = 'Fingerprint store prepared';

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

    this.beatgridSyncIsStarted = false;
    this.beatgridHistoryStack = [];


  }

  public postEmoment() {
    this.getMetaData();
    let timestamp = new Date().getTime();
    this.emomentsRef.push({
      'user': this.user.username,
      'profilePicture': this.user.profilePicture,
      'fingerprint': this.$scope.currentMedia,
      'hashtags': this.$scope.hashtags,
      'timestamp': timestamp
    });
    this.closeDialog();
    this.$mdToast.show(
      this.$mdToast.simple().content('Emoment successfully posted!').hideDelay(2500)
    );
  }

  static getMetaData(yoMama = '1443295586, 5, test/Qtier - Set Me On (David August Remix).cas, 111440'){

    yoMama.split(',');
    // GET IT?!
    const meh = [];
    let hellNawh = yoMama.split(',');
    for (var i = 0; i < hellNawh.length; i++) {
      meh.push(hellNawh[i].trim());
    }
    return {
      'timestamp': meh[0],
      'timeAgo': meh[1],
      'song': meh[2],
      'random': meh[3]
    };

  }

  public processBeatgridData(data) {
      this.$scope.currentMedia = data;
      if(! this.beatgridSyncIsStarted){
        if(data == recordMomentDialogController.BEATGRID_STARTED_IDENTIFIER){
            alert('ready');
        }
      }
      this.$scope.$apply();
      console.log(data);
      this.beatgridHistoryStack.push(data);
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
    };

    client.on('stream', (stream, meta) => {

      // collect stream data
      stream.on('data', this.processBeatgridData);
      stream.on('end', ()=>{
        console.dir(new Blob(this.beatgridHistoryStack));
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

        // filter
        var source = this.audioContext.createMediaStreamSource(stream);
        var filter = this.audioContext.createBiquadFilter();
        filter.frequency.value = 0;
        filter.type = 'highpass';

        var gain = this.audioContext.createGain();
        gain.gain.value = 0;

        source.connect(filter);
        filter.connect(gain);
        gain.connect(this.audioContext.destination);

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
