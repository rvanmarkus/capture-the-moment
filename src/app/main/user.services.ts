/** @ngInject */
export function UserServices($firebaseObject, $firebaseAuth, $firebaseArray, user){
  var ref = new Firebase('https://emoment.firebaseio.com');
  var usersRef = ref.child('users');
  var emomentsRef = ref.child('emoments');
  this.authObj = $firebaseAuth(ref);
  this.$firebaseObject = $firebaseObject;
  var user = this.authenticate = function() {
    return this.authObj.$authWithOAuthPopup('twitter').then((authData) => {
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
      return user;
    }).catch(function (error) {
      console.log("Authentication failed: ", error);
    });
  };

  this.syncUserSettings = function() {
    console.log('variable user.username is set to ' + this.twitter.username);
    // create a reference to the database where we will store our data
    var userRef = usersRef.child(this.twitter.username);
    console.log('userRef: '+ userRef);
    var settingsRef = userRef.child('settings');
    console.log('settingsRef: ' + settingsRef);
    var settingsObj = $firebaseObject(settingsRef);
    console.log('settingsObj: ' + settingsObj);
    // return it as a synchronized object
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

  this.logout = function() {
    console.log('logout is clicked');
    return ref.unauth();
  };

  this.userSettings = function() {
    //return $firebaseObject(usersRef.child(this.twitter.username).child('settings'));
    return user.settings;
  };

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
    emomentsRef: emomentsRef,
    userSettings: this.userSettings,
    syncUserSettings: this.syncUserSettings
  }
}
