/** @ngInject */
export class LoginController {
  private user;
  private userServices;
  private $mdToast;
  private location;
  constructor($scope, userServices, $location, $mdToast: any){
    this.location = $location;
    this.userServices = userServices;
    this.$mdToast = $mdToast;
    
  }

  loginSuccessfull() {
    this.$mdToast.show(
      this.$mdToast.simple().content('Login Successfull!').hideDelay(2500));
      this.location.path('/');
  }

  authenticate() {
    this.userServices.authenticate().then((user)=>{
      this.loginSuccessfull();
      this.user = user;
    }).catch(function(error) {
      console.error("Nonononononon", error);
    });
  }
}
