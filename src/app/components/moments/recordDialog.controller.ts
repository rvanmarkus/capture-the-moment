interface recordDialogScope extends ng.IScope {
  closeDialog: Function
}
/** @ngInject */
export class recordMomentDialogController {
  constructor($scope:recordDialogScope, $mdDialog:ng.material.IDialogService){
  $scope.hashtags = [];
    
	};

  $scope.closeDialog = () => {
      $mdDialog.cancel();
  }
}
