export function AudioContextService() {
  return new AudioContext();
}

/** @ngInject */
export function UserMediaProvider($window: ng.IWindowService) {
  return function (opts) {
    return new Promise(function (resolve, reject) {
      $window.navigator.getUserMedia = $window.navigator.getUserMedia ||
        $window.navigator.webkitGetUserMedia ||
        $window.navigator.mozGetUserMedia;
      $window.navigator.webkitGetUserMedia(opts, resolve, reject);
    });
  };
}
export function convertFloat32ToInt16(buffer) {
  var l = buffer.length;
  var buf = new Int16Array(l);
  while (l--) {
    buf[l] = Math.min(1, buffer[l])*0x7FFF;
  }
  return buf.buffer;
}

export function keyPressHandler() {
  console.log('neeneeneee');

  $(document).keypress(function(e) {
    console.log("This key was pressed: " + e.keyCode + ", charcode: " + e.charCode);
    console.log($('md-toolbar'));
    console.log
    if (e.keyCode == 27) { //
      console.log('okasdsasdfasdf');
    }
    else {
      console.log('rwrsd')
    }
  });
}

//./match -d /Users/XebiaLeenlaptop/beatgrid/bla.car --match-first -s match.first.suppress_updates=false -v
