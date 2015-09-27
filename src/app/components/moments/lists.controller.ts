/** @ngInject */
export class ListsController {
  public loading;
  constructor($scope, $firebaseAuth, $location, momentsFactory, userServices){

    $scope.user = userServices.getUser();
    $scope.usermoments = momentsFactory.getAllUserMoments($scope.user.username);
    $scope.friendsmoments = momentsFactory.getAllMoments().$loaded().then((shit) => {
      this.loading = false;
      return shit;
    });
  }
}
