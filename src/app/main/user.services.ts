/** @ngInject */
export function UserServices($firebaseAuth, user){
  var ref = new Firebase('https://emoment.firebaseio.com');
  var usersRef = ref.child('users');
  var emomentsRef = ref.child('emoments');
  this.authObj = $firebaseAuth(ref);


  var user = this.authenticate = function() {
    return this.authObj.$authWithOAuthPopup('twitter').then((authData) => {
      this.twitter = authData.twitter;
      this.authData = authData;
      user = {
        "username": this.twitter.username,
        "displayName": this.twitter.displayName,
        "profilePicture": this.twitter.profileImageURL,
        "settings": {
          "notifications": true,
          "autocapture": false
        }
      };
      usersRef.child(this.twitter.username).set(user)
      return user;

    }).catch(function(error) {
      console.log("Authentication failed: ", error);
    });
  };

  this.getAllMoments = function(){
    //all moments voor user ophalen en returnen
      return $firebaseArray(ref);
  };

  this.userIsLoggedIn = function(){
    return this.authData;
  };

  this.get = (userId)=> {
    return $firebase(ref.child('users').child(userId)).$asObject();
  };

  this.getUser = function(){
    return user;
  };

  this.logout = function() {
    ref.unauth();
  }

  this.getUserSettings = function () {
    return this.get(this.twitter.username).child('settings');
  }

  return {
    authenticate: this.authenticate,
    getUser: this.getUser,
    logout: this.logout,
    ref: ref,
    user: user,
    getAllMoments: this.getAllMoments,
    userIsLoggedIn: this.userIsLoggedIn,
    authObj : this.authObj,
    usersRef: usersRef,
    get: this.get,
    emomentsRef: emomentsRef
  }
}
