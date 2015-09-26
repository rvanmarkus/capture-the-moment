/** @ngInject */
export class LoginController {
  constructor($scope, $firebaseAuth, $location){
    this.ref = new Firebase('https://emoment.firebaseio.com');
    this.usersRef = this.ref.child('users');
    this.authObj = $firebaseAuth(this.ref);
    this.location = $location;
  }
  authenticate() {
    this.authObj.$authWithOAuthPopup('twitter').then((authData) => {
      this.twitter = authData.twitter;
      this.authData = authData;
      this.usersRef.push({
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
  unauthenticate() {
    this.ref.unauth();
    console.log('logged out');
  }
}
