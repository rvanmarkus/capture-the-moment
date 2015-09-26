/** @ngInject */
export class LoginController {
  constructor($scope, userServices, $location){
    this.location = $location;
    this.userServices = userServices
  }
  authenticate() {
    this.userServices.authenticate().then((user)=>{
      this.location.path('/');
    });
  }
  unauthenticate() {

    console.log('logged out');
  }
}
