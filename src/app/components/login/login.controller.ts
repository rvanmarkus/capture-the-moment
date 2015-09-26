/** @ngInject */
export class LoginController {
  constructor($scope, userServices, $location){
    this.location = $location;
    this.userServices = userServices
  }
  authenticate() {
    this.userServices.authenticate().then((user)=>{
      this.location.path('/');
    }).catch(function(error) {
      console.error("Authentication failed:", error);
    });
  }
  unauthenticate() {

    console.log('logged out');
  }
}
