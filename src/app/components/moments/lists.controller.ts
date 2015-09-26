/** @ngInject */
export class ListsController {
  constructor($scope, $firebaseAuth, $location, momentsFactory, userServices){

    $scope.usermoments = momentsFactory.getAllMoments()
  }
}
