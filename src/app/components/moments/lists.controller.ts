/** @ngInject */
export class ListsController {
  public loading = true;
  public usermoments;
  public friendsmoments;

  public user;

  constructor($scope, $firebaseAuth, $location, momentsFactory, userServices){
    this.user = userServices.getUser();
    this.usermoments = momentsFactory.getAllUserMoments(this.user.username);
    this.friendsmoments = momentsFactory.getAllMoments();

    //disable loading icon
    momentsFactory.getAllMoments().$loaded().then(() => {
      this.loading = false;
    });
  }
}
