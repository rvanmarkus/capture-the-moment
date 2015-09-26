/** @ngInject */
export function UserServices($firebaseAuth){
  this.user = {};
  this.ref = new Firebase('https://emoment.firebaseio.com');
  this.usersRef = this.ref.child('users');
  this.emomentsRef = this.ref.child('emoments');

  this.authenticate = function() {
    return this.authObj.$authWithOAuthPopup('twitter').then((authData) => {
      this.user = authData;
      this.authData = authData;
      this.usersRef.push(this.user);
      return this.user;

    }).catch(function(error) {
      console.error("Authentication failed: ", error);
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
    user: this.user,
    getAllMoments: this.getAllMoments,
    userIsLoggedIn: this.userIsLoggedIn,
    authObj : $firebaseAuth(this.ref)
  }
}
