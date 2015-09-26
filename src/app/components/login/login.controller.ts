/** @ngInject */
export class LoginController {
  constructor($scope, $firebaseAuth, $location){
    var ref = new Firebase('https://emoment.firebaseio.com');
    this.usersRef = ref.child('users');
    this.authObj = $firebaseAuth(ref);
    this.location = $location;
  }
  authenticate() {
    this.authObj.$authWithOAuthPopup('twitter').then((authData) => {
      this.twitter = authData.twitter;
      this.authData = authData;
      this.usersRef.set({
        uid: this.authData.uid,
        username: this.twitter.username,
        displayName: this.twitter.displayName,
        profileImageURL: this.twitter.profileImageURL
      });
      this.location.path('/');
    }).catch(function(error) {
      console.error("Authentication failed:", error);
    });
  }
}
