/** @ngInject */
export function UserServices($firebaseAuth, user, $scope){
  this.ref = new Firebase('https://emoment.firebaseio.com');
  this.usersRef = this.ref.child('users');
  this.emomentsRef = this.ref.child('emoments');
  this.authObj = $firebaseAuth(this.ref);
  this.$scope = $scope;

  this.authenticate = function() {
    return this.authObj.$authWithOAuthPopup('twitter').then((authData) => {
      this.twitter = authData.twitter;
      this.authData = authData;
      this.user = {
        "username": this.twitter.username,
        "displayName": this.twitter.displayName,
        "profileImageURL": this.twitter.profileImageURL,
        "settings" : {
          "notifications" : true,
          "autocapture" : false
        }
      }
      this.usersRef.child(this.user.username).set(this.user);
      return this.user;
    }).catch(function(error) {
      console.log("Authentication failed: ", error);
    });
  };

  this.getAllMoments = function(){
    //all moments voor user ophalen en returnen
      return $firebaseArray(this.ref);

  };

  this.userIsLoggedIn = function(){
    return this.authData;
  };

  this.getUser = function(){
    return this.user;
  };

  this.logout = function() {
    this.ref.unauth();
  }

  return {
    authenticate: this.authenticate,
    getUser: this.getUser,
    logout: this.logout,
    user: this.user,
    getAllMoments: this.getAllMoments,
    userIsLoggedIn: this.userIsLoggedIn,
    authObj : $firebaseAuth(this.ref),
    usersRef: this.usersRef,
    emomentsRef: this.emomentsRef
  }
}
