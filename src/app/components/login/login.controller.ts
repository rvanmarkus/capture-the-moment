/** @ngInject */
export class LoginController {
  private user;
  private userServices;
  private $mdToast;
  private location;
  public loadingIndicator;

  constructor($scope, userServices, $location, $mdToast: any){
    this.location = $location;
    this.userServices = userServices;
    this.$mdToast = $mdToast;
    this.loadingIndicator = false;
  }

  loginSuccessfull() {
    this.$mdToast.show(
      this.$mdToast.simple().content('Login Successfull!').hideDelay(2500));
      this.loadingIndicator = false;
      this.location.path('/');
  }

  authenticate() {
    this.loadingIndicator = true;
    this.userServices.authenticate().then((user)=>{
      this.loginSuccessfull();
      this.user = user;
    }).catch(function(error) {
      console.error("Nonononononon", error);
    });
  }
}
