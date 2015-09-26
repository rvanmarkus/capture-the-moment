/** @ngInject */
export class LoginController {
  constructor($scope, $firebaseAuth, $location,  $mdToast: any){
    this.ref = new Firebase('https://emoment.firebaseio.com');
    this.usersRef = this.ref.child('users');
    this.authObj = $firebaseAuth(this.ref);
    this.location = $location;
    this.$mdToast = $mdToast;
    this.loginSuccessfull = function(){
      this.$mdToast.show(
        this.$mdToast.simple().content('Login Successfull!').hideDelay(2500);
      );
    }
  }
  authenticate() {
    this.authObj.$authWithOAuthPopup('twitter').then((authData) => {
      this.twitter = authData.twitter;
      this.authData = authData;
      this.user = {
        'uid': this.authData.uid,
        'username': this.twitter.username,
        'displayName': this.twitter.displayName,
        'profileImageURL': this.twitter.profileImageURL
      }
      this.usersRef.push(this.user);
      this.loginSuccessfull();
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
