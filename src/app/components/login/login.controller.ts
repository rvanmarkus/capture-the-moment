/** @ngInject */
export class LoginController {
  constructor($scope, userServices, $location, $mdToast: any){
    this.location = $location;

    this.$mdToast = $mdToast;
    this.loginSuccessfull = function(){
      this.$mdToast.show(
        this.$mdToast.simple().content('Login Successfull!').hideDelay(2500);
       );
    }
    this.userServices = userServices;
  }
  authenticate() {
    this.userServices.authenticate().then((user)=>{
      this.loginSuccessfull();
      this.location.path('/');
    }).catch(function(error) {
      console.error("Authentication failed:", error);
    });
  }
}
