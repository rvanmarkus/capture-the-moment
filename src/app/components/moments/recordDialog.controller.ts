interface recordDialogScope extends ng.IScope {
  closeDialog: Function
}
/** @ngInject */
export class recordMomentDialog {
  constructor($scope:recordDialogScope, $mdDialog:ng.material.IDialogService){
    $scope.closeDialog=()=>{
      $mdDialog.cancel();
    }
  }
}
