/** @ngInject */
export function UserServices($firebaseObject, $firebaseAuth, $firebaseArray, user){
  var ref = new Firebase('https://emoment.firebaseio.com');
  var usersRef = ref.child('users');
  var emomentsRef = ref.child('emoments');
  this.authObj = $firebaseAuth(ref);
  function authHandler(authData) {
    if (authData) {
      console.log("User " + authData.uid + " is logged in with " + authData.provider);
      console.log(authData);
    } else {
      console.log("User is logged out");
    }
  };
  this.$firebaseObject = $firebaseObject;
  var user = this.authenticate = function(this.authObj) {
    return this.authObj.$authWithOAuthPopup('twitter', authHandler).then((authData) => {
      this.twitter = authData.twitter;
      this.authData = authData;
      usersRef.child(this.twitter.username).once('value', function(snapshot) {
        console.log(snapshot.val());
        if (snapshot.val() === null) {
          console.log('user does not exist');
          usersRef.child(user.username).set(user);
          console.log('created user');
        } else {
          console.log('user exists. logging in');
        }
      });
      user = {
        "username": this.twitter.username,
        "displayName": this.twitter.displayName,
        "profilePicture": this.twitter.profileImageURL,
        "settings": {
          "Notifications": false,
          "Autocapture on startup": false
        }
      };
      user = authData.twitter;
      user.settings = {
          "Notifications": false,
          "Autocapture on startup": false
      };

      return user;
    }).catch(function (error) {
      console.log("Authentication failed: ", error);
    });
  };

  //this.userAuthenticate = function(){
  //  ref.authWithOAuthPopup("twitter", function(error, authData) {
  //    if (error) {
  //      console.log("Login Failed!", error);
  //    } else {
  //      console.log("Authenticated successfully with payload:", authData);
  //    }
  //  });
  //};
  //
  this.syncUserSettings = function() {
    console.log('variable user.username is set to ' + this.twitter.username);
    // create a reference to the database where we will store our data
    var userRef = usersRef.child(this.twitter.username);
    console.log('userRef: '+ userRef);
    var settingsRef = userRef.child('settings');
    console.log('settingsRef: ' + settingsRef);
    var settingsObj = $firebaseObject(settingsRef);
    console.log('settingsObj: ' + settingsObj);
    return settingsObj;
  };

  this.userIsLoggedIn = function(){
    return (this.authData);
  };

  this.get = (userId)=> {
    return $firebaseObject(ref.child('users').child(userId));
  };

  this.getUser = function(){
    return user;
  };

  this.logout = function(ref) {
    console.log('logout is clicked');
    return ref.unauth();
  };

  return {
    userAuthenticate: this.userAuthenticate,
    authHandler: authHandler,
    authData: this.authData,
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
    emomentsRef: emomentsRef,
    syncUserSettings: this.syncUserSettings
  }
}
