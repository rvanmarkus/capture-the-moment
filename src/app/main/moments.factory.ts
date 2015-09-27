/** @ngInject */
export function MomentsFactory($firebaseArray, FIREBASE_URL, userServices, $q) {
  var ref = new Firebase(FIREBASE_URL);

  var moments = {
    get: function (momentId) {
      return $firebaseArray(ref.child('emoments').child(momentId));
    },
    getAllMoments: function() {
      return  $firebaseArray(ref.child('emoments'));
    }
  };

  return moments;
}
