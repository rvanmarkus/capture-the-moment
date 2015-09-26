/** @ngInject */
export class LoginController {
  constructor($scope, userServices, $location, $mdToast: any){
    this.location = $location;
    this.userServices = userServices;

    this.$mdToast = $mdToast;
    this.loginSuccessfull = function(){
      this.$mdToast.show(
        this.$mdToast.simple().content('Login Successfull!').hideDelay(2500)
       );
    }
  }
  authenticate() {
    this.userServices.authenticate().then((user)=>{
      this.loginSuccessfull();
    this.userServices.authenticate().then((user) => {
      this.user = user;
      this.location.path('/');
    }).catch(function(error) {
      console.error("Nonononononon");
    });
  }
}
