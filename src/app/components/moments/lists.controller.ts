/** @ngInject */
export class ListsController {
  constructor($scope, $firebaseAuth, $location, momentsFactory, userServices){
    $scope.user = userServices.getUser();
    $scope.usermoments = momentsFactory.getAllUserMoments($scope.user.username);
    $scope.friendsmoments = momentsFactory.getAllMoments();
  }
}
