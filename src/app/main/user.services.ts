/** @ngInject */
export function UserServices($firebaseAuth){
  this.user = {};
  this.ref = new Firebase('https://emoment.firebaseio.com');


  this.authenticate = function() {
    return this.authObj.$authWithOAuthPopup('twitter').then((authData) => {
      this.user = authData;
      this.authData = authData;
      this.usersRef.set({
        uid: this.authData.uid,
        username: this.user.twitter.username,
        displayName: this.user.twitter.displayName,
        profileImageURL: this.user.twitter.profileImageURL
      });
      return this.user;

    }).catch(function(error) {
      console.error("Authentication failed:", error);
    });
  };

  this.getAllMoments = function(){
    //all moments voor user ophalen en returnen
  };

  this.userIsLoggedIn = function(){
    return (this.authData)
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
    getAllMoments: this.getAllMoments,
    userIsLoggedIn: this.userIsLoggedIn,
    authObj : $firebaseAuth(this.ref)
  }
}
