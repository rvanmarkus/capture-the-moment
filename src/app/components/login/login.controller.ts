/** @ngInject */
export class LoginController {
  constructor($scope, $firebaseAuth){
    var ref = new Firebase('https://emoment.firebaseio.com');
    this.authObj = $firebaseAuth(ref);
  }
  authenticate($JOEMKANSJKDL) {
    this.authObj.$authWithOAuthPopup('twitter').then(function(authData) {
      console.log("Logged in as:", authData.twitter.username);
    }).catch(function(error) {
      console.error("Authentication failed:", error);
    });
  }
}
